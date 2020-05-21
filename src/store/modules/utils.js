
const state = {
  loading: null
  // voteWork: null
  // active: null
}

const mutations = {
  SET_LOADING(state, _loading) {
    state.loading = _loading
  }
  // SET_VOTEWORK(state, voteWork) {
  //   state.voteWork = voteWork
  // }
  // SET_ACTIVE(state, active) {
  //   state.active = active
  // }
}

const actions = {
  setLoading({ commit }, _loading) {
    return commit('SET_LOADING', _loading)
  }
  // setVoteWork({ commit }, voteWork) {
  //   return commit('SET_VOTEWORK', voteWork)
  // }
  // setActive({ commit }, active) {
  //   return commit('SET_ACTIVE', active)
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
