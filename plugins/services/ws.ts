import * as chat from '~/types/chat'
import * as core from '~/types/core'
import {rand} from '~/types/core'
import {IConf} from "~/plugins/services/conf";
import {IGlob} from "~/plugins/services/glob";
import {IState, IStore} from "~/store";
import find from 'lodash/find'
import clone from 'lodash/clone'
import remove from 'lodash/remove'

export interface IWs {
  store: chat.Store | null
  socket: WebSocket | null
  callbacks: ICallbacks

  $store: IStore<IState>
  $conf: IConf
  $glob: IGlob

  init()

  onMessage(callback: () => void)

  onTypingStart(callback: (id: number) => void)

  onTypingStop(callback: (id: number) => void)

  connect(id: number, token: string): boolean

  disconnect()

  send(event: chat.IEvent<any>)

  favorites()

  history(id: number, from?: number): Promise<chat.IMessage[]>

  contactRemove(contact: chat.IContact)

  favoriteRemove(contact: chat.IContact)

  favoriteToggle(contact: chat.IContact)
}

interface ICallbacks {
  onMessage: (() => void) | null
  onTypingStart: ((id: number) => void) | null
  onTypingStop: ((id: number) => void) | null
}

export default new class implements IWs {
  $conf: IConf = {} as IConf
  $glob: IGlob = {} as IGlob
  $store: IStore<IState> = {} as IStore<IState>

  store: chat.Store = {} as chat.Store
  socket: WebSocket | null = null
  callbacks: ICallbacks = {
    onMessage: null,
    onTypingStart: null,
    onTypingStop: null,
  }

  onMessage(callback: () => void) {
    this.callbacks.onMessage = callback;
  }

  onTypingStart(callback: (id: number) => void) {
    this.callbacks.onTypingStart = callback;
  }

  onTypingStop(callback: (id: number) => void) {
    this.callbacks.onTypingStop = callback;
  }

  init() {
    this.store = new chat.Store({id: null, token: null, host: this.$conf.chat.host});
  }

  connect(id: number, token: string): boolean {
    if (!process.client || this.socket) {
      return false;
    }

    this.store.id = id;
    this.store.token = token;

    this.socket = new WebSocket(this.$conf.chat.url + token)
    this.socket.onopen = () => {
      console.log('ws connected');
    }

    this.socket.onmessage = (evt: MessageEvent) => {
      const data: chat.IEvent<any> = JSON.parse(evt.data)
      switch (data.type) {
        case 'notification':
          const push = new chat.TPush(data.payload);
          push.timerOn = true;
          this.store.data.pushes.push(push);
          setTimeout(() => {
            this.store.data.pushes.shift();
            // this.store.data.pushes = [...this.store.data.pushes];
          }, 24000)
          break;
        case 'init':
          this.handleInit(data);
          break
        case 'message':
          this.handleMessage(data);
          break
        case 'message-sent':
          this.handleMessageSent(data);
          break
        case 'contact-add':
          this.handleContactAdd(data);
          break;
        case 'typing-start':
          this.handleTypingStart(data);
          break;
        case 'typing-stop':
          this.handleTypingStop(data);
          break;
        case 'seen':
          this.handleSeen(data);
          break;
        case 'message-need-registration':
          this.removeMessage(data.payload.tag)
          this.$glob.modals.verification.show = true;
          break;
        case 'message-need-cache':
        case 'message-need-talkens':
          this.removeMessage(data.payload.tag)
          // this.$glob.modals.talkens.show = true;
          this.$glob.modals.payment.show = true;
          break;
      }
    }

    this.socket.onclose = (e) => {
      this.socket = null;

      if (this.store.id) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(() => {
          if (this.store.id) {
            this.connect(this.store.id, this.store.token);
          }
        }, 50) // TODO DEV
      } else {
        console.log('Socket is closed.');
      }
    }

    this.socket.onerror = function (evt) {
      console.error('WebSocket error observed:', evt);
    }

    return false
  }

  promo() {
    const exec = () => {
      if (this.store.data.user && this.store.data.user.status === 0) {
        this.$store.dispatch('promoAmbassador').then((payload: core.IAmbassador) => {

          if (payload) {
            const ts = Math.floor(Date.now() / 1000);
            const id = Number(String(ts + '0') + rand(10000, 1000000))
            const push = new chat.TPush({
              id: id,
              message: payload.profile.name + ' is online.',
              created_at: ts,
              user_id: this.store.id,
              notification: {
                id: id,
                kind: 3,
                type: 305,
                direction: core.EUserType.Client,
                ambassador_id: payload.id,
                ambassador: {
                  id: payload.id,
                  type: payload.type,
                  status: payload.status,
                  email: payload.email,
                  name: payload.profile.name,
                  avatar: payload.profile.avatar.path,
                  state: {
                    online: true,
                    favorite: false
                  }
                },
                client: null,
                client_id: this.store.id,
                created_at: ts,
                extra: null
              } as chat.INotification
            });

            this.store.data.pushes.push(push);

            setTimeout(() => {
              this.store.data.pushes.shift()
            }, 60000)
          }

          setTimeout(() => {
            if (this.store.data.pushes.length <= 5){
              exec();
            }
          }, core.rand(12, 15) * 1000)
        });
      }
    }

    setTimeout(() => {
      exec();
    }, core.rand(12, 15) * 1000)
  }

  disconnect() {
    this.store.id = 0;
    this.store.token = '';
    if (this.socket) {
      this.socket.close()
      this.socket = null;
    }
  }

  handleInit(data: chat.IEvent<chat.IInit>) {
    this.store.data.user = data.payload.user;
    this.store.data.contacts = chat.TContact.array(data.payload.contacts as Partial<chat.TContact>[]);
    if (this.store.data.user!.status === 0) {
      this.promo();
    }
  }

  handleMessage(data: chat.IEvent<chat.IMessage>) {
    const userId = (data.payload.direction === core.EUserType.Ambassador)
      ? data.payload.ambassador_id
      : data.payload.client_id;

    const contact = find(this.store.data.contacts, ['user.id', userId]);

    if (contact) {
      if (!contact.history) {
        contact.history = [];
      }

      contact.history.push(data.payload);
      contact.last_message = data.payload;

      if (contact === this.store.data.state.contact) {
        this.send({
          type: 'seen',
          payload: {message_id: data.payload.id, user_id: userId}
        } as chat.IEvent<chat.ISeen>);
      } else {
        if (!contact.unread) {
          contact.unread = 1;
        } else {
          contact.unread++;
        }
        const notification = {
          id: 0,
          kind: 4,
          type: 404,
          direction: this.store.data.user!.type,
          created_at: data.payload.ts,
          extra: JSON.stringify({message: data.payload.text})
        } as chat.INotification

        if (this.store.data.user!.type == core.EUserType.Ambassador) {
          notification.client_id = data.payload.client_id;
          notification.client = contact.user;
        } else {
          notification.ambassador_id = data.payload.ambassador_id;
          notification.ambassador = contact.user;
        }

        this.store.data.pushes.push(new chat.TPush({
          message: contact.user.name + ' sent new message.',
          created_at: data.payload.ts,
          user_id: this.store.id,
          notification
        }));
      }
    }

    this.callbacks.onMessage && this.callbacks.onMessage();
  }

  handleMessageSent(data: chat.IEvent<chat.IMessage>) {
    for (const i in this.store.data.state.contact!.history! ?? []) {
      const message = this.store.data.state.contact!.history![i];
      if (message.tag == data.payload.tag) {
        message.id = data.payload.id;
        this.store.data.state.contact!.history = [...this.store.data.state.contact!.history!]; // TODO reactive array bug
      }
    }
  }

  handleContactAdd(data: chat.IEvent<chat.IContact>) {
    const contact = find(this.store.data.contacts, ['user.id', data.payload.user.id]);
    if (!contact) {
      this.store.data.contacts.unshift(data.payload);
    }
  }

  handleTypingStart(data: chat.IEvent<chat.IId>) {
    this.callbacks.onTypingStart && this.callbacks.onTypingStart(data.payload.id);
  }

  handleTypingStop(data: chat.IEvent<chat.IId>) {
    this.callbacks.onTypingStop && this.callbacks.onTypingStop(data.payload.id);
  }

  handleSeen(data: chat.IEvent<chat.ISeen>) {
    const contact = find(this.store.data.contacts, ['user.id', data.payload.user_id])
      || find(this.store.data.favorites, ['user.id', data.payload.user_id]);

    if (contact) {
      contact.seen = data.payload.message_id;
    }
  }

  removeMessage(tag: string) {
    for (const contact of this.store.data.contacts) {
      for (const i in contact.history) {
        const message = contact.history[i];
        if (message.tag === tag) {
          contact.history.splice(Number(i), 1);
          if (contact.history.length) {
            contact.last_message = contact.history[Number(i) - 1];
          } else {
            contact.last_message = null;
          }
        }
      }
    }
  }

  async history(id: number, from: number = 0): Promise<chat.IMessage[]> {
    const contact = find(this.store.data.contacts, ['user.id', id]) || find(this.store.data.favorites, ['user.id', id]);
    const data = await this.store.history(this.store.data.state.contact!, from);
    contact!.history!.unshift(...data);
    this.store.data.state.contact = contact!;
    return data;
  }

  async favorites(): Promise<chat.IContact[]> {
    this.store.data.favorites = await this.store.favorites();
    return this.store.data.favorites;
  }

  send(event: chat.IEvent<any>) {
    this.socket!.send(JSON.stringify(event))
  }

  contactRemove(contact: chat.IContact) {
    remove(this.store.data.contacts, ['user.id', contact.user.id]);
    this.store.data.contacts = clone(this.store.data.contacts);
    this.send({
      type: 'contact-remove',
      payload: {id: contact.user.id}
    } as chat.IEvent<chat.IId>);
  }

  favoriteAdd(contact: chat.IContact) {
    contact.user.state.favorite = true;
    this.store.data.favorites.push(contact)
    this.send({
      type: 'favorite-add',
      payload: {id: contact.user.id}
    } as chat.IEvent<chat.IId>);
  }

  favoriteRemove(contact: chat.IContact) {
    contact.user.state.favorite = false;
    remove(this.store.data.favorites, ['user.id', contact.user.id]);
    this.store.data.favorites = clone(this.store.data.favorites);
    if (this.store.data.state.contact && this.store.data.state.contact.user.id == contact.user.id) {
      this.store.data.state.contact = (find(this.store.data.contacts, ['user.id', contact.user.id]) || find(this.store.data.favorites, ['user.id', contact.user.id])) as chat.IContact;
    }
    this.send({
      type: 'favorite-remove',
      payload: {id: contact.user.id}
    } as chat.IEvent<chat.IId>);
  }

  favoriteToggle(contact: chat.IContact) {
    contact.user.state.favorite ? this.favoriteRemove(contact) : this.favoriteAdd(contact);
  }
}

