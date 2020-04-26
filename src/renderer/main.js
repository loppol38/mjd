import Vue from 'vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import App from './App'
import router from './router'
import store from './store'

if (process.env.NODE_ENV === 'development') {
  require('@vue/devtools').connect('http://localhost', 8098)
}

Vue.use(ViewUI)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
