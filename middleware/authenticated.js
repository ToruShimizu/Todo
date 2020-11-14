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
      // ログインユーザーの情報をstateに入れる
      store.dispatch('modules/user/auth/setLoginUser', userInfo)
      // firestoreかデータを取得する
      store.dispatch('modules/activityPlans/activityPlans/fetchActivityPlans')
    } else if (route.path === '/signIn') {
      return redirect('/activityPlans')
    } else {
      return redirect('/signIn')
    }
  })
}
