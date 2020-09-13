import firebase from "~/plugins/firebase";
import { auth } from "~/plugins/firebase";
import { db } from "~/plugins/firebase";

export const strict = false;

export const state = () => ({
  todos: [],
  comments: [],
  login_user: null
});

export const mutations = {
  // ログインユーザー情報の取得
  setLoginUser(state, user) {
    state.login_user = user;
    console.log("setLoginUser");
  },
  // ログインユーザー情報の削除
  deleteLoginUser(state) {
    state.login_user = null;
    console.log("deleteLoginUser");
  },
  // データを初期化する
  initTodos(state) {
    state.todos = [];
    console.log("initTodos");
  },
  // 取り出したデータを格納
  addTodos(state, task) {
    state.todos.push(task);
    console.log("addTodos");
  },
  // タスク追加

  // タスク削除
  removeTask(state, { id }) {
    const index = state.todos.findIndex(todo => todo.id === id);
    state.todos.splice(index, 1);
    console.log("removeTask");
  },
  updateTask(state, { id, task }) {
    // インデックスを取得
    const index = state.todos.findIndex(todo => todo.id === id);
    state.todos[index] = task;
    console.log("updateTask");
  },
  // 完了、未完了切り替え
  doneTask(state, { todo }) {
    todo.task.done = !todo.task.done;
  },
  addComments(state, message) {
    state.comments.push(message);
    console.log("addComments");
  },
  removeComment(state, { id }) {
    const index = state.comments.findIndex(comment => comment.id === id);
    state.comments.splice(index, 1);
    console.log("removeComment");
  },
  initComments(state) {
    state.comments = [];
    console.log("initComments");
  }
};

