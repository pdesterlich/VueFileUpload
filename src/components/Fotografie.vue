<template>
<div>
  <h1>elenco fotografie</h1>
  <input type="file" v-on:change="postFotografia">
  <ul>
    <li v-for="item in elenco" v-on:click="currentId = item.id">{{ item.fileName }}</li>
  </ul>
  <img v-if="currentId > 0" v-bind:src="imgSource" alt="">
</div>
</template>

<script>
  export default {
    name: 'Fotografie',
    data () {
      return {
        elenco: [],
        currentId: 0
      }
    },
    computed: {
      imgSource () {
        return 'http://localhost:5000/api/fotografie/' + this.currentId
      }
    },
    methods: {
      getList () {
        this.$http.get('api/fotografie')
          .then(response => {
            console.log('ok')
            this.elenco = response.body
          }, response => {
            console.log('error')
            console.log(response)
          })
      },
      postFotografia (e) {
        let files = e.target.files
        let data = new FormData()
        data.append('file', files[0])
        this.$http.post('api/fotografie', data)
          .then(response => {
            e.target.value = ''
            this.getList()
          }, response => {
            console.log('error')
          })
      }
    },
    created () {
      this.getList()
    }
  }
</script>

<style>
ul > li {
  cursor: pointer;
}
</style>
