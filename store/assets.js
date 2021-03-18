import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  countries: [],
});

export const mutations = {
  setCountries(state, countries) {
    state.countries = countries
  },
};

export const actions = {
  async getCountries({ commit }) {
    await this.$axios.get(`/json/countries.json`)
      .then((res) => {
        if (res.status === 200) {
          commit('setCountries', res.data)
        }
      })
  },
};
