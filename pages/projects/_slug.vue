<template>
  <div>
    <sub-header></sub-header>

    <div class="margin-top-15"></div>

    <div class="project-tabs-content">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'main',
  head() {
    return {
      title: this.project.name,
      meta: [
        {
          hid: 'project',
          name: 'project',
          content: 'project',
        },
      ],
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('projectModules/projects/show', { slug: params.slug })
    await store.dispatch('projectModules/proposals/get', {
      slug: params.slug,
      current_page: 1,
    })
  },
  computed: {
    ...mapState({
      project: (state) => {
        return state.projectModules.projects.project
      },
    }),
  },
}
</script>

<style>
.project-tabs-content {
  min-height: 800px;
}
</style>
