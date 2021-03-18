<template>
  <div id="project-review-page">
    <div class="container">
      <el-row :gutter="20">
        <el-col :md="18">
          <!-- already provided feedback -->
          <el-card v-if="providedReview">
            <div
              slot="header"
              v-if="project.client.id !== $auth.user.id"
              class="clearfix"
            >
              <div class="boxed-list-ul">
                <div class="bid">
                  <!-- Avatar -->
                  <div class="bids-avatar">
                    <div class="freelancer-avatar">
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
            <div slot="header" v-else class="clearfix">
              <div class="boxed-list-ul">
                <div class="bid">
                  <!-- Avatar -->
                  <div class="bids-avatar">
                    <div class="freelancer-avatar">
                      <!-- <div class="verified-badge"></div> -->
                      <a
                        :href="'/u/' + accepted[0].freelancer.username"
                        target="_blank"
                        ><img
                          :src="getAvatarUrl(accepted[0].freelancer)"
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
                            accepted[0].freelancer.location.countryCode +
                            '.svg'
                          "
                          alt="country"
                          :title="accepted[0].freelancer.location.countryName"
                          data-tippy-placement="top"
                        />
                        <a
                          :href="'/u/' + accepted[0].freelancer.username"
                          target="_blank"
                          >{{ accepted[0].freelancer.first_name }}
                          {{ accepted[0].freelancer.last_name }}
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="reviews-wrapper">
              <div
                class="review-wrapper"
                v-for="review in reviewsByProject"
                :key="review.id"
              >
                <p class="font-bold text-lg margin-bottom-8">
                  <span v-if="review.from == $auth.user.id">Your review</span>
                  <span v-else
                    >Review from: <b>{{ review.from_user.fullname }}</b></span
                  >
                </p>
                <div>
                  <el-rate
                    :value="parseFloat(review.average_rate)"
                    show-score
                    disabled
                    text-color="#ff9900"
                    score-template="{value}"
                  >
                  </el-rate>
                </div>
                <p class="margin-top-10">"{{ review.comment }}"</p>
                <div class="boxed-list-ul in-review">
                  <div class="bid">
                    <!-- Avatar -->
                    <div class="bids-avatar">
                      <div class="freelancer-avatar">
                        <!-- <div class="verified-badge"></div> -->
                        <a
                          :href="'/u/' + review.from_user.username"
                          target="_blank"
                          ><img
                            :src="getAvatarUrl(review.from_user)"
                            alt="avatar"
                        /></a>
                      </div>
                    </div>

                    <!-- Content -->
                    <div class="bids-content">
                      <!-- Name -->
                      <div class="freelancer-name">
                        <h4 style="display: inline-block">
                          <img
                            class="flag"
                            :src="
                              '/images/flags/' +
                              review.from_user.location.countryCode +
                              '.svg'
                            "
                            alt="country"
                            :title="review.from_user.location.countryName"
                            data-tippy-placement="top"
                          />
                          <a
                            :href="'/u/' + review.from_user.username"
                            target="_blank"
                            >{{ review.from_user.fullname }}
                          </a>
                        </h4>
                        <span> • </span>
                        {{ $moment(new Date(review.created_at)).fromNow() }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="review-wrapper" v-if="reviewsByProject.length < 2">
                <p class="italic" v-if="project.client.id == $auth.user.id">
                  Freelancer didn't provided feedback yet
                </p>
                <p class="italic" v-else>Client didn't provided feedback yet</p>
              </div>
            </div>
          </el-card>

          <div v-else>
            <!-- provide freelancer review -->
            <el-card v-if="project.client.id == $auth.user.id">
              <div slot="header" class="clearfix">
                <div class="boxed-list-ul">
                  <div class="bid">
                    <!-- Avatar -->
                    <div class="bids-avatar">
                      <div class="freelancer-avatar">
                        <!-- <div class="verified-badge"></div> -->
                        <a
                          :href="'/u/' + accepted[0].freelancer.username"
                          target="_blank"
                          ><img
                            :src="getAvatarUrl(accepted[0].freelancer)"
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
                              accepted[0].freelancer.location.countryCode +
                              '.svg'
                            "
                            alt="country"
                            :title="accepted[0].freelancer.location.countryName"
                            data-tippy-placement="top"
                          />
                          <a
                            :href="'/u/' + accepted[0].freelancer.username"
                            target="_blank"
                            >{{ accepted[0].freelancer.first_name }}
                            {{ accepted[0].freelancer.last_name }}
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <el-form
                  label-position="top"
                  ref="rateFreelancerForm"
                  :model="rateFreelancerForm"
                  :rules="rateFreelancerFormRules"
                >
                  <el-checkbox border v-model="rateFreelancerForm.ontime"
                    >On Time</el-checkbox
                  >
                  <el-checkbox border v-model="rateFreelancerForm.onbudget"
                    >On Budget</el-checkbox
                  >

                  <h3 class="font-bold margin-top-20">
                    Rate {{ accepted[0].freelancer.fullname }}.
                  </h3>
                  <div class="rates-wrapper">
                    <div class="rate-wrapper">
                      <p>Quality of the work</p>
                      <div>
                        <el-rate
                          v-model="
                            rateFreelancerForm.rates.clarity_specification
                          "
                          show-score
                          text-color="#ff9900"
                          score-template="{value}.0"
                        >
                        </el-rate>
                      </div>
                    </div>
                    <div class="rate-wrapper">
                      <p>Communication</p>
                      <div>
                        <el-rate
                          v-model="rateFreelancerForm.rates.communication"
                          show-score
                          text-color="#ff9900"
                          score-template="{value}.0"
                        >
                        </el-rate>
                      </div>
                    </div>
                    <div class="rate-wrapper">
                      <p>Expertise</p>
                      <div>
                        <el-rate
                          v-model="rateFreelancerForm.rates.payment"
                          show-score
                          text-color="#ff9900"
                          score-template="{value}.0"
                        >
                        </el-rate>
                      </div>
                    </div>
                    <div class="rate-wrapper">
                      <p>Professionalism</p>
                      <div>
                        <el-rate
                          v-model="rateFreelancerForm.rates.professionalism"
                          show-score
                          text-color="#ff9900"
                          score-template="{value}.0"
                        >
                        </el-rate>
                      </div>
                    </div>
                    <div class="rate-wrapper">
                      <p>
                        How likely are you going to hire
                        <b>{{ accepted[0].freelancer.fullname }}</b> again?
                      </p>
                      <div>
                        <el-rate
                          v-model="rateFreelancerForm.rates.will_work_again"
                          show-score
                          text-color="#ff9900"
                          score-template="{value}.0"
                        >
                        </el-rate>
                      </div>
                    </div>
                  </div>

                  <h3 class="font-bold margin-top-25 margin-bottom-10">
                    Details about {{ accepted[0].freelancer.fullname }}.
                  </h3>
                  <el-form-item prop="comment">
                    <el-input
                      type="textarea"
                      rows="4"
                      v-model="rateFreelancerForm.comment"
                      placeholder="How was your experience on this project?"
                    ></el-input>
                  </el-form-item>
                  <el-button
                    type="primary"
                    @click="rateFreelancer"
                    class="margin-top-10 margin-bottom-30 float-right"
                  >
                    Rate Freelancer
                  </el-button>
                </el-form>
              </div>
            </el-card>

            <!-- provide client review -->
            <el-card v-else>
              <div slot="header" class="clearfix">
                <div class="boxed-list-ul">
                  <div class="bid">
                    <!-- Avatar -->
                    <div class="bids-avatar">
                      <div class="freelancer-avatar">
                        <!-- <div class="verified-badge"></div> -->
                        <a
                          :href="'/u/' + project.client.username"
                          target="_blank"
                          ><img
                            :src="getAvatarUrl(project.client)"
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
                <el-form
                  label-position="top"
                  ref="rateEmployerForm"
                  :model="rateEmployerForm"
                  :rules="rateEmployerFormRules"
                >
                  <h3 class="font-bold">
                    Please leave your feedback and rating for this project
                  </h3>
                  <div class="rates-wrapper">
                    <div class="rate-wrapper">
                      <p>Clarity in specification</p>
                      <div>
                        <el-rate
                          v-model="rateEmployerForm.rates.clarity_specification"
                          show-score
                          text-color="#ff9900"
                          score-template="{value}.0"
                        >
                        </el-rate>
                      </div>
                    </div>
                    <div class="rate-wrapper">
                      <p>Communication</p>
                      <div>
                        <el-rate
                          v-model="rateEmployerForm.rates.communication"
                          show-score
                          text-color="#ff9900"
                          score-template="{value}.0"
                        >
                        </el-rate>
                      </div>
                    </div>
                    <div class="rate-wrapper">
                      <p>Payment promptness</p>
                      <div>
                        <el-rate
                          v-model="rateEmployerForm.rates.payment"
                          show-score
                          text-color="#ff9900"
                          score-template="{value}.0"
                        >
                        </el-rate>
                      </div>
                    </div>
                    <div class="rate-wrapper">
                      <p>Professionalism</p>
                      <div>
                        <el-rate
                          v-model="rateEmployerForm.rates.professionalism"
                          show-score
                          text-color="#ff9900"
                          score-template="{value}.0"
                        >
                        </el-rate>
                      </div>
                    </div>
                    <div class="rate-wrapper">
                      <p>Would you work for the employer again?</p>
                      <div>
                        <el-rate
                          v-model="rateEmployerForm.rates.will_work_again"
                          show-score
                          text-color="#ff9900"
                          score-template="{value}.0"
                        >
                        </el-rate>
                      </div>
                    </div>
                  </div>

                  <h3 class="font-bold margin-top-25 margin-bottom-10">
                    Comments
                  </h3>
                  <el-form-item prop="comment">
                    <el-input
                      type="textarea"
                      rows="4"
                      v-model="rateEmployerForm.comment"
                      placeholder="How was your experience on this project?"
                    ></el-input>
                  </el-form-item>
                  <el-button
                    type="primary"
                    @click="rateEmployer"
                    class="margin-top-10 margin-bottom-30 float-right"
                  >
                    Rate Employer
                  </el-button>
                </el-form>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      rateEmployerForm: {
        rates: {
          clarity_specification: 0,
          communication: 0,
          payment: 0,
          professionalism: 0,
          will_work_again: 0,
        },
        comment: '',
      },
      rateEmployerFormRules: {
        comment: [
          {
            required: true,
            message: 'Please leave your comments',
            trigger: 'blur',
          },
        ],
      },
      rateFreelancerForm: {
        ontime: false,
        onbudget: false,
        rates: {
          clarity_specification: 0,
          communication: 0,
          payment: 0,
          professionalism: 0,
          will_work_again: 0,
        },
        comment: '',
      },
      rateFreelancerFormRules: {
        comment: [
          {
            required: true,
            message: 'Please leave your comments',
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
      accepted: (state) => {
        return state.projectModules.proposals.accepted
      },
      reviewsByProject: (state) => {
        return state.projectModules.reviews.reviewsByProject
      },
      providedReview: (state) => {
        return state.projectModules.reviews.providedReview
      },
    }),
  },
  mounted() {
    this.$store.commit('projectModules/projects/setActivePageTab', '/reviews')
    this.$store.dispatch('projectModules/reviews/getByProject', {
      slug: this.$route.params.slug,
      isClient: this.project.client.id == this.$auth.user.id,
    })
  },
  methods: {
    rateEmployer() {
      this.$refs['rateEmployerForm'].validate((valid) => {
        if (valid) {
          let rate_sum = 0
          for (const key in this.rateEmployerForm.rates) {
            if (Object.hasOwnProperty.call(this.rateEmployerForm.rates, key)) {
              const element = this.rateEmployerForm.rates[key]
              rate_sum += element
            }
          }
          this.$store
            .dispatch('projectModules/reviews/create', {
              ...this.rateEmployerForm,
              average_rate: (rate_sum / 5).toFixed(1),
              from: this.$auth.user.id,
              to: this.project.client.id,
              project_id: this.project.id,
              role: 1,
            })
            .then((res) => {
              this.$store.dispatch('projectModules/reviews/getByProject', {
                slug: this.$route.params.slug,
                isClient: this.project.client.id == this.$auth.user.id,
              })
            })
        }
      })
    },
    rateFreelancer() {
      this.$refs['rateFreelancerForm'].validate((valid) => {
        if (valid) {
          let rate_sum = 0
          for (const key in this.rateFreelancerForm.rates) {
            if (
              Object.hasOwnProperty.call(this.rateFreelancerForm.rates, key)
            ) {
              const element = this.rateFreelancerForm.rates[key]
              rate_sum += element
            }
          }
          this.$store
            .dispatch('projectModules/reviews/create', {
              ...this.rateFreelancerForm,
              average_rate: (rate_sum / 5).toFixed(1),
              from: this.$auth.user.id,
              to: this.accepted[0].freelancer.id,
              project_id: this.project.id,
              role: 0,
            })
            .then((res) => {
              this.$store.dispatch('projectModules/reviews/getByProject', {
                slug: this.$route.params.slug,
                isClient: this.project.client.id == this.$auth.user.id,
              })
            })
        }
      })
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
#project-review-page {
  .boxed-list-ul.in-review {
    .bid .freelancer-avatar {
      width: 35px;
      margin-right: 10px;
    }
  }

  .rates-wrapper {
    margin-top: 30px;

    .rate-wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      height: 38px;
    }
    .rate-wrapper:not(:last-child) {
      border-bottom: 1px solid rgba(211, 211, 211, 0.63);
    }
  }

  .el-rate__icon {
    font-size: 25px;
  }

  .el-rate__text {
    font-size: 18px;
    margin-left: 10px;
  }

  .reviews-wrapper {
    .review-wrapper {
      padding-bottom: 25px;
      &:not(:last-child) {
        border-bottom: 1px solid #d3d3d373;
      }
      &:last-child {
        margin-top: 15px;
      }
    }
  }
}
</style>
