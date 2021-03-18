export const state = () => ({
  list: [
    // {
    //   id: 3,
    //   room_name: 3,
    //   user: {
    //     id: '',
    //     username: 'username',
    //     fullname: 'fullname',
    //     avatar_base64: '',
    //   },
    //   project: {
    //     id: '',
    //     name: 'project name',
    //     slug: 'project slug',
    //   },
    //   message: {
    //     latest: 'Hello world Hello world Hello world Hello world Hello world Hello world ',
    //     unread: 2,
    //   }
    // },
  ],
  contact: {},
});

export const mutations = {
  set(state, contacts) {
    state.list = contacts
  },
  add(state, contact) {
    state.list = [contact, ...state.list]
  },
  setConnection(state, { contactId, connection }) {
    let contact = state.list.find(p => contactId === p.id)
    contact.connection = connection
  },
  setLatestMsg(state, { roomName, message }) {
    let contact = state.list.find(p => roomName === p.room_name)
    contact.message.latest = message
  },
};

export const actions = {
  async get({ commit }, user_id) {
    await this.$axios.get(`/api/message-contact/get`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.contacts)
        }
      })
  },
  async add({ commit }, contact) {
    await commit('add', contact)
  },
  create({ commit }, contacts) {
    return this.$axios.post(`/api/message-contact/create`, contacts)
  },
};
