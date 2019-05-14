import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import VuePersist from 'vuex-persist'
const vuexLocal = new VuePersist({
    storage: window.localStorage
})
export default new vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        list: [],
        list1: [],
        reg_id:''
    },
    mutations: {
        dj(state, p) {
            let ly = false;
            for (let i = 0; i < state.list.length; i++) {
                if (state.list[i].address == p.address) {
                    ly = true
                }
            }
            if (!ly) {
                state.list.push(p)
            }
        },
        qk(state) {
            state.list.splice(0)
        },
        reg(state, k) {
            state.reg_id = k
        },
        edit(state){
            state.reg_id=''
        }
    },
    getters: {
    }
})