<template>
<div>
  <h1>elenco fotografie</h1>
  <input type="file" v-on:change="postFotografia">
  <br>
  <button v-on:click="getList">aggiorna elenco</button>
  <ul>
    <li v-for="item in elenco" v-on:click="setCurrent(item)">{{ item.fileName }} - {{ item.descDimensione }}</li>
  </ul>
  <img v-if="currentChiave > 0" v-bind:src="imgSource" alt="">
</div>
</template>

<script>
  export default {
    name: 'Fotografie',
    data () {
      return {
        elenco: [],
        currentChiave: 0,
        currentDimensione: 0
      }
    },
    computed: {
      imgSource () {
        return 'http://localhost:5000/api/fotografie/' + this.currentChiave + '/' + this.currentDimensione
      }
    },
    methods: {
      getDescDimensione (dimensione) {
        if (dimensione === 1) return 'piccola'
        if (dimensione === 2) return 'media'
        return 'originale'
      },
      getList () {
        this.currentChiave = 0
        this.$http.get('api/fotografie')
          .then(response => {
            console.log('ok')
            this.elenco = []
            for (let i = 0; i < response.body.length; i++) {
              let item = response.body[i]
              item.descDimensione = this.getDescDimensione(item.dimensione)
              this.elenco.push(item)
            }
            this.elenco = response.body
          }, response => {
            console.log('error')
            console.log(response)
          })
      },
      postFotografia (e) {
        let chiave = Math.floor((Math.random() * 1000000000) + 1)
        let files = e.target.files
        let data = new FormData()
        data.append('file', files[0])
        this.$http.post('api/fotografie/' + chiave, data)
          .then(response => {
            e.target.value = ''
            this.getList()
          }, response => {
            console.log('error')
          })
      },
      setCurrent (item) {
        this.currentChiave = item.chiave
        this.currentDimensione = item.dimensione
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
