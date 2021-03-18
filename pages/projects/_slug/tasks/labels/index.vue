<template>
  <div id="issue-label-page">
    <div class="container" style="min-height: 600px">
      <div>
        <el-button
          type="success"
          size="small"
          style="float: right; margin-bottom: 10px"
          @click="showCreateForm"
        >
          New Label
        </el-button>
      </div>
      <div v-show="showFrom">
        <el-card class="full-width margin-bottom-10">
          <el-form
            :inline="true"
            :model="labelForm"
            :rules="labelRules"
            ref="labelForm"
            label-width="120px"
            class="label-form"
          >
            <el-form-item label="Label name" prop="name">
              <el-input
                placeholder="Label name"
                v-model="labelForm.name"
                size="small"
              ></el-input>
            </el-form-item>

            <el-form-item label="Description" prop="description">
              <el-input
                placeholder="Description"
                v-model="labelForm.description"
                size="small"
              ></el-input>
            </el-form-item>

            <el-form-item label="Color" prop="bg_color">
              <el-color-picker
                v-model="labelForm.bg_color"
                :predefine="predefineColors"
              >
              </el-color-picker>
            </el-form-item>

            <el-form-item class="float-right">
              <el-button size="small" @click="showFrom = false"
                >Cancel</el-button
              >
              <el-button
                type="success"
                size="small"
                icon="fa fa-save"
                @click="createLabel"
                v-if="!isEdit"
              >
                Create Label</el-button
              >
              <el-button
                type="success"
                size="small"
                @click="handleEdit"
                v-if="isEdit"
              >
                Update Label</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </div>
      <el-table :data="labels" ref="multipleTable" style="width: 100%">
        <el-table-column prop="name" label="Labels">
          <template slot-scope="scope">
            <div
              class="issue-label"
              :style="'background-color:' + scope.row.bg_color"
            >
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="Description"
        ></el-table-column>
        <el-table-column align="right" label="Action">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="showEditForm(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-popover placement="top" v-model="deleteConfirm[scope.row.id]">
              <p>Are you sure?</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  type="default"
                  size="mini"
                  @click="deleteConfirm[scope.row.id] = false"
                  >cancel</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)"
                  >confirm</el-button
                >
              </div>
              <el-button slot="reference" size="mini" type="text">
                Delete
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="margin-top-30"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'single-project',
  data() {
    return {
      showFrom: false,
      isEdit: false,
      deleteConfirm: {},
      labelForm: {
        name: '',
        description: '',
        bg_color: '#409EFF',
      },
      labelRules: {
        name: [
          {
            required: true,
            message: 'Please enter email address',
            trigger: 'blur',
          },
        ],
        color: [
          {
            required: true,
            message: 'Please select background color',
            trigger: 'blur',
          },
        ],
      },
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577',
      ],
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('projectModules/issue_labels/get', params.slug)
  },
  computed: {
    ...mapState({
      labels: (state) => {
        return state.projectModules.issue_labels.list
      },
      project: (state) => {
        return state.projectModules.projects.project
      },
    }),
  },
  mounted() {},
  methods: {
    createLabel() {
      this.$store
        .dispatch(`projectModules/issue_labels/create`, {
          ...this.labelForm,
          project_id: this.project.id,
        })
        .then((res) => {
          console.log(res)
          this.$store.dispatch(
            'projectModules/issue_labels/get',
            this.$route.params.slug
          )
          this.showFrom = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showCreateForm(index, row) {
      this.labelForm = {
        name: '',
        description: '',
        bg_color: '#409EFF',
      }
      this.isEdit = false
      this.showFrom = true
    },
    showEditForm(index, row) {
      this.labelForm = {
        id: row.id,
        name: row.name,
        description: row.description,
        bg_color: row.bg_color,
      }
      this.isEdit = true
      this.showFrom = true
    },
    handleEdit() {
      this.$store
        .dispatch('projectModules/issue_labels/update', { ...this.labelForm })
        .then((res) => {
          console.log(res)
          this.$store.dispatch(
            'projectModules/issue_labels/get',
            this.$route.params.slug
          )
          this.showFrom = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$set(this.deleteConfirm, row.id, false)

      this.$store
        .dispatch('projectModules/issue_labels/delete', row)
        .then((res) => {
          console.log(res)
          this.$store.dispatch(
            'projectModules/issue_labels/get',
            this.$route.params.slug
          )
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss">
#issue-label-page {
  .label-form {
    .el-form--inline .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
