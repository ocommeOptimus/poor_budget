<template>
  <v-footer color="primary" app>
    <span class="copy">&copy;&nbsp;{{ years }}</span>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    years: () => {
      const currentYear = new Date().getFullYear()
      return currentYear === 2019 ? 2019 : `2019-${currentYear}`
    }
  }
}
</script>

<style scoped>
.copy {
  color: white;
}
</style>
