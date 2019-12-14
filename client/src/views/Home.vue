<template>
  <div>
    Home<br />
    <hr />
    <button @click="testGetTransfers">Test transfers</button><br />
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    testGetTransfers() {
      console.log(this.$store.dispatch('getTransfers'))
    }
  }
}
</script>

<style scoped></style>
