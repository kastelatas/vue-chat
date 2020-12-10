import * as core from '~/types/core'
import {EUserType, IProfile} from '~/types/core'
import {IStore, load} from './index'
import {url} from './user'
import extend from 'lodash/extend'

export interface IState {
  namespace: string
  self: core.IProfile
  dashboard: any
}

export const state = () => ({
  namespace: 'profile',
  dashboard: null,
  self: null,
});

const clientProfileExpand = '{avatar,cover,stat,photos:{image},topics:{topic}}';
const ambassadorProfileExpand = '{state,avatar,cover,stat,photos:{image},videos:{video},topics:{topic},rating, comments:{client:{profile:{avatar}}}}}';

export function expand(ident: core.IIdent): string {
  return (ident.type == EUserType.Ambassador) ? ambassadorProfileExpand : clientProfileExpand;
}

export const actions = {
  async load(ctx: IStore<IProfile>) {
    const ident = await ctx.dispatch('user/ident', null, {root: true});
    return load(ctx, 'self', url(ident),
      {query: {expand: '{profile:' + expand(ident) + '}'}}, {auth: true, path: 'profile'}
    );
  },

  async save(ctx: IStore<IProfile>, payload: IProfile) {
    const ident = await ctx.dispatch('user/ident', null, {root: true});
    return load(ctx, 'self', url(ident),
      {method: 'patch', query: {expand: '{profile:' + expand(ident) + '}'}, data: {profile: payload}},
      {auth: true, force: true, path: 'profile'}
    );
  },

  async dashboard(ctx) {
    return load(ctx, 'dashboard', '/ambassador/dashboard', {}, {auth: true});
  },

  async stat(ctx) {
    return load(ctx, null, '/ambassador/stat', {}, {auth: true});
  },
}

export const mutations = {
  set(state: IProfile, payload: IProfile) {
    extend(state, payload);
  }
}

export const getters = {
  get: (state: IProfile): IProfile | null => {
    return state;
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
