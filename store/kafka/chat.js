// import { KafkaProducer } from "@/kafka/producer";

export const state = () => ({
  countries: [],
});

export const mutations = {
  setCountries(state, countries) {
    state.countries = countries
  },
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  },
  async publishToKafka({ commit }, { }) {
    KafkaProducer.publishToKafka({ id: 1, data: 'content' }, 'ui_inquiries_in')
  },
};
