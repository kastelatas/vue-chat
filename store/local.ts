import {IAmbassador, IClient} from "~/types/core";

export interface IState {
  namespace: string,
  token: string | null
  identity: IClient | IAmbassador | null
}

export const state = (): IState => ({
  namespace: 'local',
  token: null,
  identity: null
});

export default {
  namespaced: true,
  state,
};
