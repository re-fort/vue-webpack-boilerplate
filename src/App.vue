<template lang="pug">
  #app
    section.hero.is-primary
      .container
        nav.navbar.hero.is-primary
          .navbar-brand
            router-link.nav-item(:to="'/'")
              span vue-webpack-boilerplate
            .navbar-menu
              .navbar-end
                .navbar-item
                  a.navbar-item.button.is-primary.is-inverted.is-outlined(:href="isLoggedIn ? './#/auth/#' : $store.state.authUrl")
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
  export default {
    name: 'App',
    computed: {
      isLoggedIn() {
        return this.$store.state.Auth.token !== ''
      },
    },
  }
</script>
