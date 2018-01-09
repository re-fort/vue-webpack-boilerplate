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

<script>
  export default {
    name: 'Auth',
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
    },
    methods: {
      push() {
        this.$ga.event('auth', 'click', 'login', 1)
        this.$store.commit('loading', true)
        location.href = this.$store.state.authUrl
      },
    },
  }
</script>
