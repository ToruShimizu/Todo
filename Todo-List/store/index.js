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
  },
  // ログインユーザー情報の削除
  deleteLoginUser(state) {
    state.login_user = null;
  },
  // データを初期化する
  initTodos(state) {
    state.todos = [];
  },
  // 取り出したデータを格納
  addTodos(state, todo) {
    state.todos.push(todo);
  },
  // タスク追加

  // タスク削除
  removeTask(state, { id }) {
    const index = state.todos.findIndex(todo => todo.id === id);
    state.todos.splice(index, 1);
  },
  updateTask(state, { id, task }) {
    // インデックスを取得
    const index = state.todos.findIndex(todo => todo.id === id);
    state.todos[index] = task;
  },
  // 完了、未完了切り替え
  doneTask(state, { todo }) {
    todo.done = !todo.done;
  },
  addComments(state, comment) {
    state.comments.push(comment);
  },
  removeComment(state, { id }) {
    const index = state.comments.findIndex(comment => comment.id === id);
    state.comments.splice(index, 1);
  }
};

export const actions = {
  // ログインユーザー情報の取得
  setLoginUser({ commit }, user) {
    commit("setLoginUser", user);
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
  async login({ commit }, payload) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      alert("ようこそ" + payload.email + "さん");
      // サインイン成功後にトップページに遷移する
      this.$router.push({ path: "/" });
    } catch {
      alert("ログインに失敗しました");
    }
  },
  // ログアウト
  logout() {
    alert("ログアウトしました");
    auth.signOut();
  },
  // ユーザー作成してからそのままログインする
  async createUser({ dispatch, commit }, payload) {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );

      await newUser.user.updateProfile({
        displayName: payload.userName
      });
      alert("作成に成功しました");
      alert("このままログインします");
    } catch {
      alert("作成に失敗しました");
      return;
    }
    dispatch("login", payload);
  },
  // ユーザー情報の更新
  async updateUser({ commit }, payload) {
    let user = firebase.auth().currentUser;
    try {
      await user.updateProfile({
        displayName: payload.userName
      });
      alert("成功しました");
    } catch {
      alert("更新に失敗しました");
    }
  },
  // メールアドレスの変更
  async updateEmailAddress({ commit }, payload) {
    const user = firebase.auth().currentUser;
    try {
      await user.updateEmail(payload.newEmailAddress);
      alert("新しいメールアドレスの登録が完了しました");
    } catch {
      alert("新しいメールアドレスの登録に失敗しました");
    }
  },
  // パスワードの変更
  async updatePassword({ commit }, payload) {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      payload.email,
      payload.password
    );
    // 最初に再認証してから変更処理を行う
    try {
      await user.reauthenticateWithCredential(credential);
    } catch {
      console.log("error");
    }
    // パスワード変更処理
    try {
      await user.updatePassword(payload.newPassword);
    } catch {
      alert("パスワードを変更しました");
      alert("ログイン画面に移ります");
    }
  },
  // パスワードの再登録
  async passwordReset({ commit }, payload) {
    const emailAddress = payload;
    // 送信されるメールを日本語に変換
    auth.languageCode = "ja";
    try {
      await auth.sendPasswordResetEmail(emailAddress);
    } catch {
      alert("送信に失敗しました");
    }
  },
  async deleteLoginUser({ commit }, payload) {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      payload.email,
      payload.password
    );
    // 最初に再認証してから変更処理を行う
    try {
      await user.reauthenticateWithCredential(credential);
    } catch {
      console.log("error");
    }
    // パスワード変更処理
    try {
      await user.delete();
      alert("ユーザー情報を削除しました");
    } catch {
      console.log("error");
    }
  },

  // firestoreからTodosのデータを取り出す
  async fetchTodos({ getters, commit }) {
    commit("initTodos");
    const snapShot = await db
      .collection(`users/${getters.uid}/todos`)
      .orderBy("created", "desc")
      .get();
    snapShot.forEach(doc =>
      commit("addTodos", { id: doc.id, task: doc.data() })
    );
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
      await db
      .collection(`users/${getters.uid}/todos`)
      .add(task)
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
  async doneTask({ getters, commit }, { todo }) {
    await db
      .collection(`users/${getters.uid}/todos`)
      .doc(todo.id)
      .update({
        done: !todo.done
      });
    commit("doneTask", { todo });
  },
  async addComment({ getters, commit }, { id, message }) {
    await db
      .collection(`users/${getters.uid}/todos`)
      .doc(id)
      .collection(`comments/${getters.uid}/message`)
      .add({ message: message });
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
    const snapShot = await db.collection(`users/${getters.uid}/todos`).get();
    snapShot.forEach(async doc => {
      const subCollection = await doc.ref
        .collection(`comments/${getters.uid}/message`)
        .get();
      subCollection.forEach(doc => {
        console.log(doc.data());
        commit("addComments", { id: doc.id, message: doc.data() });
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

  // タスク総数のカウント
  todosCount(state) {
    return state.todos.length;
  },
  // 完了タスクのカウント
  completedTodos(state) {
    return state.todos.filter(todo => todo.done).length;
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
