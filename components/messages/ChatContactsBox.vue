<template>
  <div class="contacts-box">
    <header class="header">
      <div class="title">Chats</div>
      <div class="btns">
        <el-button type="text" icon="el-icon-message"></el-button>
        <el-button
          type="text"
          class="collapse-contact-box"
          icon="el-icon-arrow-down"
        ></el-button>
      </div>
    </header>
    <div class="sub-header"></div>
    <el-scrollbar wrap-class="contacts-list-scroll">
      <div class="contacts-list" style="min-height: 300px">
        <div v-if="contacts.length">
          <chat-contact
            v-for="contact in contacts.filter(
              (c) =>
                c.user.fullname
                  .toLowerCase()
                  .indexOf(contactSearch.toLowerCase()) != -1
            )"
            :key="contact.id"
            :contact="contact"
          />
          <!-- <div class="user-avatar contact-avatar status-online">
              <img :src="getAvatarUrl(contact.user)" alt="avatar" />
            </div>
            <div class="content">
              <div class="project-title">{{ contact.user.fullname }}</div>
              <div class="message-content" v-if="contact.message">
                {{ contact.message.latest }}
              </div>
            </div> -->
          <!-- </div> -->
        </div>
        <div v-else style="text-align: center; font-size: 15px">
          No contacts yet...
        </div>
      </div>
    </el-scrollbar>
    <div class="search-input">
      <el-input
        v-model="contactSearch"
        type="search"
        size="mini"
        placeholder="Search for People"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      contactSearch: '',
    }
  },
  computed: {
    ...mapState({
      contacts: (state) => {
        return state.messaging.contacts.list
      },
      chatboxes: (state) => {
        return state.messaging.chatboxes.list
      },
    }),
  },
  mounted() {
    // socket
    // this.socket = this.$nuxtSocket({
    //   name: 'chat_messaging',
    //   channel: '/chat_messaging',
    // })
    // this.socket.on('newMessage', (res) => {
    //   console.log('newMessage: ', res)
    //   this.$store.commit('messaging/contacts/setLatestMsg', {
    //     roomName: res.roomName,
    //     message: res.message,
    //   })
    // })

    let contactboxOpen = localStorage.getItem('mylancer.contactbox.open')
    contactboxOpen = contactboxOpen ? eval(contactboxOpen) : false
  },
  methods: {
    openChatBox(contact) {
      let chatbox = {
        id: contact.user.username + '_' + contact.project.id,
        room_name: contact.room_name,
        title: contact.user.fullname,
        titleAgo: 'Just now',
        isOpen: true,
        projectDetail: contact.project,
        participants: [
          {
            id: contact.user.id,
            name: contact.user.fullname,
            username: contact.user.username,
            imageUrl: contact.user.avatar_base64,
          },
          {
            id: this.$auth.user.id,
            name: this.$auth.fullname,
            username: this.$auth.username,
            imageUrl: this.$auth.avatar_base64,
          },
        ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
        titleImageUrl: contact.user.avatar_base64,
        messageList: [
          {
            type: 'text',
            author: `me`,
            data: { text: `I am ${contact.user.fullname}.Say yes!` },
          },
          { type: 'text', author: `user1`, data: { text: `No.` } },
        ], // the list of the messages to show, can be paginated and adjusted dynamically
      }

      this.$store.dispatch('messaging/chatboxes/add', chatbox)
    },
    getAvatarUrl(user) {
      let avatar = '/images/profile/no-avatar.png'
      if (user && user.avatar_base64) {
        avatar = user.avatar_base64
      }
      return avatar
    },
  },
}
</script>

<style lang="scss">
.contacts-box {
  position: fixed;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-animation: fadeIn-data-v-7e6303be;
  animation: fadeIn-data-v-7e6303be;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  z-index: 1000;
  width: 235px;
  height: 350px;
  right: 0;
  bottom: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  // & > * {
  //   border: 1px solid #9e9e9e63;
  // }

  .header {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    position: relative;
    box-sizing: border-box;
    padding: 4px 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: var(--color-primary);
    color: rgb(255, 255, 255);
    display: flex;
    justify-content: space-between;

    .title {
    }
    .btns {
      & > button {
        color: white;
        padding: 0;
      }
    }
  }
  .toggle-part {
  }
  .sc-sub-header {
    padding: 4px 10px;
    background: #f7f7f7;
    border-bottom: 1px solid #9e9e9e63;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-scrollbar {
    border: 1px solid #9e9e9e63;
    border-top: none;
  }
  .contacts-list-scroll {
    overflow: auto !important;
    overflow-y: scroll !important;
  }
  .contacts-list {
    padding: 10px 0;
    height: 80%;

    .contact {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      padding: 5px 10px;
      transition: 0.3s;

      &:hover {
        background: #9e9e9e38;
      }
      .contact-avatar {
        width: 45px;
      }
      .content {
        font-size: 14px;
        width: 75%;
        padding-top: 3px;

        .project-title {
          line-height: 1.2;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .message-content {
          line-height: 1.2;
          margin-top: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .search-input {
    padding: 10px;
    border: 1px solid #9e9e9e63;
    border-top: none;
  }
}
</style>
