import { firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
// リアルタイムでtodosの中身を反映
const todoRef = db.collection('todo')

export const state = () => ({
  todos:[]
})

export const mutations = {

  // タスク追加
  create (state, payload,text) {
    state.todos.push({content: payload.content, done:false,})
  },
  // タスク削除
  remove (state, payload) {
    state.todos.splice(state.todos.indexOf(payload.todo), 1)
  },
  // 完了、未完了切り替え
  toggle (state, payload) {
    payload.done = !payload.done
  },
  update(state, { id, title, detail }) {
    const index = state.todos.findIndex(todo => todo.id === id)
    if (index >= 0) {
      state.todos[index].title = title
    }
  }

}

export const actions = {
  // 初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todoRef)
  }),

  // タスク追加
  create: firestoreAction((context, {content,date}) => {
    todoRef.create({
      content,
      date,
      done: false
    })
  }),
  // タスク削除
  remove: firestoreAction((context, id) => {
   todoRef.doc(id).delete()
  }),
  // 完了、未完了切り替え
  toggle: firestoreAction((context, todo) => {
    taskRef.doc(todo.id).update({
      done: !todo.done
    })
  },
  updateTodo({ commit }, todo) {
    commit("update", todo)
  },

}

export const getters = {
  // タスク総数のカウント
  todosCount (state) {
    return state.todos.length
  },
  // 完了タスクのカウント
  completedTodos (state,getters) {
    return state.todos.filter(todo => todo.done).length
  },
  // タスクの完了率
  progress (state,getters) {
    return (getters.completedTodos / state.todos.length) * 100
  },
  // 未完了タスクのカウント
  remainingTodos (state,getters) {
    return state.todos.length - getters.completedTodos
  },
  // 日付順でソート
  orderdTodos: (state) => {
    return _.orderBy(state.tasks, 'date', 'asc')
  }
}
