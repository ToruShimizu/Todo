export { default as AddComment } from '../../components/Comment/AddComment.vue'
export { default as Comment } from '../../components/Comment/Comment.vue'
export { default as CreateUser } from '../../components/CreateUser/CreateUser.vue'
export { default as Header } from '../../components/Header/Header.vue'
export { default as SideNav } from '../../components/Header/SideNav.vue'
export { default as ResetPassword } from '../../components/ResetPassword/ResetPassword.vue'
export { default as AddTask } from '../../components/Todos/AddTask.vue'
export { default as FilteredTask } from '../../components/Todos/FilteredTask.vue'
export { default as SearchTask } from '../../components/Todos/SearchTask.vue'
export { default as TaskTable } from '../../components/Todos/TaskTable.vue'
export { default as Todos } from '../../components/Todos/Todos.vue'
export { default as UpdateTask } from '../../components/Todos/UpdateTask.vue'
export { default as DeleteUser } from '../../components/UpdateUserInfo/DeleteUser.vue'
export { default as UpdateEmailAddress } from '../../components/UpdateUserInfo/UpdateEmailAddress.vue'
export { default as UpdatePassword } from '../../components/UpdateUserInfo/UpdatePassword.vue'
export { default as UpdateUserName } from '../../components/UpdateUserInfo/UpdateUserName.vue'

export const LazyAddComment = import('../../components/Comment/AddComment.vue' /* webpackChunkName: "components/Comment/AddComment'}" */).then(c => c.default || c)
export const LazyComment = import('../../components/Comment/Comment.vue' /* webpackChunkName: "components/Comment/Comment'}" */).then(c => c.default || c)
export const LazyCreateUser = import('../../components/CreateUser/CreateUser.vue' /* webpackChunkName: "components/CreateUser/CreateUser'}" */).then(c => c.default || c)
export const LazyHeader = import('../../components/Header/Header.vue' /* webpackChunkName: "components/Header/Header'}" */).then(c => c.default || c)
export const LazySideNav = import('../../components/Header/SideNav.vue' /* webpackChunkName: "components/Header/SideNav'}" */).then(c => c.default || c)
export const LazyResetPassword = import('../../components/ResetPassword/ResetPassword.vue' /* webpackChunkName: "components/ResetPassword/ResetPassword'}" */).then(c => c.default || c)
export const LazyAddTask = import('../../components/Todos/AddTask.vue' /* webpackChunkName: "components/Todos/AddTask'}" */).then(c => c.default || c)
export const LazyFilteredTask = import('../../components/Todos/FilteredTask.vue' /* webpackChunkName: "components/Todos/FilteredTask'}" */).then(c => c.default || c)
export const LazySearchTask = import('../../components/Todos/SearchTask.vue' /* webpackChunkName: "components/Todos/SearchTask'}" */).then(c => c.default || c)
export const LazyTaskTable = import('../../components/Todos/TaskTable.vue' /* webpackChunkName: "components/Todos/TaskTable'}" */).then(c => c.default || c)
export const LazyTodos = import('../../components/Todos/Todos.vue' /* webpackChunkName: "components/Todos/Todos'}" */).then(c => c.default || c)
export const LazyUpdateTask = import('../../components/Todos/UpdateTask.vue' /* webpackChunkName: "components/Todos/UpdateTask'}" */).then(c => c.default || c)
export const LazyDeleteUser = import('../../components/UpdateUserInfo/DeleteUser.vue' /* webpackChunkName: "components/UpdateUserInfo/DeleteUser'}" */).then(c => c.default || c)
export const LazyUpdateEmailAddress = import('../../components/UpdateUserInfo/UpdateEmailAddress.vue' /* webpackChunkName: "components/UpdateUserInfo/UpdateEmailAddress'}" */).then(c => c.default || c)
export const LazyUpdatePassword = import('../../components/UpdateUserInfo/UpdatePassword.vue' /* webpackChunkName: "components/UpdateUserInfo/UpdatePassword'}" */).then(c => c.default || c)
export const LazyUpdateUserName = import('../../components/UpdateUserInfo/UpdateUserName.vue' /* webpackChunkName: "components/UpdateUserInfo/UpdateUserName'}" */).then(c => c.default || c)
