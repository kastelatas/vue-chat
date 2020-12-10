import {Route} from "vue-router"

function check(to: Route): boolean {
  const patterns = ['chat'];

  for (const pattern of patterns) {
    // console.log(pattern)
    if (to.name && to.name?.startsWith(pattern)) {
      return false;
    }
  }

  return true;
}

export default ({app}) => {

  app.router.beforeEach((to, from, next) => {
      if (!from.name) {
        next();
        return;
      }

    // console.log(111)

      if (check(to)) {
        next();
      } else {
        // console.log('to', to)
        if (!app.store.getters['user/local']) {
          app.store['_vm'].$glob.modals.login.show = true;
          app.store['_vm'].$glob.modals.login.done = () => {
            next();
          }
          // alert('auth');
        } else {
          next();
        }
      }
    }
  );
}
