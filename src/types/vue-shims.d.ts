import Vue from 'vue'

// this manual declaration will remove when libraries publish their declaration files on npm
declare module 'vue/types/vue' {
  interface Vue {
    // Buefy
    $dialog: any,
    $loading: any,
    $modal: any,
    $snackbar: any,
    $toast: any,
    // vue-analytics
    $ga: any
  }
}
