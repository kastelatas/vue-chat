import {IStore, load} from '~/store/index'
import {IAmbassadorsOptions} from "~/store/filters";
import * as core from "~/types/core";
import extend from 'lodash/extend'

export interface IState {
  namespace: string,
  list: core.IAmbassador[],
  similar: core.IAmbassador[]
}

export const state = (): IState => ({
  namespace: 'ambassador',
  list: [],
  similar: [],
});

export const actions = {
  async all(ctx: IStore<IState>, payload: { page: number } = {page: 0}) {
    const options: IAmbassadorsOptions = ctx.rootState.filters.ambassadors;
    const expand = '{state,profile:{avatar,rating,topics:{topic}}}';
    const query: core.TSMap = {expand}
    const params: any = {}

    if (options.filter.online) {
      params.state = {online: options.filter.online};
    }

    if (options.filter.gender !== null) {
      params.profile = params.profile ?? {};
      params.profile.gender = options.filter.gender;
    }

    if (options.filter.topic) {
      params.profile = params.profile ?? {};
      params.profile.topics = {topic: {slug: options.filter.topic}};
    }

    if (options.filter.search) {
      params.name = options.filter.search;
    }

    if (Object.keys(options).length) {
      query.params = JSON.stringify(params);
    }

    if (options.sort.attribute) {
      query.sort = options.sort.reverse ? '-' + options.sort.attribute : options.sort.attribute;
    }

    if (payload.page) {
      query.page = String(payload.page);
    }

    return load(ctx, 'ambassadors', '/ambassador', {query}, {force: true});
  },

  similar(ctx, id) {
    return load(ctx, 'similar', `/ambassador/similar`,
      {query: {id, expand: 'profile.avatar'}}, {auth: true, force: true}
    );
  },

  leaveReview(ctx, payload) {
    return load(ctx, null, '/ambassador-profile-comment',
      {method: 'post', data: payload}, {auth: true}
    );
  },
}

export const mutations = {
  set(state: IState, payload: Partial<IState>) {
    extend(state, payload);
  },
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
