import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionAPI from '@vue/composition-api'
import Vuetify, {
  VBtn,
} from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import './styles/index.scss'

Vue.use(VueCompositionAPI)
Vue.use(Vuetify, {
  components: {
    VBtn,
  }
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  vuetify: new Vuetify({})
})
