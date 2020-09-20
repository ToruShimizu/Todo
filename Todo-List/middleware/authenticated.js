import { auth } from "../plugins/firebase";

export default function({ store, redirect }) {
 auth.onAuthStateChanged((user) => {
    if (user) {
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
      };
      store.dispatch("modules/auth/setLoginUser", userInfo);
    } else {
      return redirect("/signIn")

    }
  });
}

