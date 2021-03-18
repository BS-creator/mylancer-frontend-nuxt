<template>
  <div class="container">
    <div class="margin-top-30"></div>
    <el-card class="box-card">
      <el-form
        :model="issueForm"
        :rules="issueRules"
        ref="issueForm"
        label-width="0px"
        class="demo-issueForm"
      >
        <el-form-item prop="title">
          <el-input v-model="issueForm.title" placeholder="Title"></el-input>
        </el-form-item>

        <el-form-item prop="content">
          <div
            class="quill-editor"
            :content="issueForm.content"
            @change="onEditorChange($event)"
            v-quill:myQuillEditor="editorOption"
          ></div>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="full-width"
            @click="submitForm('issueForm')"
            >Submit new issue</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <div class="margin-top-30"></div>
    <div class="margin-top-30"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      issueForm: {
        title: 'Create new feature 1',
        content: 'Create new feature <b>Hello</b> World',
      },
      issueRules: {
        title: [
          {
            required: true,
            message: 'Please enter title',
            trigger: 'blur',
          },
          {
            min: 3,
            message: 'Length should be 3 at least',
            trigger: 'blur',
          },
        ],
      },
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
  async fetch({ store, params }) {},
  computed: {},
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('projectModules/issues/create', {
              ...this.issueForm,
              project_slug: this.$route.params.slug,
            })
            .then((res) => {
              this.$router.push(`/projects/${this.$route.params.slug}/tasks`)
            })
            .catch((err) => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.issueForm.content = html
    },
  },
}
</script>

<style lang="scss">
.quill-editor {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
