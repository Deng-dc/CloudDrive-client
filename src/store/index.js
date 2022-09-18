import { createStore } from 'vuex';
import ModuleUser from './user';
import ModuleDrive from './drive';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: ModuleUser,
    drive: ModuleDrive, 
  }
});
