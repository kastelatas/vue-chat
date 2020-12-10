import {IStore, load} from '~/store/index'
import * as chat from "~/types/chat";
import merge from 'lodash/merge'

export interface IState {
  namespace: string
  list: chat.INotification[]
}

export const state = (): IState => ({
  namespace: 'notification',
  list: []
});

export const actions = {
  async all(ctx: IStore<chat.INotification[]>) {
    return load(ctx, 'list', '/notification', {}, {force: true, auth: true});
  },
}

export const mutations = {
  set(state, payload) {
    merge(state, payload);
  },
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
