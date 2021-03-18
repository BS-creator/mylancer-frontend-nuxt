<template>
  <div class="complete-your-profile">
    <el-row :gutter="20">
      <el-col :md="8">
        <div class="grid-content description">
          <h1 class="margin-bottom-30">Complete your profile</h1>
          <p>
            Fill in your profile for employers to better understand your
            services when they visit your profile page.
          </p>
          <p>
            It is important to leave accurate information here to maximize your
            chances of getting jobs.
          </p>
        </div>
      </el-col>
      <el-col :md="16">
        <div class="grid-content">
          <el-form
            :model="profileForm"
            :rules="profileRules"
            label-position="top"
            ref="profileForm"
            label-width="120px"
            class="profile-form"
          >
            <el-row :gutter="20">
              <el-col :md="12">
                <el-form-item label="First Name" prop="first_name">
                  <el-input
                    placeholder="Please enter First Name"
                    v-model="profileForm.first_name"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :md="12">
                <el-form-item label="Last Name" prop="last_name">
                  <el-input
                    placeholder="Please enter Last Name"
                    v-model="profileForm.last_name"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="Languages" prop="languages">
              <label class="help-description">
                Tell us the languages you speak so that we can give you relevant
                jobs from employers who speak the same.
              </label>
              <el-select
                v-model="profileForm.languages"
                multiple
                filterable
                style="display: block"
                placeholder="Select languages"
              >
                <el-option
                  v-for="item in languages"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Experience" prop="experience">
              <label class="help-description">
                How would you rate your experience with the skills you have
                selected?
              </label>
              <el-row :gutter="10" class="experience-wrapper">
                <el-col :sm="8">
                  <div
                    class="experince"
                    v-bind:class="{ active: profileForm.experience == 1 }"
                    @click="setExperience(1)"
                  >
                    <h4>BEGINNER</h4>
                    <el-divider></el-divider>
                    <p>
                      You have been working with these skills for less than a
                      year and are still learning.
                    </p>
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div
                    class="experince"
                    v-bind:class="{ active: profileForm.experience == 2 }"
                    @click="setExperience(2)"
                  >
                    <h4>INTERMEDIATE</h4>
                    <el-divider></el-divider>
                    <p>
                      You have been working with these skills for 2 to 5 years
                      and can complete most common tasks.
                    </p>
                  </div>
                </el-col>
                <el-col :sm="8">
                  <div
                    class="experince"
                    v-bind:class="{ active: profileForm.experience == 3 }"
                    @click="setExperience(3)"
                  >
                    <h4>ADVANCED</h4>
                    <el-divider></el-divider>
                    <p>
                      You have been working with these skills for more than 5
                      years, and are an expert in them.
                    </p>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <div class="step-btns">
      <el-button @click="prev">
        <i class="el-icon-back"></i> Prev Step
      </el-button>
      <el-button @click="next">
        Next Step <i class="el-icon-right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'new-freelancer',
  data() {
    return {
      step: 1,
      signing: false,
      profileForm: {
        first_name: '',
        last_name: '',
        languages: '',
        experience: '',
      },
      profileRules: {
        first_name: [
          {
            required: true,
            message: 'Please enter your first name',
            trigger: 'blur',
          },
        ],
        last_name: [
          {
            required: true,
            message: 'Please enter your last name',
            trigger: 'blur',
          },
        ],
        languages: [
          {
            required: true,
            message: 'Please select languages',
            trigger: 'blur',
          },
        ],
        experience: [
          {
            required: true,
            message: 'Please select experience',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  async fetch({ store }) {
    await store.dispatch('profile/setNewStep', 1)
    await store.dispatch('profile/getLanguages')
    await store.dispatch('profile/getBasic')
  },
  computed: {
    ...mapState({
      active: (state) => {
        return state.profile.newStep
      },
      languages: (state) => {
        return state.profile.languages
      },
      profile: (state) => {
        return state.profile.basic
      },
    }),
  },
  mounted: function () {
    console.log(this.profile)
    console.log(this.languages)
    this.profileForm = { ...this.profile }
  },
  methods: {
    setExperience(level) {
      this.profileForm.experience = level
    },
    next() {
      this.$refs['profileForm'].validate(async (valid) => {
        if (valid) {
          console.log(this.profileForm)
          // return
          this.$store
            .dispatch('profile/update', {
              profile: this.profileForm,
              user_id: this.$auth.user.id,
            })
            .then((res) => {
              console.log(res.data)
              this.$store.dispatch('profile/setNewStep', this.active + 1)
              this.$router.push('/new-freelancer/verify-payment')
            })
            .catch((err) => {
              console.log(err.response.data)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    prev() {
      this.$store.dispatch('profile/setNewStep', this.active - 1)
      this.$router.push('/new-freelancer/skill-select')
    },
  },
}
</script>

<style lang="scss">
.complete-your-profile {
  .description {
    p {
      font-size: 16px;
    }
  }
  .el-form-item__label {
    font-weight: bold;
    padding: 0;
    margin: 0;
  }
  .help-description {
    font-size: 13px;
    line-height: 1;
  }
  .experience-wrapper {
    .experince {
      background: #fff;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
      padding: 15px 20px;
      min-height: 250px;
      cursor: pointer;
      border: 5px solid white;
      transition: all 0.15s linear;

      > h4 {
        font-weight: bold;
        text-align: center;
      }
      > .el-divider--horizontal {
        margin-top: 16px;
      }
      &.active {
        border-color: var(--color-primary);
      }
      &:hover {
        border-color: var(--color-primary);
      }
    }
  }
}

.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
