<template>
  <div id="post-project-page">
    <div class="dashboard-content-inner post-project-inner">
      <div class="row">
        <!-- Dashboard Box -->
        <div class="col-xl-12">
          <div class="dashboard-box margin-top-0">
            <!-- Headline -->
            <div class="pp-headline">
              <h1>
                <!-- <i class="icon-feather-plus"></i> -->
                Tell us what you need done
              </h1>
              <p class="note-description">
                Contact skilled freelancers within minutes. View profiles,
                ratings, portfolios and chat with them. Pay the freelancer only
                when you are 100% satisfied with their work.
              </p>
            </div>

            <div class="content with-padding padding-bottom-10">
              <div class="row">
                <div class="col-xl-8">
                  <div class="submit-field">
                    <h5>Project Name</h5>
                    <el-input
                      placeholder="e.g. build me a website"
                      class="with-border super-size"
                      v-model="project.name"
                    ></el-input>
                  </div>
                </div>

                <div class="col-xl-4">
                  <div class="submit-field">
                    <h5>Category</h5>
                    <el-select
                      v-model="project.category_id"
                      placeholder="Select Category"
                      class="full-width with-border super-size no-box-shadow"
                    >
                      <el-option
                        v-for="item in categories"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="col-xl-6">
                  <div class="submit-field">
                    <h5>What is your estimated budget?</h5>
                    <div class="row">
                      <div class="col-xl-6">
                        <div class="input-with-icon">
                          <input
                            class="hireo-control with-border no-box-shadow match-el-theme"
                            v-model="project.budget_min"
                            type="number"
                            placeholder="Minimum"
                          />
                          <i class="currency">USD</i>
                        </div>
                      </div>
                      <div class="col-xl-6">
                        <div class="input-with-icon">
                          <input
                            class="hireo-control with-border no-box-shadow match-el-theme"
                            v-model="project.budget_max"
                            type="number"
                            placeholder="Maximum"
                          />
                          <i class="currency">USD</i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-6">
                  <div class="submit-field">
                    <h5>How do you want to pay?</h5>

                    <div class="feedback-yes-no margin-top-0">
                      <div class="row">
                        <div class="col-xl-6">
                          <el-radio
                            v-model="project.pay_type"
                            label="fixed"
                            border
                            class="super-size full-width"
                            >Pay Fixed Price</el-radio
                          >
                        </div>
                        <div class="col-xl-6">
                          <el-radio
                            v-model="project.pay_type"
                            label="hourly"
                            border
                            class="super-size full-width"
                            >Pay By The Hour</el-radio
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-12">
                  <div class="submit-field">
                    <h5>
                      What skills are required?
                      <i
                        class="help-icon"
                        data-tippy-placement="right"
                        title="Up to 5 skills that best describe your project"
                      ></i>
                    </h5>
                    <div class="keywords-container">
                      <el-select
                        v-model="project.skills"
                        multiple
                        filterable
                        style="display: block"
                        placeholder="Select Skills"
                      >
                        <el-option
                          v-for="item in skills"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                      <div class="keywords-list"><!-- keywords go here --></div>
                      <div class="clearfix"></div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-12">
                  <div class="submit-field">
                    <h5>Describe Your Project</h5>
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 7, maxRows: 10 }"
                      placeholder="Please input"
                      class="full-width super-size"
                      v-model="project.description"
                    >
                    </el-input>
                    <div class="uploadButton margin-top-30">
                      <el-upload
                        class="upload-post-project"
                        drag
                        ref="upload"
                        action=""
                        :on-change="handleUploadChange"
                        :on-remove="handleUploadRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                        multiple
                      >
                        <div class="html-content">
                          <div><i class="el-icon-upload"></i></div>
                          <div class="el-upload__text">
                            Drag & drop (or <em>Click here</em>) any images,
                            documents that might be helpful in explaining your
                            brief here <br />(Max file size: 25 MB).
                          </div>
                        </div>
                      </el-upload>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-12" style="margin-bottom: 10px">
              <a
                href="#"
                class="button ripple-effect big margin-top-30"
                :disabled="posting"
                @click.prevent="postProject"
              >
                <span v-show="!posting"
                  ><i class="icon-feather-plus"></i> Post my Project</span
                >
                <span v-show="posting"
                  ><i class="el-icon-loading"></i> Posting now...
                </span>
              </a>
            </div>
            <div class="margin-top-90"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  auth: false,
  layout: 'post-project',
  data() {
    return {
      posting: false,
      project: {
        name: '',
        category_id: '',
        budget_min: 1,
        budget_max: 1,
        skills: '',
        pay_type: 'fixed',
        description: '',
      },
      fileList: [],
    }
  },
  async fetch({ store }) {
    await store.dispatch('projectModules/categories/get')
    await store.dispatch('projectModules/skills/get')
  },
  computed: {
    ...mapState({
      categories: (state) => {
        return state.projectModules.categories.list
      },
      skills: (state) => {
        return state.projectModules.skills.list
      },
    }),
  },
  mounted() {
    // this.list = this.list.map((item) => {
    //   return { value: `value:${item.name}`, label: `label:${item.name}` }
    // })
  },
  methods: {
    handleUploadChange(file, fileList) {
      this.fileList = fileList
    },
    handleUploadRemove(file, fileList) {
      this.fileList = fileList
    },
    getFileRaws() {
      const formData = new FormData()
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('file' + i, this.fileList[i].raw)
      }
      return formData
    },
    submitUpload() {
      // this.$refs.upload.submit()
      const formData = this.getFileRaws()
      console.log(this.fileList)
      console.log(formData)

      return this.$axios.post('/api/projects/post-uploadfiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    async postProject() {
      let vm = this
      let action = 'projectModules/projects/create'

      const formData = this.getFileRaws()

      for (const key in this.project) {
        if (this.project.hasOwnProperty(key)) {
          const element = this.project[key]
          formData.append(key, element)
        }
      }
      this.posting = true
      vm.$store
        .dispatch(action, formData)
        .then((resp) => {
          this.posting = false
          this.$router.push(`/projects/${resp.data.project.slug}/proposals`)
        })
        .catch((err) => {
          this.posting = false
          console.log(err.response)
          if (err.response.status == 400) {
            this.$notify.error({
              title: '',
              message: err.response.data.error,
            })
          } else {
            this.$notify.error({
              title: '',
              message: 'There was an error while posting your project.',
            })
          }
        })
    },
  },
}
</script>

<style lang="scss">
#post-project-page {
  .note-description {
    margin-bottom: 0;
    margin-top: 5px;
  }
  .pp-headline {
    background-color: var(--color-primary);
    color: white;

    > h1 {
      color: white;
      margin-bottom: 30px;
    }
  }

  .post-project-container {
    display: block;
  }
  .post-project-inner {
    position: relative;
    top: 120px;
    margin-bottom: 120px;
    max-width: 900px;
    left: 50%;
    transform: translate(-50%);
    padding: 0;
  }
  .dashboard-box {
    box-shadow: none;
  }
  .uploadButton {
    width: 100%;

    .upload-post-project {
      width: 100%;

      .el-upload {
        display: block;

        .el-upload-dragger {
          height: auto;
          width: 100%;
          padding-bottom: 9px;

          .html-content {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 9px;

            .el-icon-upload {
              margin: 0;
              margin-right: 20px;
            }
            .el-upload__text {
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>
