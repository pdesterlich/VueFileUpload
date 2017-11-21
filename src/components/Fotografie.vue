<template>
<div>
  <h1>elenco fotografie</h1>
  <ul>
    <li v-for="item in elenco">{{ item.fileName }}</li>
  </ul>
</div>
</template>

<script>
  export default {
    name: 'Fotografie',
    data () {
      return {
        elenco: []
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
      }
    },
    created () {
      this.getList()
    }
  }
</script>

<style>

</style>
