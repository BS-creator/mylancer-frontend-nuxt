<template>
  <div id="issue-show-page" class="container">
    <div class="margin-top-20"></div>
    <el-row :gutter="20">
      <el-col :md="18">
        <el-timeline>
          <el-timeline-item
            v-for="comment in this.issue.comments"
            :key="comment.id"
            :timestamp="getDate(comment.created_at)"
            placement="top"
          >
            <template slot="dot">
              <img
                :src="
                  comment.author.avatar_base64
                    ? comment.author.avatar_base64
                    : '/images/profile/no-avatar.png'
                "
                alt=""
              />
            </template>
            <el-card>
              <div slot="header" class="clearfix">
                <b>{{ comment.author.username }}</b>
              </div>
              <div v-html="comment.comment"></div>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="" placement="top">
            <template slot="dot">
              <img :src="getAvatarUrl($auth.user)" alt="" />
            </template>
            <el-card>
              <div
                class="quill-editor"
                :content="comment"
                @change="onEditorChange($event)"
                v-quill:myQuillEditor="editorOption"
              ></div>
              <div class="comment-btns">
                <el-button
                  v-if="!issue.closed_at"
                  size="small"
                  type="default"
                  @click="closeIssue"
                >
                  <i class="el-icon-circle-close" style="color: red"></i>
                  Close issue
                </el-button>
                <el-button
                  v-if="issue.closed_at"
                  size="small"
                  type="default"
                  @click="reopenIssueAndCreateComment"
                >
                  <span v-if="comment.length === 0">Reopen Issue</span>
                  <span v-if="comment.length !== 0">Reopen and Comment</span>
                </el-button>
                <el-button
                  size="small"
                  type="success"
                  :disabled="comment.length === 0"
                  @click="createComment"
                  >Comment</el-button
                >
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
      <el-col :md="6">
        <div class="margin-top-10"></div>
        <el-card>
          <div class="additional-wrapper">
            <div class="additional">
              <header>
                <span>Assignees</span>

                <el-popover
                  placement="bottom"
                  trigger="click"
                  @after-leave="setAssginees"
                >
                  <el-select
                    v-model="assignees"
                    multiple
                    filterable
                    placeholder="Select assignees"
                    size="small"
                    style="width: 250px"
                  >
                    <el-option
                      v-for="item in freelancers"
                      :key="item.id"
                      :label="item.username"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <i class="el-icon-s-tools float-right" slot="reference"></i>
                </el-popover>
              </header>
              <div class="content">
                <div v-for="freelancer in freelancers" :key="freelancer.id">
                  <div
                    class="assignee"
                    v-if="assignees.indexOf(freelancer.id) !== -1"
                  >
                    <img :src="getAvatarUrl(freelancer)" />
                    <span
                      ><b>{{ freelancer.username }}</b></span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="additional">
              <header>
                <span>Labels</span>

                <el-popover
                  placement="bottom"
                  trigger="click"
                  @after-leave="setLabels"
                >
                  <div>
                    <NuxtLink
                      :to="{
                        name: 'projects-slug-tasks-labels',
                        params: $route.params.slug,
                      }"
                    >
                      <el-button
                        type="success"
                        size="mini"
                        icon="el-icon-plus"
                        class="float-right margin-bottom-5"
                        >Edit Labels</el-button
                      >
                    </NuxtLink>
                  </div>
                  <div>
                    <el-select
                      v-model="appliedLabels"
                      multiple
                      filterable
                      placeholder="Select labels"
                      style="width: 250px"
                      size="small"
                    >
                      <el-option
                        v-for="item in labels"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <i class="el-icon-s-tools float-right" slot="reference"></i>
                </el-popover>
              </header>
              <div class="content">
                <div v-for="label in labels" :key="label.id">
                  <div
                    v-if="appliedLabels.indexOf(label.id) !== -1"
                    class="issue-label"
                    :style="'background-color:' + label.bg_color"
                  >
                    {{ label.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="operations">
              <el-popover placement="top" v-model="confirmDeleteVisible">
                <p>Are you sure?</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    type="default"
                    size="mini"
                    icon="el-icon-delete"
                    @click="confirmDeleteVisible = false"
                    >cancel</el-button
                  >
                  <el-button type="danger" size="mini" @click="deleteIssue"
                    >confirm</el-button
                  >
                </div>
                <el-button
                  slot="reference"
                  size="mini"
                  icon="el-icon-delete"
                  type="text"
                >
                  Delete
                </el-button>
              </el-popover>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      comment: '',
      assignees: [],
      appliedLabels: [],
      confirmDeleteVisible: false,
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            ['image', 'link'],
          ],
        },
      },
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('projectModules/issues/show', params.id)
    await store.dispatch('projectModules/issue_labels/get', params.slug)
  },
  async asyncData({ params, $axios }) {
    const resp = await $axios.$get(
      `api/proposals/${params.slug}/awarded-freelancers`
    )
    return { freelancers: resp.freelancers }
  },
  computed: {
    ...mapState({
      issue: (state) => {
        return state.projectModules.issues.issue
      },
      labels: (state) => {
        return state.projectModules.issue_labels.list
      },
    }),
  },
  mounted() {
    console.log('this.issue', this.issue)
    console.log('this.freelancers', this.freelancers)
    this.assignees = [...this.issue.assignee_ids]
    this.appliedLabels = [...this.issue.label_ids]
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.comment = html
    },
    createComment() {
      if (this.comment.length === 0) return

      this.$store
        .dispatch('projectModules/issues/createComment', {
          comment: this.comment,
          issue_id: this.issue.id,
        })
        .then((res) => {
          this.$store.dispatch(
            'projectModules/issues/show',
            this.$route.params.id
          )
        })
        .catch((err) => {})
    },
    closeIssue() {
      this.$store
        .dispatch('projectModules/issues/closeIssue', {
          issue_id: this.issue.id,
        })
        .then((res) => {
          this.$store.dispatch(
            'projectModules/issues/show',
            this.$route.params.id
          )
        })
        .catch((err) => {})
    },
    reopenIssueAndCreateComment() {
      this.$store
        .dispatch('projectModules/issues/reopenIssue', {
          issue_id: this.issue.id,
        })
        .then((res) => {
          if (this.comment.length !== 0) {
            this.createComment()
          } else {
            this.$store.dispatch(
              'projectModules/issues/show',
              this.$route.params.id
            )
          }
        })
        .catch((err) => {})
    },
    getDate(value) {
      var ago = new Date(value)
      const year = ago.getFullYear()
      const month = 1 + ago.getMonth()
      const date = ago.getDate()
      const hours = ago.getHours()
      const minutes = ago.getMinutes()
      const seconds = ago.getSeconds()
      return (
        year +
        '-' +
        (month < 10 ? '0' + month : month) +
        '-' +
        (date < 10 ? '0' + date : date) +
        ' ' +
        (hours < 10 ? '0' + hours : hours) +
        ':' +
        (minutes < 10 ? '0' + minutes : minutes) +
        ':' +
        (seconds < 10 ? '0' + seconds : seconds)
      )
    },
    setAssginees() {
      console.log('setAssginees', this.assignees)
      this.$axios
        .$post(`api/issues/${this.issue.id}/set-assignees`, {
          assignees: this.assignees,
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setLabels() {
      console.log('setLabels', this.appliedLabels)
      this.$axios
        .$post(`api/issues/${this.issue.id}/set-labels`, {
          labels: this.appliedLabels,
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteIssue() {
      this.$store
        .dispatch('projectModules/issues/delete', this.issue.id)
        .then((res) => {
          console.log(res)
          this.$router.push({
            name: 'projects-slug-tasks',
            params: { slug: this.$route.params.slug },
          })
        })
        .catch((err) => {
          console.log(err)
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
#issue-show-page {
  min-height: 600px;

  .el-timeline-item__tail {
    left: 23px;
  }
  .el-timeline-item__dot {
    width: 50px;
    > img {
      border-radius: 50%;
      border: 1px solid #e4e7ed;
    }
  }
  .el-timeline-item__wrapper {
    padding-left: 65px;
    top: -15px;

    .el-timeline-item__content:before {
      content: '';
      position: absolute;
      border-width: 11px;
      border-color: transparent;
      border-right-color: white;
      margin-left: -8px;
      margin-top: 10px;
      border-left-width: 0;
      opacity: 20000000000000;
      border-style: solid;
    }
    .el-card__header {
      padding: 10px 20px;
      font-size: 16px;
    }
    .el-card__body {
      p {
        font-size: 13px;
        margin-bottom: 0;
      }
    }
  }

  .comment-btns {
    float: right;
    padding: 20px 0;
  }

  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }

  pre {
    background-color: #23241f;
    color: #f8f8f2;
    overflow: visible;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 12px;
    line-height: 1.42;
  }

  .additional-wrapper {
    .additional {
      border-bottom: 1px solid lightgray;
      padding-bottom: 25px;
      &:not(:first-child) {
        padding-top: 25px;
      }
      header {
        font-size: 14px;
        i {
          line-height: 28px;
          cursor: pointer;
        }
      }
      .content {
        margin-top: 15px;

        .assignee {
          margin-top: 10px;
          img {
            width: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }
          span {
            font-size: 13px;
          }
        }
        .issue-label {
          color: white;
          display: inline-block;
          padding: 0px 20px;
          border-radius: 11px;
          margin-bottom: 5px;
          font-size: 12px;
          line-height: 22px;
        }
      }
    }
    .operations {
      padding-top: 40px;
    }
  }
}
</style>
