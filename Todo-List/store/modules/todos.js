import firebase, { db } from '~/plugins/firebase'

const state = () => ({
  todos: [],
  editTodo: null,
  comments: [],
})
const mutations = {
 // データを初期化する
 initTodos(state) {
  state.todos = [];
  console.log("initTodos");
},
// 取り出したデータを格納
// タスク追加
addTodos(state, {id,task}) {
  task.id = id
  state.todos.push({task});
  console.log("addTodos");
},
editTodo(state,todo) {
  state.editTodo = todo
  console.log("edit",state.editTodo);
},
updateTitle(state,val) {
  state.editTodo.task.title = val
},
updateDate(state,val) {
  state.editTodo.task.date = val
},
updateDetail(state,val) {
  state.editTodo.task.detail = val
},

// タスク削除
removeTask(state, { id }) {
  const index = state.todos.findIndex(todo => todo.task.id === id);
  state.todos.splice(index, 1);
  console.log("removeTask");
},
updateTask(state, { id, task }) {
  // インデックスを取得
  const index = state.todos.findIndex(todo => todo.task.id === id);
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
}
const actions = {
// firestoreからTodosのデータを取り出す
async fetchTodos({ getters, commit }) {
  commit("initTodos");
  const snapShot = await db
    .collection(`users/${getters.userUid}/todos`)
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
  if (getters.userUid) {
    await db.collection(`users/${getters.userUid}/todos`).add(task);
  }
  commit("addTodos",{task})
},
editTodo({ commit } ,todo) {
commit("editTodo",todo)
},
// タスク更新
async updateTask({ getters, commit }, { id, task }) {
  if (getters.userUid) {
    await db
      .collection(`users/${getters.userUid}/todos`)
      .doc(id)
      .update(task);
    commit("updateTask", { id, task });
  }
},
// タスク削除
async removeTask({ getters, commit }, { id }) {
  if (getters.userUid) {
    await db
      .collection(`users/${getters.userUid}/todos`)
      .doc(id)
      .delete();
    commit("removeTask", { id });
  }
},
// 完了、未完了切り替え
async doneTask({ getters, commit }, { todo, id }) {
  await db
    .collection(`users/${getters.userUid}/todos`)
    .doc(id)
    .update({
      done: !todo.task.done
    });
  commit("doneTask", { todo });
},
async addComment({ getters, commit }, { id, message }) {
  if (getters.userUid) {
    await db
      .collection(`users/${getters.userUid}/todos`)
      .doc(id)
      .collection(`comments/${getters.userUid}/message`)
      .add({ message: message });
  }
},
async removeComment({ getters, commit }, { id }) {
  if (getters.userUid) {
    const snapShot = await db.collection(`users/${getters.userUid}/todos`).get();
    snapShot.forEach(async doc => {
      await doc.ref
        .collection(`comments/${getters.userUid}/message`)
        .doc(id)
        .delete();
      commit("removeComment", { id });
    });
  }
},
// FIXME: id指定してログインユーザーのコメントを表示
async fetchComments({ getters, commit }) {
  commit("initComments");
  const snapShot = await db.collection(`users/${getters.userUid}/todos`).get();
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
}

const getters = {
  // uidの取得
  userUid: (state, getters, rootState, rootGetters) => {
    return rootGetters['modules/auth/uid']
  },
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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
