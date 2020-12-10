import {load} from '~/store/index'
import * as core from "~/types/core";
import extend from "lodash/extend";

export interface IState {
  namespace: string,
  [key: string]: core.IPage | string
}

export const state = (): IState => ({
  namespace: 'page'
});

export const actions = {
  page(ctx, slug) {
    return load(ctx, null, `/page/${slug}`,
      {}, {auth: true, force: true}
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
};
