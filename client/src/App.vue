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
import AppNavBar from './views/layout/AppNavBar'
import AppFooter from './views/layout/AppFooter'
import Notification from './views/layout/Notification'
export default {
  name: 'App',
  components: {
    AppFooter,
    AppNavBar,
    Notification
  }
}
</script>
