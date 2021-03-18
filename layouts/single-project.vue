<template>
  <div id="wrapper">
    <page-header></page-header>
    <sub-header></sub-header>
    <Nuxt />
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from '@/components/layout/main/PageHeader'
import PageFooter from '@/components/layout/main/PageFooter'
import SubHeader from '@/components/layout/singleproject/SubHeader'

export default {
  components: {
    PageHeader,
    PageFooter,
    SubHeader,
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>
