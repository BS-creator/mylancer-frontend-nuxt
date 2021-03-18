<template>
  <div id="project-tasks-page">
    <div class="container" style="min-height: 600px">
      <NuxtLink to="tasks/create">
        <el-button
          type="success"
          size="small"
          style="float: right; margin-bottom: 10px"
        >
          New Issue
        </el-button>
      </NuxtLink>
      <el-table
        :data="tableData"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div style="display: inline-block">
              <p style="margin: 0; line-height: 25px">
                <i
                  class="el-icon-s-opportunity"
                  style="color: #67c23a"
                  v-if="!scope.row.closed_at"
                ></i>
                <i
                  class="el-icon-s-opportunity"
                  style="color: #ae0957"
                  v-if="scope.row.closed_at"
                ></i>
                <NuxtLink
                  :to="{
                    name: 'projects-slug-tasks-id',
                    params: { id: scope.row.id },
                  }"
                >
                  <b>{{ scope.row.title }}</b>
                </NuxtLink>
              </p>
              <p
                style="
                  font-size: 12px;
                  color: gray;
                  margin: 0;
                  line-height: 15px;
                  padding-left: 25px;
                "
              >
                <span v-if="scope.row.closed_at">
                  #{{ scope.row.issue_id }} closed
                  {{ $moment(new Date(scope.row.closed_at)).fromNow() }}
                  {{ scope.row.user.username }}
                </span>
                <span v-else-if="scope.row.reopened_at">
                  #{{ scope.row.issue_id }} reopened
                  {{ $moment(new Date(scope.row.reopened_at)).fromNow() }}
                  {{ scope.row.user.username }}
                </span>
                <span v-else>
                  #{{ scope.row.issue_id }} opened
                  {{ $moment(new Date(scope.row.created_at)).fromNow() }}
                  by
                  {{ scope.row.user.username }}
                </span>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Label">
          <template slot-scope="scope">
            <div
              class="issue-label"
              v-for="label in scope.row.labels"
              :key="label.id"
              :style="'background-color:' + label.bg_color"
            >
              {{ label.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Assignee">
          <template slot-scope="scope">
            <div
              class="assignee"
              v-for="assignee in scope.row.assignees"
              :key="assignee.assignee.id"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="assignee.assignee.username"
                placement="bottom-end"
              >
                <img :src="getAvatarUrl(assignee.assignee)" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="margin-top-30"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export default {
  components: {},
  data() {
    return {
      tableData: [],
      timeAgo,
      multipleSelection: [],
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('projectModules/issues/get', { slug: params.slug })
  },
  computed: {
    ...mapState({
      issues: (state) => {
        return state.projectModules.issues.list
      },
      project_id: (state) => {
        return state.projectModules.issues.project_id
      },
    }),
  },
  mounted: function () {
    console.log('params.slug:', this.$route.params.slug)
    console.log('this.issues:', this.issues)
    console.log('this.project_id:', this.project_id)
    this.$store.commit('projectModules/projects/setActivePageTab', '/tasks')
    this.tableData = [...this.issues]
  },
  methods: {
    goToCreateIssue() {
      this.$router.push('new')
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
#project-tasks-page {
  .issue-label {
    color: white;
    display: inline-block;
    padding: 0px 13px;
    border-radius: 11px;
    margin-bottom: 5px;
    margin-right: 5px;
    font-size: 10px;
    line-height: 18px;
  }

  .assignee {
    margin-top: 10px;
    display: inline-block;
    img {
      width: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    span {
      font-size: 13px;
    }
  }
}
</style>
