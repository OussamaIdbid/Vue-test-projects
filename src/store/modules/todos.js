import axios from "axios";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");

    commit("setTodos", response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );

    commit("newTodo", response.data);
  },
  async deleteTodo( { commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit('removeTodo', id);
  },
  async filterTodos( {commit}, value) {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${value}`)

      commit('setTodos', response.data)
  },
  async completeTodo({commit}, updateTodo) {
      
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`);
    
    
    commit('finishTodo', updateTodo)
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  limitTodos: (state, todos) => state.todos = todos,
  finishTodo: (state, todo) => {
      const index = state.todos.findIndex(x => x.id == todo.id)
      state.todos[index].completed = todo.completed
  }  

};

export default {
  state,
  getters,
  actions,
  mutations,
};
