<template>
  <v-snackbar bottom v-model="snackbar.display" :timeout="snackbar.timeout" :color="snackbar.color">
    {{ snackbar.message }}
    <v-btn text @click="snackbar = false">
      <v-icon>fas fa-times</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Notification',
  data() {
    return {
      snackbar: {
        display: false,
        color: '',
        message: '',
        timeout: 4000
      }
    }
  },
  computed: {
    ...mapState(['error', 'success'])
  },
  watch: {
    error(newValue) {
      if (newValue !== null) {
        this.handleError(newValue)
      }
    },
    success(newValue) {
      if (newValue !== null) {
        this.handleSuccess(newValue)
      }
    }
  },
  methods: {
    ...mapActions(['resetError', 'resetSuccess']),
    async handleError(value) {
      // Create the translation key and get the message
      const translationKey = `notify-error.${value}`
      const translation = this.$t(`notify-error.${value}`)

      // If there's no message for the error get the default
      this.snackbar.message = translation !== translationKey ? translation : this.$t('notify-error.default')

      this.snackbar.color = 'error'
      this.snackbar.display = true

      // Reset error to avoid not handling another bug
      this.resetError()
    },
    async handleSuccess(value) {
      // Create the translation key and get the message
      const translationKey = `notify-success.${value}`
      const translation = this.$t(`notify-success.${value}`)

      // If there's no message for the error get the default
      this.snackbar.message = translation !== translationKey ? translation : this.$t('notify-success.default')

      this.snackbar.color = 'success'
      this.snackbar.display = true

      // Reset error to avoid not handling another bug
      this.resetSuccess()
    }
  }
}
</script>

<style scoped />
