<template lang="pug">
  #app
    b-loading(:active="loading")
    section.hero.is-primary
      .container
        nav.navbar.hero.is-primary
          .navbar-brand
            router-link.nav-item(:to="'/'")
              span vue-webpack-boilerplate
            .navbar-menu.is-active
              .navbar-end
                .navbar-item.github
                  base-button(:classes="loginButtonClasses", @onClick="push")
                    b-icon(icon="github", size="is-small")
                    span {{ isLoggedIn ? 'log out' : 'log in' }}
    router-view
    footer.footer
      .container
        .content.has-text-centered
          a(href="https://github.com/re-fort/vue-webpack-boilerplate").icon
            b-icon(icon="github")
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import Settings from 'config/settings'
  import { Xhr } from 'api'
  import BaseButton from 'components/BaseButton'

  export default {
    name: 'App',
    components: {
      BaseButton,
    },
    computed: {
      ...mapState(['loading']),
      ...mapState('Auth', ['token']),
      ...mapGetters('Auth', ['isLoggedIn']),
    },
    created() {
      // it takes a little time to start app in case of heroku
      Xhr.getWithoutToken('/ping')
    },
    data() {
      return {
        loginButtonClasses: ['navbar-item', 'is-primary', 'is-inverted', 'is-outlined'],
      }
    },
    methods: {
      ...mapMutations(['updateLoading']),
      push() {
        if (this.isLoggedIn) {
          this.$ga.event('auth', 'click', 'logout', 1)
          this.updateLoading(true)
          this.$toast.open({ message: 'logged out', type: 'is-info' })
          this.updateLoading(false)
          this.$router.push('/auth/#')
        } else {
          this.$ga.event('auth', 'click', 'login', 1)
          this.updateLoading(true)
          location.href = Settings.Api.authUrl
        }
      },
    },
  }
</script>

<style lang="sass">
  @import url(https://fonts.googleapis.com/css?family=Poiret+One);

  body, input
    font-family: 'Poiret One'
    font-size: 24px

  .section
    flex: 1

  .toast
    font-size: 20px

  .loading-icon
    font-size: 12px
</style>

<style lang="sass" scoped>
  #app
    display: flex
    min-height: 100vh
    flex-direction: column

    .nav-item
      align-items: center
      font-size: 1rem
      display: flex
      padding: .5rem .75rem

    a.icon
      cursor: pointer

    @media screen and (max-width: 1023px)
      .navbar-menu
        background-color: initial
        box-shadow: initial
        padding: initial
</style>
