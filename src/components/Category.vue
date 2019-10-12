<template>
<div class="col-md-2">
  <h1>{{category.name}}</h1>
</div>
</template>

<script>
export default {
  name: 'Category',
  props: {
    category: {}
  }
}
</script>
