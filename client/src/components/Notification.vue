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
        timeout: 0
      }
    }
  },
  computed: {
    ...mapState(['error', 'success'])
  },
  watch: {
    error(newValue) {
      if (newValue !== null) {
        const message = this.getMessage('error', newValue)

        this.notify(message, 'error')

        this.resetError
      }
    },
    success(newValue) {
      if (newValue !== null) {
        const message = this.getMessage('success', newValue)

        this.notify(message)

        this.resetSuccess
      }
    }
  },
  methods: {
    ...mapActions(['resetError', 'resetSuccess']),
    notify(message, color = 'success', timeout = 4000) {
      if (message) {
        this.snackbar.message = message
        this.snackbar.color = color
        this.snackbar.timeout = timeout
        this.snackbar.display = true
      }
    },
    getMessage(notificationKey, index) {
      // Create the translation key and get the message
      const translationKey = `notify-${notificationKey}.${index}`
      const translation = this.$t(`notify-${notificationKey}.${index}`)

      // If there's no message for the error get the default
      return translation !== translationKey ? translation : this.$t(`notify-${notificationKey}.default`)
    }
  }
}
</script>

<style scoped />
