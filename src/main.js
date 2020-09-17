import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router';
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './my-theme/index.less';
import SlideVerify from 'vue-monoplasty-slide-verify';
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(SlideVerify);

// router.beforeEach((to, from, next) => {
//     sessionStorage.clear()
//     // console.log(JSON.parse(sessionStorage.getItem('UserInfo')))
//     if (sessionStorage.getItem('UserInfo')) {
//         if (to.path === '/login' || to.path === '/register') {
//             // 登录状态下 访问login.vue页面 会跳到home.vue
//             next({
//                 path: '/home'
//             })
//         } else {
//             next()
//         }
//     } else {
//         if (to.meta.needLogin == false) {
//             next()
//         } else { // 否则 跳转到登录页面
//             next({
//                 path: '/'
//             })
//         }
//     }
//     next()
// })

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')