export const actions = {
  // ログインユーザー情報の取得
  async setLoginUser({ commit, dispatch }) {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit("setLoginUser", user);
        if (this.$router.currentRoute.name === "signIn") this.$router.push("/");
      } else {
        dispatch("deleteLoginUser");
        this.$router.push("signIn");
      }
    });
  },
  // ログインユーザー情報の削除
  deleteLoginUser({ commit }) {
    commit("deleteLoginUser");
  },
  // Googleログイン
  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider).then(result => {
      alert("Hello, " + result.user.displayName + "!");
    });
  },
  // メールアドレスとパスワードでログイン
  async login({ commit }, { email, password, userName }) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert("ようこそ" + userName + "さん");
      // サインイン成功後にトップページに遷移する
      this.$router.push({ path: "/" });
    } catch {
      alert("ログインに失敗しました");
    }
  },
  // ログアウト
  async logout({ commit }) {
    await auth.signOut();
    alert("ログアウトしました");
    console.log("logout");
    commit("deleteLoginUser");
  },
  // ユーザー作成してからそのままログインする
  async createUser({ dispatch }, { email, password, userName }) {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await newUser.user.updateProfile({
        displayName: userName
      });
      alert("作成に成功しました");
      alert("このままログインします");
      dispatch("login", { email, password, userName });
    } catch (err) {
      alert("作成に失敗しました");
      console.log(err);
    }
    dispatch("setLoginUser");
  },
  // ユーザー情報の更新
  // FIXME:ユーザーのstate更新
  async updateUser({ dispatch }, { userName }) {
    let user = await firebase.auth().currentUser;
    try {
      await user.updateProfile({
        displayName: userName
      });
      alert("成功しました");
    } catch (err) {
      alert("更新に失敗しました");
      console.log(err);
    }
    dispatch("setLoginUser");
  },
  // メールアドレスの変更
  // FIXME:ユーザーstate更新
  async updateEmailAddress({ commit }, { email }) {
    const user = firebase.auth().currentUser;
    try {
      await user.updateEmail(email);
      alert("新しいメールアドレスの登録が完了しました");
    } catch (err) {
      alert("新しいメールアドレスの登録に失敗しました");
      console.log(err);
    }
    dispatch("setLoginUser");
  },
  // パスワードの変更
  async updatePassword({ commit }, { email, password, newPassword }) {
    const user = await firebase.auth().currentUser;
    const credential = await firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    // 最初に再認証してから変更処理を行う
    try {
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);
      alert("パスワードを変更しました");
      alert("ログイン画面に移ります");
    } catch (err) {
      console.log(err);
    }
    // パスワード変更処理
  },
  // パスワードの再登録
  async passwordReset({ commit }, { email }) {
    try {
      // 送信されるメールを日本語に変換
      auth.languageCode = "ja";
      await auth.sendPasswordResetEmail(email);
    } catch {
      alert("送信に失敗しました");
    }
  },
  async deleteLoginUser({ commit }, { email, password }) {
    // 最初に再認証してから変更処理を行う
    try {
      const user = await firebase.auth().currentUser;
      const credential = await firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      await user.reauthenticateWithCredential(credential);
      await user.delete();
      alert("ユーザー情報を削除しました");
    } catch (err) {
      console.log(err);
    }
  },

  // firestoreからTodosのデータを取り出す
  async fetchTodos({ getters, commit }) {
    commit("initTodos");
    const snapShot = await db
      .collection(`users/${getters.uid}/todos`)
      .orderBy("created", "desc")
      .get();
    snapShot.forEach(doc => {
      commit("addTodos", { id: doc.id, task: doc.data() });
    });
  },
  // タスク追加
  async addTask({ getters, commit }, todo) {
    const task = {
      title: todo.task.title,
      detail: todo.task.detail,
      date: todo.task.date,
      done: false,
      created: firebase.firestore.FieldValue.serverTimestamp()
    };
    if (getters.uid) {
      await db.collection(`users/${getters.uid}/todos`).add(task);
    }
  },
  // タスク更新
  async updateTask({ getters, commit }, { id, task }) {
    if (getters.uid) {
      await db
        .collection(`users/${getters.uid}/todos`)
        .doc(id)
        .update(task);
      commit("updateTask", { id, task });
    }
  },
  // タスク削除
  async removeTask({ getters, commit }, { id }) {
    if (getters.uid) {
      await db
        .collection(`users/${getters.uid}/todos`)
        .doc(id)
        .delete();
      commit("removeTask", { id });
    }
  },
  // 完了、未完了切り替え
  async doneTask({ getters, commit }, { todo, id }) {
    await db
      .collection(`users/${getters.uid}/todos`)
      .doc(id)
      .update({
        done: !todo.task.done
      });
    commit("doneTask", { todo });
  },
  async addComment({ getters, commit }, { id, message }) {
    if (getters.uid) {
      await db
        .collection(`users/${getters.uid}/todos`)
        .doc(id)
        .collection(`comments/${getters.uid}/message`)
        .add({ message: message });
    }
  },
  async removeComment({ getters, commit }, { id }) {
    if (getters.uid) {
      const snapShot = await db.collection(`users/${getters.uid}/todos`).get();
      snapShot.forEach(async doc => {
        await doc.ref
          .collection(`comments/${getters.uid}/message`)
          .doc(id)
          .delete();
        commit("removeComment", { id });
      });
    }
  },
  // FIXME: id指定してログインユーザーのコメントを表示
  async fetchComments({ getters, commit }) {
    commit("initComments");
    const snapShot = await db.collection(`users/${getters.uid}/todos`).get();
    snapShot.forEach(async doc => {
      console.log("collectionId:" + doc.ref.id);
      const subCollection = await doc.ref
        .collection(`comments/${getters.uid}/message`)
        .get();
      subCollection.forEach(doc => {
        console.log("subId:", doc.id);
        commit("addComments", { message: doc.data(), id: doc.id });
      });
    });
  }
};

export const getters = {
  // ユーザーネームの取得
  userName: state => (state.login_user ? state.login_user.displayName : ""),
  userEmail: state => (state.login_user ? state.login_user.email : ""),
  // ユーザー画像の取得
  photoURL: state => (state.login_user ? state.login_user.photoURL : ""),
  // uidの取得
  uid: state => (state.login_user ? state.login_user.uid : null),
  // idを返す関数
  getTaskById: state => id => state.todos.find(todo => todo.id === id),
  getCommentById: state => id =>
    state.comments.find(comment => comment.id === id),

  // タスク総数のカウント
  todosCount(state) {
    return state.todos.length;
  },
  // 完了タスクのカウント
  completedTodos(state) {
    return state.todos.filter(todo => todo.task.done).length;
  },
  // タスクの完了率
  progress(state, getters) {
    let completed = (getters.completedTodos / state.todos.length) * 100;
    return completed.toFixed();
  },
  // 未完了タスクのカウント
  remainingTodos(state, getters) {
    return state.todos.length - getters.completedTodos;
  }
};
