<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Corrected"/>
    <div>
      <label>First </label>
      <input type="text" v-model="user.first_name">
      <label>Last </label>
      <input type="text" v-model="user.last_name">
      <label>Weblogin</label>
      <input type="text" v-model="user.weblogin">
      <button v-on:click="submit()"></button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return{
      user: {
        first_name: '',
        last_name: '',
        weblogin: ''
      }
    }
  },
  methods: {
    submit: function(){
      this.$http.post('/api/rcapps/user',this.user)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
