// Vue Filter
import Vue from 'vue'
Vue.filter('reverse', (val: any) => val.toString().split('').reverse().join(''))
