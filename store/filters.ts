import * as core from '~/types/core'
import cloneDeep from 'lodash/cloneDeep'

export interface IState {
  namespace: string,
  ambassadors: IAmbassadorsOptions
}

export interface IAmbassadorsOptions {
  filter: IAmbassadorsFilter,
  sort: core.ISort
}

export interface IAmbassadorsFilter {
  online: boolean,
  gender: number | null,
  topic: string | null
  search: string | null
}

export const filtersDefaults: IState = {
  namespace: 'filter',
  ambassadors: {
    filter: {
      online: false,
      gender: null,
      search: null,
      topic: null,
    },
    sort: {
      attribute: 'rating',
      reverse: false
    }
  }
}

export const state = (): Partial<IState> => ({
  ambassadors: cloneDeep(filtersDefaults.ambassadors)
})

export const mutations = {
  ambassadors(state: IState, payload: IAmbassadorsOptions) {
    state.ambassadors = payload;
  },
}

export default {
  namespaced: true,
  mutations,
  state,
};
