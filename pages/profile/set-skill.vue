<template>
  <div id="skill-select" class="container">
    <div class="margin-top-40"></div>
    <div>
      <h2 class="margin-bottom-30">Please select your skills</h2>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Categories</span>
            </div>
            <el-scrollbar
              wrap-class="content"
              view-class="view-box"
              :native="false"
            >
              <div class="grid-content">
                <div
                  class="category-item"
                  v-for="category in categories"
                  @click="selectCategory(category)"
                  v-bind:class="{ active: category.id == selectedCategory.id }"
                  :key="category.id"
                >
                  <span>{{ category.name }}</span>
                </div>
              </div>
            </el-scrollbar>
          </el-card>
        </el-col>
        <el-col :sm="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Skills</span>
            </div>
            <div class="">
              <el-scrollbar
                wrap-class="content"
                view-class="view-box"
                :native="false"
              >
                <div v-if="selectedCategory">
                  <el-row :gutter="20" class="skills-wrapper">
                    <el-col
                      :sm="12"
                      class="skill-item"
                      v-for="skill in selectedCategory.skills"
                      :key="skill.id + 'a' + categoryKey"
                    >
                      <div @change="selectSkill(skill)">
                        <el-checkbox
                          size="medium"
                          :checked="selectedSkillIds.includes(skill.id)"
                        >
                          {{ skill.name }}</el-checkbox
                        >
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-scrollbar>
            </div>
          </el-card>
        </el-col>
        <el-col :sm="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Skills Selected</span>
            </div>
            <el-scrollbar
              wrap-class="content"
              view-class="view-box"
              :native="false"
            >
              <div class="grid-content">
                <div
                  :sm="12"
                  class="skill-item selected"
                  v-for="skill in selectedSkills"
                  :key="skill.id"
                >
                  <el-checkbox :checked="true" @change="removeSkill(skill)">
                    {{ skill.name }}</el-checkbox
                  >
                </div>
              </div>
            </el-scrollbar>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="step-btns">
      <el-button @click="save" icon="el-icon-check" class="float-right">
        Save
      </el-button>
    </div>
    <div class="margin-bottom-100"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'main',
  data() {
    return {
      categoryKey: 10,
      selectedCategory: false,
      num: 30,
    }
  },
  async fetch({ store }) {
    await store.dispatch('projectModules/categories/get')
    await store.dispatch('profile/getSkills')
  },
  computed: {
    ...mapState({
      categories: (state) => {
        return state.projectModules.categories.list
      },
      selectedSkills: (state) => {
        return state.profile.skills
      },
      selectedSkillIds: (state) => {
        return state.profile.skill_ids
      },
    }),
  },
  mounted: function () {
    this.selectCategory(this.categories[0])
  },
  methods: {
    selectCategory(category) {
      console.log(category)
      this.selectedCategory = category
    },
    selectSkill(skill) {
      console.log(this.selectedSkills)
      if (event.target.checked) {
        if (this.selectedSkillIds.includes(skill.id)) {
          return
        }
        this.$store.commit('profile/setSkills', [...this.selectedSkills, skill])
        this.$store.commit('profile/setSkillIds', [
          ...this.selectedSkillIds,
          skill.id,
        ])
        // this.selectedSkills.push(skill)
      } else {
        this.removeSkill(skill, false)
      }
    },
    removeSkill(skill, need) {
      let skills = this.selectedSkills.filter((s) => skill.id !== s.id)
      let skill_ids = this.selectedSkillIds.filter((id) => skill.id !== id)
      this.$store.commit('profile/setSkills', [...skills])
      this.$store.commit('profile/setSkillIds', [...skill_ids])

      if (need != false) {
        this.categoryKey++
      }
    },
    save() {
      console.log(this.categories)

      this.$store
        .dispatch('profile/setSkills', {
          skills: this.selectedSkills,
        })
        .then((res) => {
          console.log(res.data)
          this.$store.dispatch('profile/setNewStep', this.active + 1)
          this.$router.push(`/u/${this.$auth.user.username}`)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
  },
}
</script>

<style lang="scss">
#skill-select {
  .skills-wrapper {
    margin: 0 !important;
  }
  .el-scrollbar__bar {
    opacity: 1 !important;
  }
  .el-col {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .bg-white {
    background: white;
  }
  .grid-content {
    max-height: 500px;
    min-height: 500px;
  }
  .content {
    max-height: 500px;
    min-height: 500px;
  }
  .category-item {
    margin-bottom: 20px;
    cursor: pointer;

    &.active {
      color: var(--color-primary);
    }
  }
  .skills-wrapper {
    max-height: 500px;
  }
  .skill-item {
    cursor: pointer;
  }
  .skill-item.selected {
    margin-bottom: 20px;
  }
}
</style>
