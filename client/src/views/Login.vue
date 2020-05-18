<template>
  <v-container class="login-container">
    <v-card>
      <v-container class="px-8 py-4">
        <ValidationObserver ref="obs" v-slot="{ invalid }">
          <v-alert border="top" color="red" outlined dark v-if="badCredentials">{{ $t('bad_credentials') }}</v-alert>
          <v-form @submit.prevent="submitLoginForm">
            <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                :placeholder="$t('email')"
                prepend-icon="fas fa-user"
                type="text"
                v-model="email"
                autofocus
              />
            </ValidationProvider>
            <ValidationProvider name="password" rules="required" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                :placeholder="$t('password')"
                prepend-icon="fas fa-key"
                type="password"
                v-model="password"
              />
            </ValidationProvider>
            <v-row align="center" justify="center">
              <v-btn type="submit" class="mt-2" outlined rounded color="primary" :disabled="invalid">{{
                $t('login')
              }}</v-btn>
            </v-row>
            <v-row class="justify-center mt-2">
              <p>
                {{ $t('not_registered_yet') }}&nbsp;
                <router-link :to="{ name: 'register' }">
                  {{ $t('register') }}
                </router-link>
              </p>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'LoginForm',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => {
    return {
      email: '',
      password: '',
      badCredentials: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['loginUser', 'setSuccess']),
    async submitLoginForm() {
      // Reset error message
      this.badCredentials = false
      try {
        await this.loginUser({ email: this.email, password: this.password })
        if (this.user) {
          this.setSuccess('logged-in')
          await this.$router.push('home')
        }
      } catch (error) {
        this.badCredentials = true
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 600px;
}
</style>
