import { auth } from '../plugins/firebase'

export default function ({ store, redirect, route }) {
  console.log(route.path)
  if (store.state.modules.auth.login_user) return
  auth.onAuthStateChanged((user) => {
    if (user) {
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
      }
      store.dispatch('modules/auth/setLoginUser', userInfo)
      store.dispatch('modules/todos/fetchTodos')
      if (route.path === '/signIn') {
        return redirect('/')
      }
    }
  })
}
