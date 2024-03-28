import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
 const store = createStore({
    state: {
        loading: false, //  全局loading
    },
    mutations: {
        setLoading(state, bol) {
            state.loading = bol;
        }
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState()]
 });

 export default store

