export default {
    namespaced: true,
    
    state() {
        return {
            counter: 1
        };
    },

    mutations: {
        setCounter(state, counter) {
            state.counter = counter;
        }
    }
}