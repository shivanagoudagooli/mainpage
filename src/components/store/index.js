import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    actGetData () {
      let requestOptions = {
        method: 'GET'
      }
      return new Promise((resolve, reject) => {
        fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`, requestOptions)
          .then((response) => {
            if (response.ok) {
              resolve(response.json())
            } else {
              reject(response)
            }
          }).catch(error => {
            reject(error)
          })
      })
    }
  },
  modules: {
  }
})
