import {IStore, load} from '~/store/index'

export const state = () => ({
  namespace: 'invite'
})

export const actions = {
  async start(ctx, data) {
    return load(ctx, null, '/ambassador/invite-start', {data: data}, {auth: true}).then((payload) => {
      ctx.commit('user/set', {identity: {invite: payload}}, {root: true});
    })
  },
  async stop(ctx: IStore<any>, id: number) {
    return load(ctx, null, '/ambassador/invite-stop',
      {data: {id}}, {auth: true}
    ).then(() => {
      ctx.commit('user/set', {identity: {invite: null}}, {root: true});
    });
  },
}

export default {
  namespaced: true,
  actions,
};
