<template>
  <v-app>
    <app-nav-bar />
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>
    <app-footer />
    <notification />
  </v-app>
</template>

<script>
import AppNavBar from './components/layout/AppNavBar'
import AppFooter from './components/layout/AppFooter'
import Notification from './components/layout/AppNotification'

export default {
  name: 'App',
  components: {
    AppFooter,
    AppNavBar,
    Notification
  }
}
</script>
