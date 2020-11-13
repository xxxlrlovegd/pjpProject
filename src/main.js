import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './my-theme/index.less';
import SlideVerify from 'vue-monoplasty-slide-verify';
import store from './store/index'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(SlideVerify);

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('Authorization')&&JSON.parse(sessionStorage.getItem("userInfo")).userStatus=='1') {
        if (to.path === '/login' || to.path === '/register') {
            // 登录状态下 访问login.vue页面 会跳到index.vue
            next({
                path: '/home'
            })
        } else {
            next()
        }
    } else {
        // 如果没有session ,访问任何页面。都会进入到 登录页
        if (to.meta.needLogin == false) { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
            next()
        } else { // 否则 跳转到登录页面
            next({
                path: '/index'
            })
        }
    }
})
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')