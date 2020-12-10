import {EUserType, IAmbassador, IClient} from "~/types/core";

export class TObject {
  constructor(data?: Partial<TObject>) {
    if (data) {
      Object.assign(this, data)
    }
  }

  static array<T>(this: { new(): T }, array: Partial<T>[]): T[] {
    const result = []
    for (const item of array ?? []) {
      result.push(new this.prototype.constructor(item) as never)
    }
    return result
  }
}

export interface IStoreData {
  user: IUser | null
  contacts: IContact[]
  favorites: IContact[]
  pushes: TPush[]
  state: {
    contact: IContact | null
    message: string
  }
}

export class Store extends TObject {
  host: string
  token: string
  id: number

  data: IStoreData = {
    user: null,
    contacts: [],
    favorites: [],
    pushes: [],
    state: {
      contact: null,
      message: ''
    },
  }

  constructor({host, id, token}) {
    super();
    this.host = host;
    this.token = token;
    this.id = id;
  }

  history(contact: IContact, from: number = 0): Promise<IMessage[]> {
    const url = this.host + '/history';
    const params = {id: contact.user.id};
    if (from) {
      params['from'] = from;
    }
    return fetch(url + '/' + JSON.stringify(params), {
      headers: new Headers({Authorization: 'Bearer ' + this.token})
    }).then((response: Body) => response.json()).then((data: []) => data.reverse());
  }

  favorites(): Promise<TContact[]> {
    return fetch(this.host + '/favorites', {
      headers: new Headers({Authorization: 'Bearer ' + this.token})
    }).then((response: Body) => response.json()).then((result) => result.data);
  }
}

export interface IUser {
  id: number
  type: number
  status: number
  email: string
  name: string
  avatar: string
  state: {
    online: boolean
    favorite: boolean
  }
}

export interface IContact {
  user: IUser
  seen: number
  unread: number
  last_message: IMessage | null
  history?: IMessage[] | null
}

export class TContact extends TObject implements IContact {
  user: IUser
  seen: number = 0
  unread: number = 0
  history: IMessage[] = []
  last_message: IMessage | null

  constructor(data?: Partial<IContact>) {
    super(data)
    this.seen = data!.seen!;
    this.unread = data!.unread!;
    this.last_message = data!.last_message!;
    this.user = data!.user!;
  }
}

export interface IEvent<T> {
  ts?: number,
  type: string,
  payload: T
}

export interface IInit {
  user: IUser | null,
  contacts: IContact[]
}

export interface ISeen {
  user_id: number
  message_id: number
}

export interface IId {
  id: number
}

export interface IMessage {
  id: number | null,
  type: string,
  direction: number,
  ambassador_id: number,
  client_id: number,
  ts: number,
  tag: string,
  text: string | null,
  extra: string | null
}

export interface IMessageRequest {
  type: string,
  to: number,
  text: string,
  tag: string
}

export interface INotification {
  id: number
  kind: number
  type: number
  direction: EUserType
  ambassador: IUser | null
  ambassador_id: number
  client: IUser | null
  client_id: number
  created_at: number
  extra: any
}

export class TNotification extends TObject implements INotification {
  ambassador;
  ambassador_id;
  client;
  client_id;
  created_at;
  direction;
  extra;
  id;
  kind;
  type;

  user(): IAmbassador | IClient {
    return this.direction == EUserType.Ambassador ? this.client : this.ambassador;
  }
}

export interface IPush {
  id: number
  message: string
  closed_at: number | null
  created_at: number
  viewed_at: number | null
  notification_id: number
  notification: INotification
  user_id: number
}

export class TPush extends TObject implements IPush {
  closed_at;
  created_at;
  id;
  message;
  notification;
  notification_id;
  user_id;
  viewed_at;

  fake: boolean = false
  timerOn: boolean = false

  constructor(props: Partial<TPush>) {
    super(props);
    if (props.notification) {
      this.notification = new TNotification(props.notification);
    }
  }
}
