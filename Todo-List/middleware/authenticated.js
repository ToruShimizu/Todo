import { auth } from '../plugins/firebase'

export default function ({ store, redirect, route }) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
      }
      store.dispatch('modules/auth/setLoginUser', userInfo)
      if (store.state.modules.todos.todos.length === 0) {
        store.dispatch('modules/todos/fetchTodos')
        console.log(store.state.modules.todos.todos)
      }
    } else if (route.path === '/signIn') {
      return redirect('/')
    } else {
      return redirect('/signIn')
    }
  })
}
