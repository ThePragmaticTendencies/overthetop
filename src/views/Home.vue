<template>
<div class="row">
  <Category v-for="item in categories" :category=item />
</div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import {
  dbRef
} from '@/firebase/index'
import HelloWorld from '@/components/HelloWorld.vue'
import Category from '@/components/Category.vue'
import {
  SpendingRepository
} from '@/firebase/repository'
import {
  DEV_UTILS
} from '@/dev/DEV_UTILS'

export default {
  name: 'home',
  data: function() {
    return {
      categories: []
    }
  },
  components: {
    HelloWorld,
    Category
  },
  mounted() {
    DEV_UTILS.getUserIdAndSeedDb(firebase, dbRef)
      .then((userId) => {
        console.log(userId)

        let repo = new SpendingRepository(dbRef, userId)
        repo.attachToCategories((snap) => {
          console.log(snap.val())
          this.categories.push(snap.val())


        })

        repo.addCategory({
          name: this.categories.length + 1
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
