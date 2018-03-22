<template lang="pug">
  section.section
    .columns
      .column.is-4.is-offset-4
        article.message.is-danger
          .message-header
            p Required authentication
          .message-body
            a(@click="push") Log in
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component }from 'vue-property-decorator'
  import { Route, NavigationGuard }from 'vue-router'
  import Settings from 'src/config/settings'

  @Component({
    beforeRouteEnter (route, redirect, next) {
      return new Promise((resolve, reject) => {
        if (route.hash) {
          let token = route.hash.replace('#', '')
          next(vm => {
            vm.$store.commit('Auth/updateToken', token)
            if (token) vm.$toast.open({ message: 'logged in', type: 'is-info' })
            vm.$router.push('/')
            resolve(token)
          })
        } else {
          next(vm => {
            vm.$store.dispatch('Auth/verifyToken')
              .then((valid) => {
                valid ? vm.$router.push('/') : next()
                resolve(valid)
              })
              .catch(() => {
                next()
                reject()
              })
          })
        }
      })
    }
  })
  export default class Auth extends Vue {

    push() {
      this.$ga.event('auth', 'click', 'login', 1)
      this.$store.commit('loading', true)
      location.href = Settings.Api.authUrl
    }
  }
</script>
