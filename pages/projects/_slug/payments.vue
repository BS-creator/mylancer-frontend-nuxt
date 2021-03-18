<template>
  <div id="project-payment-page">
    <div class="container">
      <el-row :gutter="20">
        <el-col :lg="18">
          <el-card
            class="custom-el-card-alert"
            v-if="project.client.id === $auth.user.id"
          >
            <div class="alert-card">
              <i class="el-icon-info"></i>
              <div>
                <p>
                  You have awarded
                  <b>{{ awarded[0].freelancer.username }}</b> the project. All
                  you need to do now is wait for them to accept. You may still
                  create Milestone Payments for
                  <b>{{ awarded[0].freelancer.username }}</b> to show them you
                  are serious about working together.
                </p>
              </div>
            </div>
          </el-card>
          <el-card class="custom-el-card-alert" v-else>
            <div class="alert-card">
              <i class="el-icon-info"></i>
              <div>
                <p>
                  <b>Congratulations! You've been awarded the project!</b>
                  If you accept this project, you will be charged a project fee
                  in accordance with the <u>Fees and Charges</u>. Respond
                  quickly, otherwise <b>{{ project.client.username }}</b> might
                  close the project or offer it to someone else.
                </p>
              </div>
            </div>
          </el-card>
          <el-card>
            <div
              slot="header"
              class="clearfix"
              v-if="project.client.id === $auth.user.id"
            >
              <div class="boxed-list-ul">
                <div class="bid">
                  <!-- Avatar -->
                  <div class="bids-avatar">
                    <div class="freelancer-avatar">
                      <!-- <div class="verified-badge"></div> -->
                      <a
                        :href="'/u/' + awarded[0].freelancer.username"
                        target="_blank"
                        ><img
                          :src="getAvatarUrl(awarded[0].freelancer)"
                          alt="avatar"
                      /></a>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="bids-content">
                    <!-- Name -->
                    <div class="freelancer-name">
                      <h4>
                        <img
                          class="flag"
                          :src="
                            '/images/flags/' +
                            awarded[0].freelancer.location.countryCode +
                            '.svg'
                          "
                          alt="country"
                          :title="awarded[0].freelancer.location.countryName"
                          data-tippy-placement="top"
                        />
                        <a
                          :href="'/u/' + awarded[0].freelancer.username"
                          target="_blank"
                          >{{ awarded[0].freelancer.first_name }}
                          {{ awarded[0].freelancer.last_name }}
                        </a>
                      </h4>
                    </div>
                  </div>

                  <!-- Bid -->
                  <div class="bids-bid">
                    <div class="bid-rate">
                      <div class="rate">${{ awarded[0].amount }} USD</div>
                      <span>in {{ awarded[0].due_days }} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div slot="header" class="clearfix" v-else>
              <div class="boxed-list-ul">
                <div class="bid">
                  <!-- Avatar -->
                  <div class="bids-avatar">
                    <div class="freelancer-avatar">
                      <!-- <div class="verified-badge"></div> -->
                      <a :href="'/u/' + project.client.username" target="_blank"
                        ><img :src="getAvatarUrl(project.client)" alt="avatar"
                      /></a>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="bids-content">
                    <!-- Name -->
                    <div class="freelancer-name">
                      <h4>
                        <img
                          class="flag"
                          :src="
                            '/images/flags/' +
                            project.client.location.countryCode +
                            '.svg'
                          "
                          alt="country"
                          :title="project.client.location.countryName"
                          data-tippy-placement="top"
                        />
                        <a
                          :href="'/u/' + project.client.username"
                          target="_blank"
                          >{{ project.client.first_name }}
                          {{ project.client.last_name }}
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="font-bold text-xl">Payment Summary</h3>
              <div class="flex justify-between mt-6">
                <div>
                  <label class="font-bold text-sm">Requested</label>
                  <p class="mb-0 text-lg">$00.00 USD</p>
                </div>
                <div>
                  <label class="font-bold text-sm">In Progress</label>
                  <p class="mb-0 text-lg">
                    ${{ inProgressSum.toFixed(2) }} USD
                  </p>
                </div>
                <div>
                  <label class="font-bold text-sm">Released</label>
                  <p class="mb-0 text-lg">${{ releasedSum.toFixed(2) }} USD</p>
                </div>
              </div>
            </div>
          </el-card>
          <el-card>
            <div>
              <h3 class="font-bold text-xl inline-block">Milestone Payments</h3>
              <el-button
                type="primary"
                size="small"
                class="float-right"
                icon="el-icon-plus"
                @click="milestoneCreateModal = true"
              >
                Create Milestone
              </el-button>
            </div>
            <h4 class="mt-5">Milestone Requests</h4>
            <el-table :data="milestones" stripe style="width: 100%">
              <el-table-column
                prop="created_at"
                label="Date"
                width="120px"
                sortable
              >
                <template slot-scope="scope">
                  {{
                    $moment(new Date(scope.row.created_at)).format(
                      'MMM Do YYYY'
                    )
                  }}
                </template>
              </el-table-column>
              <el-table-column prop="description" label="Description">
              </el-table-column>
              <el-table-column
                prop="status_label"
                label="Status"
                width="100px"
                sortable
              >
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.cancelled_at !== null"
                    style="color: red"
                    >Cancelled</span
                  >
                  <span
                    v-else-if="scope.row.cancel_requested_at !== null"
                    style="color: red"
                  >
                    Cancellation Requested
                  </span>
                  <span
                    v-else-if="scope.row.released_at !== null"
                    style="color: green"
                  >
                    Released
                  </span>
                  <span v-else-if="scope.row.inprogressed_at !== null">
                    In Progress
                  </span>
                  <span v-else>Funded</span>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="Amount" sortable>
                <template slot-scope="scope">
                  ${{ scope.row.amount.toFixed(2) }} USD
                </template>
              </el-table-column>
              <el-table-column label="Action" fixed="right">
                <template slot-scope="scope">
                  <!-- For client -->
                  <span v-if="scope.row.from === $auth.user.id">
                    <el-dropdown
                      size="small"
                      split-button
                      type="default"
                      width="100px"
                      v-if="
                        scope.row.released_at == null &&
                        scope.row.cancelled_at === null &&
                        scope.row.cancel_requested_at === null
                      "
                      @click="releaseMilestone(scope.row)"
                    >
                      Release Milestone
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          style="min-width: 160px"
                          @click.native="cancelMilestoneRequest(scope.row)"
                        >
                          Cancel
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-tag
                      effect="plain"
                      size="small"
                      type="success"
                      v-if="
                        scope.row.cancel_requested_at !== null &&
                        scope.row.cancelled_at === null
                      "
                    >
                      Waiting approvement
                    </el-tag>
                    <el-button
                      type="default"
                      size="small"
                      v-if="scope.row.cancelled_at !== null"
                      @click="restoreMilestone(scope.row)"
                    >
                      Restore Milestone
                    </el-button>
                  </span>

                  <!-- For freelancer -->
                  <span v-if="scope.row.to === $auth.user.id">
                    <el-dropdown
                      size="small"
                      split-button
                      type="default"
                      width="100px"
                      v-if="
                        scope.row.released_at == null &&
                        scope.row.cancelled_at === null &&
                        scope.row.cancel_requested_at === null
                      "
                      @click="requestReleaseMilestone(scope.row)"
                    >
                      Request Release
                      <el-dropdown-menu slot="dropdown"> </el-dropdown-menu>
                    </el-dropdown>
                    <el-popconfirm
                      confirm-button-text="Approve"
                      cancel-button-text="Deny"
                      icon="el-icon-info-hide"
                      icon-color="red"
                      v-if="
                        scope.row.cancel_requested_at !== null &&
                        scope.row.cancelled_at === null
                      "
                      @onConfirm="cancelRequestApprove(scope.row)"
                      @onCancel="cancelRequestDeny(scope.row)"
                    >
                      <el-button slot="reference" type="default" size="small">
                        Make a decision
                      </el-button>
                    </el-popconfirm>
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <div></div>
          </el-card>
        </el-col>
        <el-col :lg="6">
          <el-card>
            <div slot="header" class="clearfix">
              <span class="font-bold">What are Milestone Payments?</span>
            </div>
            <p>
              Milestone Payments are agreed upon by you and your freelancer
              before work begins. Once you create a Milestone Payment, we
              securely hold your funds so the freelancer cannot access them.
              Milestone Payments should only be released when you are 100%
              satisfied with the work.
            </p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="Create Milestone"
      width="30%"
      :visible.sync="milestoneCreateModal"
    >
      <el-form
        label-position="top"
        label-width="100px"
        ref="milestoneForm"
        :model="milestoneForm"
        :rules="milestoneFormRules"
      >
        <el-form-item label="Amount" prop="amount">
          <el-input
            type="number"
            class="no-right-padding"
            v-model="milestoneForm.amount"
          >
            <template slot="prepend">$</template>
            <template slot="append">USD</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="milestoneForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="milestoneCreateModal = false">Cancel</el-button>
        <el-button type="primary" @click="createMilestone">
          Create Milestone
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    var checkMilestoneAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please enter an amount'))
      }
      setTimeout(() => {
        if (value < 1) {
          callback(new Error('Please enter a larger amount'))
        } else if (value > 10000000) {
          callback(new Error('Please enter a lesser amount'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      pageLoading: true,
      milestoneCreateModal: false,
      milestoneForm: {
        amount: '',
        description: '',
      },
      milestoneFormRules: {
        amount: [
          { required: true, validator: checkMilestoneAmount, trigger: 'blur' },
        ],
        description: [
          {
            required: true,
            message: 'Please enter a description',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('projectModules/milestones/get', params.slug)
  },
  computed: {
    ...mapState({
      project: (state) => {
        return state.projectModules.projects.project
      },
      awarded: (state) => {
        return state.projectModules.proposals.awarded
      },
      milestones: (state) => {
        return state.projectModules.milestones.list
      },
      inProgressSum: (state) => {
        return state.projectModules.milestones.inProgressSum
      },
      releasedSum: (state) => {
        return state.projectModules.milestones.releasedSum
      },
    }),
  },
  mounted() {
    this.$store.commit('projectModules/projects/setActivePageTab', '/payments')
    console.log('milestones: ', this.milestones)
  },
  methods: {
    createMilestone() {
      this.$refs['milestoneForm'].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('projectModules/milestones/create', {
              project_id: this.project.id,
              from: this.$auth.user.id,
              to: this.awarded[0].freelancer.id,
              amount: this.milestoneForm.amount,
              description: this.milestoneForm.description,
            })
            .then((res) => {
              console.log('res', res.data)
              this.$auth.setUser(res.data.user)

              this.milestoneCreateModal = false
              this.getMilestones()
            })
            .catch((err) => {
              console.log('error: ', err.response)
              this.$message.error(err.response.data.message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    releaseMilestone(milestone) {
      console.log('releaseMilestone: ', milestone)
      if (milestone.from == this.$auth.user.id) {
        this.$store
          .dispatch('projectModules/milestones/release', milestone.id)
          .then((res) => {
            console.log('res', res.data)
            this.getMilestones()
          })
      }
    },
    cancelMilestoneRequest(milestone) {
      console.log('cancelMilestoneRequest', milestone)
      this.$store
        .dispatch('projectModules/milestones/cancel_request', milestone.id)
        .then((res) => {
          console.log('res', res.data)
          this.getMilestones()
        })
    },
    cancelRequestApprove(milestone) {
      console.log('cancelRequestApprove', milestone)
      this.$store
        .dispatch('projectModules/milestones/cancel_approve', milestone.id)
        .then((res) => {
          console.log('res', res.data)
          this.getMilestones()
        })
    },
    cancelRequestDeny(milestone) {
      console.log('cancelRequestDeny', milestone)
      this.$store
        .dispatch('projectModules/milestones/cancel_deny', milestone.id)
        .then((res) => {
          console.log('res', res.data)
          this.getMilestones()
        })
    },
    restoreMilestone(milestone) {
      console.log('restoreMilestone', milestone)
      this.$store
        .dispatch('projectModules/milestones/restore', milestone.id)
        .then((res) => {
          console.log('res', res.data)
          this.$auth.setUser(res.data.user)
          this.getMilestones()
        })
    },
    getMilestones() {
      this.$store.dispatch(
        'projectModules/milestones/get',
        this.$route.params.slug
      )
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

<style lang='scss'>
#project-payment-page {
  min-height: 800px;

  .el-card {
    margin-bottom: 14px;
  }

  .custom-el-card-alert {
    border-top: 5px solid var(--color-primary);

    .alert-card {
      display: flex;

      > i {
        font-size: 22px;
        color: var(--color-primary);
        margin-right: 13px;
        margin-top: 5px;
      }
      p {
        font-size: 15px;
        margin-bottom: 0;
      }
    }
  }
}
</style>
