
const state = {
  loading: null,
  voteWork: null
}

const mutations = {
  SET_LOADING(state, _loading) {
    state.loading = _loading
  },
  SET_VOTEWORK(state, voteWork) {
    state.voteWork = voteWork
  }
}

const actions = {
  setLoading({ commit }, _loading) {
    return commit('SET_LOADING', _loading)
  },
  setVoteWork({ commit }, voteWork) {
    return commit('SET_VOTEWORK', voteWork)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
