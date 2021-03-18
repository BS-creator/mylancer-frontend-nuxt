<template>
  <div>
    <page-header></page-header>
    <Nuxt />
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from '@/components/layout/postproject/PageHeader'
import PageFooter from '@/components/layout/main/PageFooter'

export default {
  auth: false,
  components: {
    PageHeader,
    PageFooter,
  },
}
</script>
