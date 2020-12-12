import Vue from 'nativescript-vue'
import App from './components/App.vue'
import VueDevtools from 'nativescript-vue-devtools'
import router from './router';
import RadDataForm from 'nativescript-ui-dataform/vue';
import CalendarView from 'nativescript-ui-calendar/vue';
import RadListView from 'nativescript-ui-listview/vue';
import RadChart from 'nativescript-ui-chart/vue';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './fonts/font-awesome.css',
  //'ion': './ionicons.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);


if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.use(CalendarView);
Vue.use(RadDataForm);
Vue.use(RadListView);
Vue.use(RadChart);

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

Vue.registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);


//functions
Vue.prototype.$closeModal = function (context) {
  context.$modal.close();
};

Vue.prototype.$gotToModal = function (to) {
  if (!router[to]) return;
  return this.$showModal(router[to], { fullscreen: true });
};

Vue.prototype.$goTo = function (to, clearHistory) {
  if (!router[to]) return;
  this.$navigateTo(router[to], {
    clearHistory: clearHistory,
    transitionAndroid: {
      name: "slide",
      duration: 500
    }
  });
};
//init database
store.dispatch('database/init')

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
