<template lang="pug">
  section.section
    .columns
      .column.is-4.is-offset-4
        article.message.is-danger
          .message-header
            p Required authentication
          .message-body
            a(:href="$store.state.authUrl") Log in
</template>

<script>
  export default {
    name: 'Auth',
    beforeRouteEnter (route, redirect, next) {
      if (route.hash) {
        let token = route.hash.replace('#', '')
        next(vm => {
          vm.$store.dispatch('Auth/updateToken', token)
          vm.$router.push('/')
        })
      } else {
        next(vm => {
          vm.$store.dispatch('Auth/verifyToken')
            .then((valid) => {
              valid ? vm.$router.push('/') : next()
            })
            .catch(() => {
              next()
            })
        })
      }
    },
  }
</script>
