<template>
  <div id="project-detail-page">
    <div class="container">
      <el-row :gutter="20">
        <el-col :md="18">
          <el-row>
            <el-col :md="24">
              <div class="grid-content">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span class="project-details-header-text"
                      >Project Details</span
                    >
                    <div style="float: right; padding: 3px 0">
                      <div class="task-offers">
                        <strong
                          >${{ project.budget_min }} - ${{
                            project.budget_max
                          }}</strong
                        >
                        <span v-if="project.pay_type == 'fixed'">Fixed</span>
                        <span v-if="project.pay_type == 'hourly'">Hourly</span>
                      </div>
                    </div>
                  </div>
                  <div class="text item">
                    {{ project.description }}
                  </div>
                  <div class="margin-top-20"></div>
                  <div>
                    <h4 style="font-weight: bold">Skills Required</h4>
                    <div class="task-tags">
                      <span v-for="skill in project.skills" :key="skill.id">{{
                        skill.name
                      }}</span>
                    </div>
                  </div>
                  <div class="margin-top-20"></div>
                  <div></div>
                </el-card>
              </div>
            </el-col>
            <el-col
              :md="24"
              v-if="
                $auth &&
                $auth.user.id !== project.client.id &&
                (!applied || justApplied)
              "
            >
              <div class="grid-content">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span class="project-details-header-text"
                      >Place a Bid on this Project</span
                    >
                  </div>
                  <div class="item">
                    <p>
                      You will be able to edit your bid until the project is
                      awarded to someone.
                    </p>
                    <el-form
                      :model="bidForm"
                      :rules="bidRules"
                      label-position="top"
                      ref="bidForm"
                      label-width="120px"
                      class="bid-form"
                    >
                      <h4 class="big-label">Bid Details</h4>
                      <el-row :gutter="20">
                        <el-col :md="12">
                          <el-form-item label="Bid Amount" prop="amount">
                            <el-input
                              placeholder="Please input"
                              type="number"
                              min="3"
                              v-model="bidForm.amount"
                              v-on:input="changeBidAmount"
                            >
                              <template slot="prepend">$</template>
                              <template slot="append">USD</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :md="12">
                          <el-form-item
                            label="This project will be delivered in"
                            prop="due_days"
                          >
                            <el-input
                              placeholder="Please input"
                              type="number"
                              min="1"
                              v-model="bidForm.due_days"
                            >
                              <template slot="append">Days</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-form-item
                        label="Describe Your Proposal"
                        prop="description"
                      >
                        <el-input
                          type="textarea"
                          rows="8"
                          v-model="bidForm.description"
                        ></el-input>
                      </el-form-item>

                      <h4 class="big-label">Suggest Milestone Payments</h4>
                      <p class="text-gray-500">
                        Help the client by providing a breakdown of tasks to be
                        done in this project.
                      </p>
                      <el-row :gutter="20">
                        <div class="milestones">
                          <div
                            class="milestone"
                            v-for="milestone in milestones"
                            :key="milestone.id"
                          >
                            <el-col :md="16">
                              <el-form-item prop="amount">
                                <el-input
                                  placeholder="Please input"
                                  min="3"
                                  v-model="milestone.description"
                                >
                                </el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :md="8">
                              <el-form-item prop="amount">
                                <el-input
                                  placeholder="Please input"
                                  type="number"
                                  min="3"
                                  v-model="milestone.amount"
                                >
                                  <template slot="prepend">$</template>
                                  <template slot="append">USD</template>
                                </el-input>
                              </el-form-item>
                            </el-col>
                          </div>
                        </div>
                        <el-col :md="12">
                          <el-button
                            type="default"
                            size="small"
                            icon="el-icon-plus"
                            @click="createMilestoneForm"
                          >
                            Add another Milestone
                          </el-button>
                          <el-alert
                            title="Total suggested milestone amount must not exceed the bid amount. "
                            type="error"
                            show-icon
                            :closable="false"
                            v-if="milestoneSum >= bidForm.amount"
                          >
                          </el-alert>
                        </el-col>
                      </el-row>

                      <div class="margin-top-25"></div>
                      <el-form-item>
                        <el-button
                          type="primary"
                          :disabled="proposalSubmitting"
                          @click="submitProposal()"
                        >
                          <span v-show="!proposalSubmitting"> Place Bid </span>
                          <span v-show="proposalSubmitting"
                            ><i class="el-icon-loading"></i> Submitting now...
                          </span>
                        </el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="margin-top-20"></div>
                  <div></div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :md="6">
          <el-row>
            <el-col :md="24">
              <div class="grid-content">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span><b>About the Employer</b></span>
                  </div>
                  <div class="client-infos">
                    <div class="info">
                      <i class="el-icon-location-information"></i>
                      <span
                        >{{ project.client.location.countryName }}
                        <img
                          :src="
                            '/images/flags/' +
                            project.client.location.countryCode +
                            '.svg'
                          "
                          style="width: 20px; display: inline-block"
                      /></span>
                    </div>
                    <div class="info">
                      <i class="el-icon-trophy"></i>
                      <span>0 projects completed</span>
                    </div>
                    <div class="info">
                      <i class="el-icon-user"></i>
                      <span
                        ><el-rate
                          v-model="review"
                          disabled
                          text-color="#ff9900"
                          style="display: inline-block"
                        >
                        </el-rate
                      ></span>
                    </div>
                    <div class="info">
                      <i class="el-icon-time"></i>
                      <span
                        >Member since
                        {{
                          new Date(project.client.created_at).toDateString()
                        }}</span
                      >
                    </div>

                    <h4 class="margin-top-20"><b>Employer Verification</b></h4>

                    <div class="info">
                      <i class="el-icon-success verification"></i>
                      <span>Identity verified</span>
                    </div>
                    <div class="info">
                      <i class="el-icon-success verification"></i>
                      <span>Payment method verified</span>
                    </div>
                    <div class="info">
                      <i class="el-icon-success verification"></i>
                      <span>Deposit made</span>
                    </div>
                    <div class="info">
                      <i class="el-icon-success verification"></i>
                      <span>Email address verified</span>
                    </div>
                    <div class="info">
                      <i class="el-icon-success verification active"></i>
                      <span>Profile completed</span>
                    </div>
                    <div class="info">
                      <i class="el-icon-success verification"></i>
                      <span>Phone number verified</span>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="margin-top-60"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      proposalSubmitting: false,
      review: 4.5,
      bidForm: {
        amount: 300,
        due_days: 7,
        description: '',
      },
      bidRules: {
        amount: [
          {
            required: true,
            message: 'Please enter Bid Amount',
            trigger: 'blur',
          },
        ],
        due_days: [
          {
            required: true,
            message: 'Please enter number of days',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: 'Please enter your proposal',
            trigger: 'blur',
          },
          {
            min: 100,
            message: 'Your proposal must be at least 100 characters',
            trigger: 'blur',
          },
        ],
      },
      milestones: [
        {
          description: 'Project Milestone',
          amount: 200,
        },
      ],
      milestoneSum: 0,
      justApplied: false,
      everCreatedMilestoneForm: false,
    }
  },
  async fetch({ store, params }) {},
  async asyncData({ params, $axios }) {
    const resp = await $axios.$get(`api/projects/${params.slug}/i-am-applied`)
    return { applied: resp.applied }
  },
  computed: {
    ...mapState({
      project: (state) => {
        return state.projectModules.projects.project
      },
    }),
  },
  mounted() {
    console.log(this.project)
    console.log(this.applied)
    this.bidForm.amount = Math.floor(
      (parseInt(this.project.budget_min) + parseInt(this.project.budget_max)) /
        2
    )
    // this.milestoneSum = this.bidForm.amount
    this.milestones[0].amount = this.bidForm.amount
    this.$store.commit('projectModules/projects/setActivePageTab', '/details')
  },
  methods: {
    submitProposal() {
      let vm = this
      let action = 'projectModules/proposals/create'

      this.$refs['bidForm'].validate((valid) => {
        if (valid) {
          vm.proposalSubmitting = true
          vm.$store
            .dispatch(action, { ...vm.bidForm, project_id: vm.project.id })
            .then((resp) => {
              vm.proposalSubmitting = false
              vm.justApplied = true
              vm.$notify({
                title: '',
                message: 'Submitted successfully',
                type: 'success',
                position: 'bottom-right',
              })
              // this.$router.push({
              //   name: 'projects-slug-proposals',
              //   params: this.$route.params.slug,
              // })
              this.$router.push(
                `/projects/${this.$route.params.slug}/proposals`
              )
            })
            .catch((err) => {
              vm.proposalSubmitting = false
              console.log(err.response)
              if (err.response.status == 400) {
                vm.$notify.error({
                  title: '',
                  message: err.response.data.error,
                })
              } else {
                vm.$notify.error({
                  title: '',
                  message: 'There was an error while submitting your proposal.',
                })
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changeBidAmount() {
      console.log('changeBidAmount', this.bidForm.amount)
      if (this.everCreatedMilestoneForm) return // if user tried to add more milestone, then it ignores applying value into milestone amount
      this.milestones[0].amount = this.bidForm.amount
    },
    createMilestoneForm() {
      let sum = 0
      for (let i = 0; i < this.milestones.length; i++) {
        sum += parseInt(this.milestones[i].amount)
      }
      console.log('sum: ', sum)
      if (sum >= this.bidForm.amount) {
        return
      }
      this.milestones.push({
        description: '',
        amount: this.bidForm.amount - sum,
      })
      this.everCreatedMilestoneForm = true
      console.log('this.milestones', this.milestones)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss">
#project-detail-page {
  .text {
    font-size: 16px;
  }
  .item {
    margin-bottom: 18px;
  }
  .milestone .el-col.el-col-24.el-col-md-16 {
    margin-bottom: 0;
  }
  .milestone .el-form-item.is-required {
    margin-bottom: 10px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
  .project-details-header-text {
    font-weight: bold;
    font-size: 20px;
  }
  .box-card {
    /* width: 480px; */
  }
  .task-tags {
    margin: 8px 0 3px 0;

    span {
      margin: 2px 2px;
    }
  }
  .bid-form {
    .el-input__inner {
      padding-right: 0 !important;
    }
    .el-textarea__inner {
      font-size: 15px;
      padding: 15px 15px;
    }
    .el-form-item__label {
      padding: 0 !important;
      margin: 0 !important;
      font-weight: bold !important;
    }
  }
  .big-label {
    font-weight: bold;
  }

  .client-infos {
    .info {
      > i {
        font-size: 16px;

        &.verification {
          color: lightgray;
        }
        &.active {
          color: #4caf50;
        }
      }
      > span {
        font-size: 15px;
      }
    }
  }
}
</style>
