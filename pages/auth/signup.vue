<template>
  <div class="sign-wrapper">
    <div class="form-wrapper">
      <div v-if="step == 1">
        <logo></logo>
        <h3 class="margin-bottom-45">Welcome Back</h3>
        <el-divider> Sign Up </el-divider>
        <el-form
          :model="signForm"
          :rules="signUpRules"
          label-position="top"
          ref="signForm"
          label-width="120px"
          class="signup-form"
        >
          <el-form-item label="Username" prop="username">
            <el-input
              placeholder="Please enter username"
              v-model="signForm.username"
            ></el-input>
          </el-form-item>

          <el-form-item label="Email Address" prop="email">
            <el-input
              type="email"
              placeholder="Please enter email"
              v-model="signForm.email"
            ></el-input>
          </el-form-item>

          <el-form-item label="Password" prop="password">
            <el-input
              type="password"
              placeholder="Please enter password"
              v-model="signForm.password"
            ></el-input>
          </el-form-item>

          <div class="margin-top-55"></div>
          <el-form-item>
            <el-button
              type="primary"
              class="full-width"
              :disabled="signing"
              @click="forward()"
            >
              <span>
                <i v-show="signing" class="el-icon-loading"></i> Join Mylancer
              </span>
            </el-button>
          </el-form-item>

          <el-divider class="margin-top-15 margin-bottom-20"></el-divider>
          <p style="font-size: 14px; text-align: center">
            Already have an account? <NuxtLink to="/sign-in">Sign In</NuxtLink>
          </p>
          <div class="margin-top-35 margin-bottom-20"></div>
        </el-form>
      </div>
      <div v-if="step == 2">
        <i class="el-icon-arrow-left back-to-icon" @click="backward()"></i>
        <logo></logo>
        <h3>Select account type</h3>
        <p style="text-align: center" class="margin-bottom-40">
          Don't worry, this can be changed later
        </p>
        <el-divider> account types </el-divider>

        <div
          @click="userRegister(0)"
          class="accout-type margin-bottom-20 margin-top-40"
        >
          <p>I want to work</p>
          <i class="el-icon-right"></i>
        </div>
        <div @click="userRegister(1)" class="accout-type">
          <p>I want to hire</p>
          <i class="el-icon-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  auth: 'guest',
  components: {
    Logo,
  },
  data() {
    return {
      step: 1,
      signing: false,
      signForm: {
        email: '',
        username: '',
        password: '',
      },
      signUpRules: {
        email: [
          {
            required: true,
            message: 'Please enter email address',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.checkEmail,
            trigger: 'blur',
          },
        ],
        username: [
          {
            required: true,
            message: 'Please enter username',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.checkUserName,
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please enter password',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    async forward() {
      this.$refs['signForm'].validate(async (valid) => {
        if (valid) {
          this.step++
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    backward() {
      this.step--
    },
    userRegister(acc_type) {
      let vm = this
      this.signing = true
      this.$store
        .dispatch('user/register', { ...this.signForm, acc_type })
        .then(async (res) => {
          vm.signing = false
          vm.$message({
            message: 'Congrats, registered successfully.',
            type: 'success',
          })
          await this.$auth.loginWith('laravelJWT', {
            data: this.signForm,
          })
          if (acc_type) {
            this.$router.push('/post-project')
          } else {
            this.$router.push('/new-freelancer/skill-select')
          }
        })
        .catch((err) => {
          vm.signing = false
          if (err.response.status == 400) {
            vm.$message.error(err.response.data.error)
          } else {
            vm.$message.error('There was an error while registering.')
          }
        })
    },
    checkEmail(rule, value, callback) {
      if (value) {
        this.$store.dispatch('user/checkEmail', value.trim()).then((res) => {
          console.log(res)
          if (res.data.inUse) {
            callback(new Error('This email address is already in use.'))
          } else {
            callback()
          }
        })
      } else {
        callback()
      }
    },
    checkUserName(rule, value, callback) {
      if (value) {
        this.$store.dispatch('user/checkUsername', value.trim()).then((res) => {
          console.log(res)
          if (res.data.inUse) {
            callback(new Error('This username is already in use.'))
          } else {
            callback()
          }
        })
      } else {
        callback()
      }
    },
  },
}
</script>

<style lang="scss">
.sign-wrapper {
  background: #f0f0f0;
  position: absolute;
  width: 100%;
  height: 100%;

  .back-to-icon {
    position: absolute;
    font-size: 25px;
    font-weight: bold;
    margin-top: 10px;
  }
  .form-wrapper {
    max-width: 400px;
    background: #fff;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
    padding: 50px 40px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    top: 60px;

    .accout-type {
      background: #fff;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
      padding: 35px 40px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > p {
        margin: 0;
      }
      i {
        font-weight: bold;
        position: relative;
      }
      &:hover {
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12),
          0 4px 10px 0 rgba(0, 0, 0, 0.16);
      }
      // &:hover > i {
      //   left: 10px;
      // }
    }
    h3 {
      font-weight: bold;
      font-size: 18px;
      text-align: center;
    }
    #logo {
      border-right: none;
      position: relative;
      left: 50%;
      transform: translate(-50%);
      padding: 0;
      margin-top: 25px;
      margin-bottom: 10px;

      > div {
        font-size: 30px;

        > span:first-child {
          font-size: 60px;
        }
      }
    }
    .signup-form {
      .el-form-item {
        margin-bottom: 12px;
      }
      .el-input__inner {
        padding-right: 0 !important;
      }
      .el-form-item__label {
        padding: 0 !important;
        margin: 0 !important;
      }
    }
  }
}
</style>
