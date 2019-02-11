<template>
  <div class="about">
    <h1>This is an about page 123</h1>
    <button v-on:click="getList()">Get</button>
    <ul>
      <li v-for="data in arr" v-bind:key="data.weblogin">
        <div>{{data.first_name}}</div>
        <div>{{data.last_name}}</div>
        <div>{{data.weblogin}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'about',
  data () {
    return {
      arr: []
    }
  },
  methods: {
    getList(){
      this.$http.get('/api/rcapps/get-list')
        .then(res => {
          this.arr = [].concat(res.data.Request)
        })
    }
  }
}
</script>

