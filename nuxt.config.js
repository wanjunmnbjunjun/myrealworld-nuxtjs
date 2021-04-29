/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router:{
    //添加nuxt-lick，被激活后的class名称
    linkActiveClass: 'active',
    //自定义路由表规则
    extendRoutes(routes, resolve) {
      //清除Nuxt.js基于pages 目录默认生成的路由表规则
      routes.splice(0)
      routes.push(...[
        {
          path:'/',
          component: resolve(__dirname,'pages/layout/'),
          children:[
            {
              path:'',
              name:'home',
              component: resolve(__dirname,'pages/home/home.vue'),
            },
            {
              path:'/login',
              name:'login',
              component: resolve(__dirname,'pages/login/login.vue'),
            },
            {
              path:'/register',
              name:'register',
              component: resolve(__dirname,'pages/login/login.vue'),
            },
            {
              path:'/profile/:username',
              name:'profile',
              component: resolve(__dirname,'pages/profile/profile.vue'),
            },
            {
              path:'/settings',
              name:'settings',
              component: resolve(__dirname,'pages/settings/settings.vue'),
            },
            {
              path:'/editor',
              name:'editor',
              component: resolve(__dirname,'pages/editor/editor.vue'),
            },
            {
              path:'/article/:slug',
              name:'article',
              component: resolve(__dirname,'pages/article/article.vue'),
            },

          ]
        }
      ])
    }
  },
  server:{
    host:'0.0.0.0',
    port: 3000

  },
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
  ]
}