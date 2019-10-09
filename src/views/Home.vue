<template>
<div class="home">
  <img alt="Vue logo" src="../assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" />
</div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import {
  dbRef
} from '@/firebase/index'
import HelloWorld from '@/components/HelloWorld.vue'
import {
  SpendingRepository
} from '@/firebase/repository'
import {
  DEV_UTILS
} from '@/dev/DEV_UTILS'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted() {
    DEV_UTILS.getUserIdAndSeedDb(firebase, dbRef)
      .then((userId) => {
        console.log(userId)

        let repo = new SpendingRepository(dbRef, userId)
        repo.attachToSpendings((snap) => {
          console.log(snap.key)
        })

        repo.addSpending({
          spending: 10
        }).then(() => {
          console.log('Added!')
          repo.disconnect()
        })

      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}
</script>
