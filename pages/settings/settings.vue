<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="onSubmit">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required>
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email" required>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" minlength="8" required>
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr />
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { UpdateUser,GetUser } from '/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'settings',
  middleware: 'authenticated',
  data(){
    return {
      user: {}
    }
  },
  computed:{
  },
  methods:{
    async getUser(){
      const res = await GetUser()
      this.user = res.data.user
    },
    async onSubmit(){
      const {data} = await UpdateUser({
        user: this.user
      })
      
      this.logout()

    },
    logout(){
      this.$router.push({
        name: 'login'
      })
      this.$store.commit('setUser',null)
      Cookie.remove('user');
    }

  },
  created(){
    this.getUser()
  }

}
</script>

<style>

</style>