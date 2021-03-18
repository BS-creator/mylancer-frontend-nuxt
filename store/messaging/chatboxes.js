import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [
    // {
    //   id: 1,
    //   title: 'chatbox 1',
    //   titleAgo: '2 days ago',
    //   isOpen: true,
    //   projectDetail: { slug: 'project slug', name: 'fdsa' },
    //   participants: [
    //     {
    //       id: 'user1',
    //       name: 'Matteo',
    //       imageUrl:
    //         'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4',
    //     },
    //     {
    //       id: 'user2',
    //       name: 'Support',
    //       imageUrl:
    //         'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4',
    //     },
    //   ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
    //   titleImageUrl:
    //     'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
    //   messageList: [
    //     { type: 'text', author: `me`, data: { text: `Say yes!` } },
    //     { type: 'text', author: `user1`, data: { text: `No.` } },
    //     { type: 'text', author: `user2`, data: { text: `No.` } },
    //   ], // the list of the messages to show, can be paginated and adjusted dynamically
    //   newMessagesCount: 2,
    // },
  ],
  chatbox: {},
  activeBoxId: '',
});

export const mutations = {
  // BEGIN Chat Box
  set(state, chatboxes) {
    state.list = chatboxes
  },
  add(state, chatbox) {
    state.list = [chatbox, ...state.list]
  },
  remove(state, chatbox_id) {
    state.list = state.list.filter(p => chatbox_id !== p.id)
  },
  open(state, chatbox_id) {
    let chatbox = state.list.find(p => chatbox_id === p.id)
    chatbox.isOpen = true
  },
  close(state, chatbox_id) {
    let chatbox = state.list.find(p => chatbox_id === p.id)
    chatbox.isOpen = false
  },
  setActive(state, chatbox_id) {
    state.activeBoxId = chatbox_id;
  },
  // END Chat Box
  // BEGIN Chat Message
  addMessage(state, { chatboxId, newMsg }) {
    let chatbox = state.list.find(p => chatboxId === p.id)
    chatbox.messageList = [...chatbox.messageList, newMsg]
  },
  setMessageList(state, { messageList, chatboxId }) {
    let chatbox = state.list.find(p => chatboxId === p.id)
    if (chatbox) {
      chatbox.messageList = messageList
    }
  },
  // END Chat Message
};

export const actions = {
  // BEGIN Chat Box
  async get({ commit }, user_id) {
    await this.$axios.get(`/api/message-chatbox/${user_id}/get`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.chatboxes)
        }
      })
  },
  async add({ commit, state }, chatbox) {
    let existings = state.list.filter((p) => chatbox.id === p.id)
    console.log('existings', existings)
    if (existings.length) {
      await commit('open', chatbox.id)
    } else {
      await commit('add', chatbox)
    }
    await commit('setActive', chatbox.id)
  },
  async remove({ commit }, chatbox_id) {
    await commit('remove', chatbox_id)
  },
  async open({ commit }, chatbox_id) {
    await commit('open', chatbox_id)
  },
  async close({ commit }, chatbox_id) {
    await commit('close', chatbox_id)
  },
  // END Chat Box
  // BEGIN Chat Message
  async getMessageList({ commit }, { room_name, chatboxId }) {
    await this.$axios.get(`/api/message-conversation/${room_name}/get`)
      .then((res) => {
        if (res.status === 200) {
          commit('setMessageList', { messageList: res.data.messageList, chatboxId })
        }
      })

  },
  async addMessage({ commit }, params) {
    await commit('addMessage', params)
  },
  createMessage({ commit }, message) {
    return this.$axios.post(`/api/message-conversation/create`, message)
  },
  // END Chat Message
};
