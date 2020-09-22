import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function goBack(backStep) {
    this.isBack = true
    window.history.go(backStep || -1)
}
//push 
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace(to) {
    return VueRouterReplace.call(this, to).catch(err => err)
}
Vue.use(Router)
export default new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            component: resolve => require(['./views/homeShow'], resolve),
            meta: {
                needLogin: false
            }
        },
        {
            path: '/login',
            component: resolve => require(['./views/Login'], resolve),
            meta: {
                needLogin: false
            }
        },
        {
            path: '/register',
            component: resolve => require(['./views/Register'], resolve),
            meta: {
                needLogin: false
            }
        },

        {
            path: '/personInfo/:type',
            component: resolve => require(['./views/content/UserInfo/PersonInfo'], resolve),
            meta: {
                needLogin: false
            }
        },
        {
            path: '/home',
            component: resolve => require(['./Home'], resolve),
            meta: {
                needLogin: true
            },
            children: [{
                    path: '/homePage',
                    component: resolve => require(['./views/homePage'], resolve),
                    meta: {
                        needLogin: true
                    }
                },
                {
                    path: '/information',
                    component: resolve => require(['./views/content/UserInfo/Information'], resolve),
                    meta: {
                        needLogin: true
                    }
                },
                {
                    path: '/resetPassword',
                    component: resolve => require(['./views/content/UserInfo/ResetPossword'], resolve),
                    meta: {
                        needLogin: true
                    }
                },
                {
                    path: '/saveDataDetail',
                    component: resolve => require(['./views/content/HomeSearch/SaveDataDetail'], resolve),
                    meta: {
                        needLogin: true
                    }
                },
                {
                    path: '/developer',
                    component: resolve => require(['./views/content/developerManager/developerInfo'], resolve),
                    meta: {
                        needLogin: false
                    },
                    children: [{
                        path: '/getInterface',
                        component: resolve => require(['./views/content/developerManager/getInterface'], resolve),
                        meta: {
                            needLogin: false
                        }
                    }, {
                        path: '/downFile',
                        component: resolve => require(['./views/content/developerManager/downFile'], resolve),
                        meta: {
                            needLogin: false
                        }
                    }, ]
                },
            ]
        }
    ]
})