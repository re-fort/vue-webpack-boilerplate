<template lang="pug">
  #app
    section.hero.is-primary
      .container
        nav.navbar.hero.is-primary
          .navbar-brand
            router-link.nav-item(:to="'/'")
              span vue-webpack-boilerplate
            .navbar-menu.is-active
              .navbar-end
                .navbar-item.github
                  a.navbar-item.button.is-primary.is-inverted.is-outlined(@click="push()")
                    span.icon
                      i.fa.fa-github
                    span {{ isLoggedIn ? 'log out' : 'log in' }}
    router-view
    footer.footer
      .container
        .content.has-text-centered
          a(href="https://github.com/re-fort/vue-webpack-boilerplate").icon
            i.fa.fa-github
</template>

<script>
import { Xhr } from 'api'

export default {
  name: 'App',
  computed: {
    isLoggedIn() {
      return this.$store.state.Auth.token !== ''
    },
  },
  mounted() {
    // it takes a little time to start app in case of heroku
    Xhr.getWithoutToken('/ping')
  },
  methods: {
    push() {
      if (this.isLoggedIn) {
        this.$ga.event('auth', 'click', 'logout', 1)
        this.$router.push('/auth/#')
      } else {
        this.$ga.event('auth', 'click', 'login', 1)
        location.href = this.$store.state.authUrl
      }
    }
  },
}
</script>
