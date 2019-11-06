import Vue from 'vue'
import Vuex from 'vuex'
import cars from "./modules/cars";
//Load vuex
Vue.use(Vuex)

//Create store
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cars,
  }
})
