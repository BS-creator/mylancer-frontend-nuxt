<template>
  <div class="sign-wrapper">
    <div class="form-wrapper">
      <logo></logo>
      <h3 class="margin-bottom-45">Welcome Back</h3>
      <el-divider> Sign In </el-divider>
      <el-form
        :model="signForm"
        :rules="signInRules"
        label-position="top"
        ref="signForm"
        label-width="120px"
        class="signin-form"
      >
        <el-form-item label="Email or username" prop="email">
          <el-input
            type="email"
            placeholder="Please enter email or username"
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
            @click="userLogin()"
          >
            <span>
              <i v-show="signing" class="el-icon-loading"></i> Sign In
            </span>
          </el-button>
        </el-form-item>

        <el-divider class="margin-top-15 margin-bottom-20"></el-divider>
        <p style="font-size: 14px; text-align: center">
          Don't have an account? <NuxtLink to="/sign-up">Sign Up</NuxtLink>
        </p>
        <div class="margin-top-35 margin-bottom-20"></div>
      </el-form>
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
      signing: false,
      signForm: {
        email: '',
        password: '',
      },
      signInRules: {
        email: [
          {
            required: true,
            message: 'Please enter email address',
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
    async userLogin() {
      this.$refs['signForm'].validate(async (valid) => {
        if (valid) {
          try {
            console.log(this.signForm)
            this.signing = true
            let response = await this.$auth.loginWith('laravelJWT', {
              data: this.signForm,
            })
            this.signing = false
            console.log(response)
            this.$notify({
              title: '',
              message: 'Logged In successfully',
              type: 'success',
              position: 'bottom-right',
            })
          } catch (err) {
            console.log(err)
            this.signing = false
            this.$message.error('Sorry, there was an error while logging in.')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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

  .form-wrapper {
    max-width: 400px;
    background: #fff;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
    padding: 50px 40px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    top: 60px;

    > h3 {
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
    .signin-form {
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
