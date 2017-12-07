<template lang="pug">
  #app
    .overlay(v-show="this.$store.state.loading")
      beat-loader(:loading="this.$store.state.loading", color="#00d1b2")
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
    router-view(@notify="notify")
    footer.footer
      .container
        .content.has-text-centered
          a(href="https://github.com/re-fort/vue-webpack-boilerplate").icon
            i.fa.fa-github
</template>

<script>
import { Xhr } from 'api'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
import notification from 'components/partials/Notification'

const NotificationComponent = Vue.extend(notification)

export default {
  name: 'App',
  components: {
    notification,
    BeatLoader,
  },
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
        this.notify({　message: 'logged out', type: 'info', duration: 1500, showCloseButton: false })
        this.$router.push('/auth/#')
      } else {
        this.$ga.event('auth', 'click', 'login', 1)
        this.$store.commit('loading', true)
        location.href = this.$store.state.authUrl
      }
    },
    notify(propsData) {
      return new NotificationComponent({
        el: document.createElement('div'),
        propsData
      })
    }
  },
}
</script>

<style lang="sass">
@import url(https://fonts.googleapis.com/css?family=Poiret+One);

body, input
  font-family: 'Poiret One'
  font-size: 24px

#app
  display: flex
  min-height: 100vh
  flex-direction: column

.section
  flex: 1

.selection
  width: 100%

.description
  font-size: 16px

.overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 99998
  background-color: rgba(255, 255, 255, .5)

.v-spinner
  display: flex
  justify-content: center
  align-items: center
  height: 80%
  z-index: 99999
</style>
