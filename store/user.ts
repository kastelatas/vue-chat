import {NuxtCookies} from 'cookie-universal-nuxt'
import {IStore, load} from "./index";
import {IState as ILocalState} from "./local";
import {expand as profileExpand} from "./profile";
import * as core from "~/types/core";
import merge from 'lodash/merge'

export interface IState extends core.IAuth {
  namespace: string
  current: core.IClient | core.IAmbassador | null
  self: core.IClient | core.IAmbassador | null
}

export const state = (): IState => {
  return {
    namespace: 'user',
    id: null as number | null,
    token: null as string | null,
    identity: null as core.IClient | core.IAmbassador | null,
    current: null as core.IClient | core.IAmbassador | null,
    self: null as core.IClient | core.IAmbassador | null,
  }
}

class TIdentityManager {
  state: ILocalState

  constructor(state: ILocalState) {
    this.state = state;
  }

  set(payload) {
    this.state.identity = payload;
    if (process.client) {
      localStorage.setItem('identity', JSON.stringify(payload));
    }
  }

  get() {
    return process.server
      ? this.state.identity
      : JSON.parse(localStorage.getItem('identity')!);
  }

  remove() {
    this.state.identity = null;
    if (process.client) {
      localStorage.removeItem('identity');
    }
  }
}


let manager: TIdentityManager;

function expand(ident: core.IIdent | null = null): string {
  return '{state,profile:' + (ident ? profileExpand(ident) : '{avatar,rankTitle}') + '}'
}

function expandOwn(ident: core.IIdent | null = null): string {
  return '{invite,setting,talkens,profile:' + (ident ? profileExpand(ident) : '{avatar,rankTitle}') + '}'
}

export function url(ident: core.IIdent): string {
  const t = (ident.type === core.EUserType.Ambassador) ? 'ambassador' : 'client';
  return '/' + t + '/' + ident.id;
}

