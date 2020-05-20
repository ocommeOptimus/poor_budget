<template>
  <div>
    <v-app-bar color="primary" app dark clipped-left>
      <v-toolbar-title>
        <router-link to="home" class="toolbar-title-link">
          {{ appName }}
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <template v-if="!!user">
        <v-menu light offset-y :close-on-content-click="!!user">
          <template v-slot:activator="{ on }">
            <v-btn class="blue darken-1" dark v-on="on">
              <template>
                <span class="mr-2" v-if="$vuetify.breakpoint.mdAndUp">{{ user.email }}</span
                ><v-icon>fas fa-user</v-icon>
              </template>
            </v-btn>
          </template>
          <v-container class="grey lighten-5">
            <v-btn type="button" outlined rounded block @click="logoutUser">{{ $t('logout') }}</v-btn>
          </v-container>
        </v-menu>
      </template>
      <template v-else>
        <router-link to="login">
          <v-btn class="blue darken-1" dark>
            <span class="mr-2" v-if="$vuetify.breakpoint.mdAndUp">{{ $t('login') }}</span
            ><v-icon>fas fa-sign-in-alt</v-icon>
          </v-btn>
        </router-link>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NavBar',
  data: () => ({
    appName: 'Poor budget'
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logoutUser'])
  }
}
</script>

<style scoped>
.toolbar-title-link {
  color: inherit;
  text-decoration: inherit;
}
</style>
