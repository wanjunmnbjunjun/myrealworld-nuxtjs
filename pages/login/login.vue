<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{isLogin? 'Sign in' : 'Sign up'}}</h1>
          <p class="text-xs-center">
            <nuxt-link  :to="{name: isLogin?'register':'login'}"> {{isLogin? 'Need an account' :'Have an account'}}?</nuxt-link>
          </p>
          <ul class="error-messages" >
            <template v-for="(messages, field) in errors" >
              <li v-for="(message,index) in messages" :key="index">{{field}}:{{message}}</li>
            </template>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" minlength="8" required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
             {{isLogin? 'Sign in' : 'Sign up'}}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Login,Register} from '/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'Login',
  middleware: 'notAuthenticated',
  data(){
    return {
      user:{
        email: '',
        password:'',
        username:'',
      },
      errors:{}

    }
  },
  computed:{
    isLogin(){
      return this.$route.name == 'login'
    }
  },
  methods:{
    async onSubmit(){
      try{
        const {data} = this.isLogin? await Login({user:this.user}):await Register({user:this.user})
        //TODO保持用户登录状态
        this.$store.commit('setUser',data.user)
        //nuxt单纯的客户端渲染，刷新页面会导致数据丢失，我们需要保持数据的持久化
        Cookie.set('user',data.user)
        this.$router.push('/')
      } catch (err){
        //
        this.errors = err.response.data.errors
        console.log(this.errors);
      }
      
    }

  }

}
</script>

<style>

</style>