export const actions = {
  async nuxtInit(ctx: IStore<IState>) {
    manager = new TIdentityManager(ctx.rootState.local);
  },

  async init(ctx: IStore<IState>, payload: string | null = null): Promise<IState> {

    const query: core.TSMap = {expand: expandOwn()};
    const cookies: NuxtCookies = this['$cookies'];
    const token = payload ? payload : this['$cookies'].get('token');

    if (token) {
      await ctx.commit('set', {token: token});
    } else {
      query.fingerprint = cookies.get('fingerprint') ??
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      cookies.set('fingerprint', query.fingerprint, {path: '/', maxAge: 60 * 60 * 24 * 7});
    }

    return load(ctx, 'self', '/user/init', {query: query}, {auth: true});
  },

  async one(ctx: IStore<core.IUser>, payload: { id: number }) {
    const tmp = await ctx.dispatch('ident');
    const type = tmp.type == core.EUserType.Ambassador ? core.EUserType.Client : core.EUserType.Ambassador;
    const ident = {id: payload.id, type};
    return load(ctx, 'current', url(ident),
      {query: {expand: expand(ident)}},
      {auth: true, force: true, error: true}
    );
  },

  async load(ctx: IStore<core.IUser>) {
    const ident = await ctx.dispatch('ident');
    return load(ctx, null, url(ident), {query: {expand: expandOwn(ident)}}, {auth: true});
  },

  async save(ctx: IStore<core.IUser>, payload: core.IUser) {
    const ident = await ctx.dispatch('ident');
    return load(ctx, null, url(ident),
      {method: 'patch', query: {expand: expandOwn(ident)}, data: payload},
      {auth: true, force: true}
    );
  },

  async login(ctx: IStore<IState>, payload: { login: string, password: string }): Promise<IState> {
    return await load(ctx, 'self', '/user/login', {query: {expand: expandOwn()}, data: payload}, {force: true});
  },

  async logout(ctx: IStore<IState>) {
    this['_vm'].$ws.disconnect();
    manager.remove();
    ctx.commit('set', {token: null, identity: null, id: null});
  },

  async verifyEmail(ctx: IStore<IState>, payload: { email: string }): Promise<null> {
    return await load(ctx, null, '/user/verify-email', {data: payload}, {auth: true});
  },

  async verifyEmailConfirm(ctx: IStore<IState>, payload: { email: string, token: string }): Promise<IState> {
    return await load(ctx, 'self', '/user/verify-email-confirm', {query: {expand: expandOwn(), ...payload}}, {
      force: true,
      loader: true
    });
  },

  async setEmail(ctx: IStore<IState>, payload: { email: string }): Promise<null> {
    return await load(ctx, null, '/user/set-email', {data: payload}, {auth: true});
  },

  async setEmailConfirm(ctx: IStore<IState>, payload: { email: string, token: string }): Promise<IState> {
    return await load(ctx, 'self', '/user/set-email-confirm', {query: {expand: expandOwn(), ...payload}}, {
      force: true,
      loader: true
    });
  },

  async setPassword(ctx: IStore<IState>, payload: { old_password: string, new_password: string }): Promise<null> {
    return await load(ctx, null, '/user/set-password', {data: payload}, {auth: true});
  },

  async setPasswordConfirm(ctx: IStore<IState>, payload: { email: string, token: string }): Promise<IState> {
    return await load(ctx, 'self', '/user/set-password-confirm', {query: {expand: expandOwn(), ...payload}}, {
      force: true,
      loader: true
    });
  },

  async resetPassword(ctx: IStore<IState>, payload: { email: string }): Promise<null> {
    return await load(ctx, null, '/user/reset-password', {data: payload});
  },

  async resetPasswordConfirm(ctx: IStore<IState>, payload: { token: string }): Promise<IState> {
    return await load(ctx, 'self', '/user/reset-password-confirm', {query: {expand: expandOwn(), ...payload}}, {
      force: true,
      loader: true
    });
  },

  async reviews(ctx: IStore<IState>, payload: { id: number, page: number }): Promise<core.IAmbassadorProfileComment[]> {
    const query = {expand: 'client.profile.avatar', page: payload.page};
    return await load(ctx, null, '/ambassador-profile-comment/' + payload.id, {query}, {auth: true});
  },

  async helpCenter(ctx, payload) {
    return load(ctx, null, '/contact',
      {method: 'post', data: payload}, {auth: true}
    );
  },

  // async

  async ident(ctx: IStore<IState>): Promise<core.IIdent> {
    if (!ctx.state.id) {
      const ident = ctx.getters['local'];
      if (ident) {
        return {id: ident.id, type: ident.type}
      } else {
        await ctx.dispatch('user/init', null, {root: true});
      }
    }

    return {
      id: ctx.state.id ?? null,
      type: ctx.state.identity ? ctx.state.identity.type : null
    }
  }
}

export const mutations = {
  set(state: IState, payload: IState) {
    const login = payload.token && (state.token != payload.token);

    if (payload.hasOwnProperty('token')) {
      const cookies: NuxtCookies = this['$cookies'];
      cookies.set('token', payload.token, {path: '/', maxAge: 60 * 60 * 24 * 7});
      state.token = payload.token;
    }

    if (payload.hasOwnProperty('id')) {
      state.id = payload.id;
    }

    if (state.token) {
      if (payload.hasOwnProperty('user') || payload.hasOwnProperty('identity')) {
        state.identity = merge(state.identity, payload.user ? payload.user : payload.identity);
        state.id = state.identity ? state.identity.id : null;
        manager.set(state.identity);
      }
    } else {
      state.identity = null;
    }

    if (process.client && login && state.id) {
      this['_vm'].$ws.connect(state.id, state.token);
    }
  },
}

export const getters = {
  get: (state: IState): IState | null => {
    return state;
  },
  local: (state: IState): core.IUser | null => {
    return state.token ? manager.get() : null;
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
