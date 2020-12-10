import Vue from "vue";
export default async context => {
  await context.store.dispatch('nuxtClientInit', context)
}
