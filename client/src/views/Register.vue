<template>
  <v-container>
    <v-card>
      <v-container class="px-8 py-4">
        <ValidationObserver ref="obs" v-slot="{ invalid }">
          <v-alert border="top" color="red" outlined dark v-if="badCredentials">{{ $t('bad_credentials') }}</v-alert>
          <v-form @submit.prevent="submitRegistrationForm">
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
            <ValidationProvider name="password_confirmation" rules="required|confirmed:password" v-slot="{ errors }">
              <v-text-field
                :error-messages="errors"
                :placeholder="$t('password_confirmation')"
                prepend-icon="fas fa-key"
                type="password"
                v-model="passwordConfirmation"
              />
            </ValidationProvider>
            <v-row align="center" justify="center">
              <v-btn type="submit" class="mt-2" outlined rounded color="primary" :disabled="invalid">
                {{ $t('register') }}
              </v-btn>
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
  name: 'Register',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      badCredentials: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['registerUser', 'setSuccess']),
    async submitRegistrationForm() {
      await this.registerUser({ email: this.email, password: this.password })

      if (this.user) {
        this.setSuccess('registration')
        await this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>

<style scoped />
