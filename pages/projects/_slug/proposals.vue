<template>
  <div id="proposals-page" v-loading="loading">
    <div class="container">
      <el-row :gutter="20">
        <el-col :lg="18">
          <div class="grid-content">
            <el-card
              class="box-card no-proposal"
              v-if="awarded.length === 0 && proposals.data.length === 0"
            >
              <div class="boxed-list">
                <p><b>This project has no proposals yet.</b></p>
                <p>
                  Please be patient. Freelancers will start bidding on your
                  project soon!
                </p>
              </div>
            </el-card>
            <el-card class="box-card" v-if="awarded.length">
              <!-- Awarded Freelancers -->
              <div class="boxed-list">
                <div class="boxed-list-headline">
                  <h3>
                    <i class="icon-material-outline-group"></i> Awarded
                    Freelancers
                  </h3>
                </div>
                <ul class="boxed-list-ul">
                  <li v-for="proposal in awarded" :key="proposal.id">
                    <div class="bid">
                      <!-- Avatar -->
                      <div class="bids-avatar">
                        <div class="freelancer-avatar">
                          <!-- <div class="verified-badge"></div> -->
                          <a
                            :href="'/u/' + proposal.freelancer.username"
                            target="_blank"
                            ><img
                              :src="getAvatarUrl(proposal.freelancer)"
                              alt="avatar"
                          /></a>
                        </div>
                      </div>

                      <!-- Content -->
                      <div class="bids-content">
                        <!-- Name -->
                        <div class="freelancer-name">
                          <h4>
                            <a
                              :href="'/u/' + proposal.freelancer.username"
                              target="_blank"
                              >{{ proposal.freelancer.first_name }}
                              {{ proposal.freelancer.last_name }}
                              <img
                                class="flag"
                                :src="
                                  '/images/flags/' +
                                  proposal.freelancer.location.countryCode +
                                  '.svg'
                                "
                                alt="country"
                                :title="
                                  proposal.freelancer.location.countryName
                                "
                                data-tippy-placement="top"
                            /></a>
                          </h4>
                          <el-rate
                            v-model="review"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}"
                          >
                          </el-rate>
                        </div>
                      </div>

                      <!-- Bid -->
                      <div class="bids-bid">
                        <div class="bid-rate">
                          <div class="rate">${{ proposal.amount }} USD</div>
                          <span>in {{ proposal.due_days }} days</span>
                        </div>
                      </div>

                      <!-- Description -->
                      <div class="description">
                        <span v-if="!readMore[proposal.id]">{{
                          proposal.description.slice(0, 200)
                        }}</span>
                        <span v-if="readMore[proposal.id]">{{
                          proposal.description
                        }}</span>
                        <a
                          class=""
                          href="javascript:void(0)"
                          @click="
                            readMoreLess(proposal.id, readMore[proposal.id])
                          "
                          style="color: blue"
                          v-if="proposal.description.length > 200"
                          ><span v-if="!readMore[proposal.id]"
                            >... Read more</span
                          ><span v-if="readMore[proposal.id]"> Read less</span>
                        </a>
                      </div>

                      <!-- Buttons  -->
                      <div
                        class="btns-wrapper margin-top-20"
                        v-if="
                          $auth.user.id == project.client.id ||
                          $auth.user.id == proposal.freelancer.id
                        "
                      >
                        <div
                          class="btns"
                          v-if="
                            $auth.user.id !== project.client.id &&
                            proposal.accepted_at == null
                          "
                        >
                          <el-button size="small" @click="retract(proposal.id)">
                            Retract
                          </el-button>
                          <el-button
                            size="small"
                            @click="accept(proposal.id)"
                            type="success"
                          >
                            Accept
                          </el-button>
                        </div>
                        <div
                          class="btns"
                          v-if="
                            $auth.user.id === project.client.id &&
                            proposal.accepted_at == null
                          "
                        >
                          <el-button
                            size="small"
                            @click="
                              openChatBox(
                                proposal.freelancer,
                                proposal.roomname
                              )
                            "
                          >
                            <span class="dot"></span> Chat
                          </el-button>
                          <el-button
                            size="small"
                            type="success"
                            @click="revoke(proposal.id)"
                          >
                            Revoke
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </el-card>
            <el-card class="box-card" v-if="proposals.data.length !== 0">
              <!-- Freelancers Bidding -->
              <div class="boxed-list margin-bottom-60">
                <div class="boxed-list-headline">
                  <h3>
                    <i class="icon-material-outline-group"></i> Freelancers
                    Bidding
                  </h3>
                </div>
                <ul class="boxed-list-ul">
                  <li v-for="proposal in proposals.data" :key="proposal.id">
                    <div class="bid">
                      <!-- Avatar -->
                      <div class="bids-avatar">
                        <div class="freelancer-avatar">
                          <!-- <div class="verified-badge"></div> -->
                          <a
                            :href="'/u/' + proposal.freelancer.username"
                            target="_blank"
                            ><img
                              :src="getAvatarUrl(proposal.freelancer)"
                              alt="avatar"
                          /></a>
                        </div>
                      </div>

                      <!-- Content -->
                      <div class="bids-content">
                        <!-- Name -->
                        <div class="freelancer-name">
                          <h4>
                            <a
                              :href="'/u/' + proposal.freelancer.username"
                              target="_blank"
                              >{{ proposal.freelancer.first_name }}
                              {{ proposal.freelancer.last_name }}
                              <img
                                class="flag"
                                :src="
                                  '/images/flags/' +
                                  proposal.freelancer.location.countryCode +
                                  '.svg'
                                "
                                alt=""
                                title="United Kingdom"
                                data-tippy-placement="top"
                            /></a>
                          </h4>
                          <el-rate
                            v-model="review"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}"
                          >
                          </el-rate>
                        </div>
                      </div>

                      <!-- Bid -->
                      <div class="bids-bid">
                        <div class="bid-rate">
                          <div class="rate">${{ proposal.amount }} USD</div>
                          <span>in {{ proposal.due_days }} days</span>
                        </div>
                      </div>

                      <!-- Description -->
                      <div class="description">
                        <span v-if="!readMore[proposal.id]">{{
                          proposal.description.slice(0, 200)
                        }}</span>
                        <span v-if="readMore[proposal.id]">{{
                          proposal.description
                        }}</span>
                        <a
                          class=""
                          href="javascript:void(0)"
                          @click="
                            readMoreLess(proposal.id, readMore[proposal.id])
                          "
                          style="color: blue"
                          v-if="proposal.description.length > 200"
                          ><span v-if="!readMore[proposal.id]"
                            >... Read more</span
                          ><span v-if="readMore[proposal.id]"> Read less</span>
                        </a>
                      </div>

                      <!-- Buttons  -->
                      <div
                        class="btns-wrapper margin-top-20"
                        v-if="$auth.user.id === project.client.id"
                      >
                        <div class="btns">
                          <el-button
                            size="small"
                            @click="
                              openChatBox(
                                proposal.freelancer,
                                proposal.roomname
                              )
                            "
                          >
                            <span class="dot"></span> Chat
                          </el-button>
                          <el-button
                            size="small"
                            type="success"
                            @click="award(proposal.id)"
                          >
                            Award
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <!-- Pagination -->
                <div
                  class="pagination-container margin-top-30 margin-bottom-60"
                >
                  <el-pagination
                    style="text-align: center"
                    background
                    layout="prev, pager, next"
                    :page-size="10"
                    :current-page="proposals.current_page"
                    :total="proposals.total"
                    @current-change="pageChange"
                  >
                  </el-pagination>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :lg="6">
          <div class="grid-content">
            <el-card class="box-card">
              <div class="project-info">
                <h4><b>Budget</b></h4>
                <p>${{ project.budget_min }} - ${{ project.budget_max }}</p>
              </div>
              <div class="project-info">
                <h4><b>Bids</b></h4>
                <p>{{ proposals.total + awarded.length }}</p>
              </div>
              <div class="project-info">
                <h4><b>Average bid</b></h4>
                <p>${{ Math.floor(proposals.average_bid_amount) }}.00 USD</p>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="margin-top-60"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: this.project.name,
      meta: [
        {
          hid: 'proposals',
          name: 'proposals',
          content: 'proposals',
        },
      ],
    }
  },
  data() {
    return {
      review: 4.5,
      readMore: {},
      loading: true,
      current_page: 1,
    }
  },
  async fetch({ store, params }) {},
  computed: {
    ...mapState({
      project: (state) => {
        return state.projectModules.projects.project
      },
      proposals: (state) => {
        return state.projectModules.proposals.list
      },
      awarded: (state) => {
        return state.projectModules.proposals.awarded
      },
      chatboxes: (state) => {
        return state.messaging.chatboxes.list
      },
      contacts: (state) => {
        return state.messaging.contacts.list
      },
    }),
  },
  mounted() {
    console.log(this.project)
    console.log(this.proposals)
    this.$store.commit('projectModules/projects/setActivePageTab', '/proposals')
    this.loading = false
  },
  methods: {
    openChatBox(freelancer, room_name) {
      let chatbox = {
        id: freelancer.username + '_' + this.project.id,
        room_name: room_name,
        title: freelancer.fullname,
        titleAgo: 'Just now',
        isOpen: true,
        projectDetail: this.project,
        participants: [
          {
            id: freelancer.id,
            name: freelancer.fullname,
            username: freelancer.username,
            imageUrl: freelancer.avatar_base64,
          },
          {
            id: this.$auth.user.id,
            name: this.$auth.fullname,
            username: this.$auth.username,
            imageUrl: this.$auth.avatar_base64,
          },
        ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
        titleImageUrl: freelancer.avatar_base64,
        messageList: [
          {
            type: 'text',
            author: `me`,
            data: { text: `I am ${freelancer.fullname}.Say yes!` },
          },
          { type: 'text', author: `user1`, data: { text: `No.` } },
          { type: 'text', author: `user2`, data: { text: `No.` } },
        ], // the list of the messages to show, can be paginated and adjusted dynamically
      }

      this.$store.dispatch('messaging/chatboxes/add', chatbox)
    },
    startChatting(freelancer_id) {
      let contacts = {
        first_id: this.$auth.user.id,
        second_id: freelancer_id,
        project_id: this.project.id,
      }
      this.$store
        .dispatch('messaging/contacts/create', contacts)
        .then((resp) => {})
        .catch((err) => {})
    },
    award(proposal_id) {
      console.log(proposal_id)
      this.$store
        .dispatch('projectModules/proposals/award', { id: proposal_id })
        .then((res) => {
          console.log(res)
          this.$store.dispatch('projectModules/proposals/get', {
            slug: this.$route.params.slug,
            current_page: this.current_page,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    retract(proposal_id) {
      console.log(proposal_id)
      this.$store
        .dispatch('projectModules/proposals/retract', { id: proposal_id })
        .then((res) => {
          console.log(res)
          this.$store.dispatch('projectModules/proposals/get', {
            slug: this.$route.params.slug,
            current_page: this.current_page,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    revoke(proposal_id) {
      console.log(proposal_id)
      this.$store
        .dispatch('projectModules/proposals/revoke', { id: proposal_id })
        .then((res) => {
          console.log(res)
          this.$store.dispatch('projectModules/proposals/get', {
            slug: this.$route.params.slug,
            current_page: this.current_page,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    accept(proposal_id) {
      console.log(proposal_id)
      this.$store
        .dispatch('projectModules/proposals/accept', { id: proposal_id })
        .then((res) => {
          console.log(res)
          this.$store.dispatch('projectModules/proposals/get', {
            slug: this.$route.params.slug,
            current_page: this.current_page,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    pageChange(current_page) {
      console.log('pageChange', current_page)
      this.current_page = current_page
      this.$store.dispatch('projectModules/proposals/get', {
        slug: this.$route.params.slug,
        current_page,
      })
    },
    readMoreLess(proposal_id, value) {
      this.$set(this.readMore, proposal_id, !value)
    },
    getAvatarUrl(freelancer) {
      let avatar = '/images/profile/no-avatar.png'
      if (freelancer && freelancer.avatar_base64) {
        avatar = freelancer.avatar_base64
      }
      return avatar
    },
  },
}
</script>

<style lang="scss">
#proposals-page {
  min-height: 800px;

  .el-card {
    margin-bottom: 14px;
  }
  .no-proposal {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;

    p {
      text-align: center;
    }
  }
  .text {
    font-size: 16px;
  }

  .task-tags {
    margin: 8px 0 3px 0;

    span {
      margin: 2px 2px;
    }
  }
  .project-info {
    margin-bottom: 20px;

    h4 {
      font-size: 14px;
    }
    p {
      font-size: 16px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .boxed-list ul.boxed-list-ul > li {
    border-radius: 0px;
    border: 1px solid #f2f2f2;

    .bid {
      flex-wrap: wrap;

      .bids-bid {
        .bid-rate .rate {
          font-size: 19px;
        }
      }
      .el-rate {
        position: relative;
        left: -3px;
        .el-rate__icon {
          font-size: 23px;
        }
        .el-rate__text {
          font-size: 16px;
        }
      }
      .description {
        flex: 100%;
        margin-top: 20px;
      }
      .btns-wrapper {
        flex: 100%;

        .btns {
          float: right;

          .dot {
            height: 8px;
            width: 8px;
            padding: 0;
            right: 0;
            border-radius: 50%;
            display: inline-block;
            background-color: #67c23a;

            .online {
              background-color: #67c23a;
            }
            .offline {
              background-color: #9e9e9ea1;
            }
          }
        }
      }
    }
  }
}
</style>
