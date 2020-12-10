import {NuxtCookies} from 'cookie-universal-nuxt'
import {Store} from 'vuex/types/index'
import FiltersModule, {IState as IFiltersState} from './filters'
import AmbassadorModule, {IState as IAmbassadorState} from "./ambassador"
import NotificationModule, {IState as INotificationState} from "./notification"
import LocalModule, {IState as ILocalState} from "./local"
import ProfileModule, {IState as IProfileState} from "./profile"
import PageModule from "./page"

import UserModule from "./user"
import MediaModule from "./media"
import InviteModule from "./invite"
import * as core from "~/types/core"
import $conf from "~/plugins/services/conf"
import get from "lodash/get"
import set from "lodash/set"
import extend from "lodash/extend"
import isEmpty from "lodash/isEmpty"
import {IWs} from "~/plugins/services/ws";
import Vue from "vue";

export interface IStore<T> extends Store<T> {
  rootState: IState
  rootGetters: any
  $cookies: NuxtCookies
  $ws: IWs
}

export interface IState {
  // state
  loading: boolean
  topics: core.ITopic[]
  faq: core.IFaq[]
  news: core.INews[]
  about: {}

  // modules
  user: core.IAuth
  profile: IProfileState
  filters: IFiltersState
  ambassador: IAmbassadorState,
  notification: INotificationState
  page: core.IPage
  local: ILocalState
}

export const state = (): Partial<IState> => {
  return {
    // state
    loading: false,
    topics: [],
    faq: [],
    news: [],
    about: {},
  }
}

let $glob = Vue.prototype.$glob;

export async function load(
  ctx: IStore<any>, key: string | null, uri: string,
  {query = {}, data = {}, method = ''} = {},
  {path = '', auth = false, force = false, loader = false, error = false} = {}
) {

  if ($glob.layout.error) {
    console.error('Global error!');
    return null;
  }

  if (key) {
    const pathKey = ctx.state.namespace ? (ctx.state.namespace + '.' + key) : key;
    const promise = $glob.cache[pathKey];
    if (promise) {
      if (force) {
        if (!promise.done()) {
          return promise;
        }
      } else {
        return promise;
      }
    }
  }

  const token = ctx.rootState.user.token ?? null;
  const promise = MakePromise(new Promise((resolve, reject) => {
    const root = ctx.state === ctx.rootState;
    const args = Object.keys(query).length ? '?' + new URLSearchParams(query).toString() : '';
    let headers = {};

    method = method
      ? method.toUpperCase()
      : isEmpty(data) ? 'GET' : 'POST';

    const params = {method, headers} as any
    if (process.client && data instanceof FormData) {
      params.body = data;
    } else {
      params.headers = {'Content-Type': 'application/json'};
      params.body = Object.keys(data).length ? JSON.stringify(data) : null;
    }

    if (auth && token) {
      params.headers['Authorization'] = 'Bearer ' + token;
    }

    if (loader || (method !== 'GET')) {
      ctx.commit('loading', true, {root: true});
    }

    fetch($conf.api.host + uri + args, params).then(res => res.json())
      .then((res: core.IResponse) => {
        if (res.success) {
          // resolve
          let data = path
            ? get(res.data, path)
            : res.data;

          if (key) {
            if (key == 'self') {
              ctx.commit('set', data);
            } else {
              if (root && mutations[key]) {
                // key named root mutation
                ctx.commit(key, data);
              } else if (!root && mutations['set']) {
                // local set mutation
                ctx.commit('set', set({}, key, data));
              } else {
                // root set mutation
                ctx.commit('set', set({}, key, data), {root: true});
              }
            }
          }
          if (loader || (method !== 'GET')) {
            ctx.commit('loading', false, {root: true});
          }
          resolve(data);
        } else {
          // reject (first errors only)
          const func = function (arr: any[]) {
            for (const i in arr) {
              if (Array.isArray(arr[i])) {
                arr[i] = arr[i][0];
              } else if (typeof arr[i] === 'object') {
                arr[i] = func(arr[i]);
              }
            }
            return arr;
          }
          if (loader || (method !== 'GET')) {
            ctx.commit('loading', false, {root: true});
          }

          if (res.errors.status === 401) {
            // TODO forced authorization for 401 status
            $glob.layout.error = true;
          } else if (error) {
            $glob.layout.error = true;
          }

          reject(func(res.errors))
        }
      }).catch((e) => {
      console.log('Error: ' + e.message);
      console.log(e.response);
    });
  }));

  if (key) {
    $glob.cache[ctx.state.namespace ? (ctx.state.namespace + '.' + key) : key] = promise;
  }

  return promise;
}

export const modules = {
  ambassador: AmbassadorModule,
  filters: FiltersModule,
  profile: ProfileModule,
  user: UserModule,
  media: MediaModule,
  invite: InviteModule,
  notification: NotificationModule,
  page: PageModule,
  local: LocalModule
}

export const actions = {
  async nuxtServerInit(ctx: IStore<IState>, {app}) {
    Vue.prototype.$glob.cache = {};
    $glob = Vue.prototype.$glob;
    ctx.$cookies = app.$cookies;
    Vue.prototype.$ws.$store = ctx;
    await ctx.dispatch('user/nuxtInit', {app});
  },
  async nuxtClientInit(ctx: IStore<IState>, {app}) {
    Vue.prototype.$glob.cache = {};
    $glob = Vue.prototype.$glob;
    ctx.$cookies = app.$cookies;
    Vue.prototype.$ws.$store = ctx;
    await ctx.dispatch('user/nuxtInit', {app});
  },
  async topics(ctx: IStore<IState>) {
    const expand = 'video.sources,ambassadorsCount';
    return load(ctx, 'topics', '/topic', {query: {expand}});
  },

  async promoAmbassador(ctx: IStore<IState>) {
    return load(ctx, null, '/ambassador/random-online', {query: {expand: 'profile.avatar'}});
  },

  async getNews(ctx: IStore<IState>) {
    const expand = 'preview';
    return load(ctx, 'news', '/news', {query: {expand}}, {auth: true});
  },

  async getNewsById(ctx: IStore<IState>, {id}) {
    const expand = 'photo';
    return load(ctx, '', '/news/' + id, {query: {expand}});
  },

  async getFaqsQuestions(ctx: IStore<IState>) {
    return load(ctx, 'faq', '/faq', {}, {auth: true});
  },

  async getAboutUs(ctx: IStore<IState>) {
    const expand = '{photos:{image},photo1:{image},photo2:{image},employees:{image}}';
    return load(ctx, 'about', '/about-us', {query: {expand}}, {auth: true});
  },
}

export const mutations = {
  set(state: IState, payload) {
    extend(state, payload);
  },

  loading(state: IState, payload: boolean) {
    state.loading = payload;
  },
}

function MakePromise<T extends (Promise<any> | core.IPromise)>(promise: T): any {

  // Don't modify any promise that has been already modified.
  if (promise.hasOwnProperty('done')) return promise;

  let time = 0;
  const result = promise.then(
    function (v) {
      time = Math.floor(Date.now() / 1000);
      return v;
    },
    function (e) {
      time = Math.floor(Date.now() / 1000);
      throw e;
    }
  ) as core.IPromise;

  result.done = () => {
    return time ? Math.floor(Date.now() / 1000) - time : null;
  }

  return result;
}
