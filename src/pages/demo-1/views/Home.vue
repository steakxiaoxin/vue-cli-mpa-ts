<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import HelloWorld from '../components/HelloWorld.vue' // @ is an alias to /src
import * as _API from '../api'

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  async created() {
    const res = _API.apiGet()
    console.log('res: ', res)
  }
  async mounted() {
    const res = _API.apiPost()
    console.log('res: ', res)
  }
}
</script>
