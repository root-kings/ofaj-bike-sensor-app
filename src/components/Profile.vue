<template lang="pug">
  layout
    #profile.grey.lighten-3
      .row
        .col.s12.m6.offset-m3.l4.offset-l4
          .card
            .card-image
              img(src="./../assets/logo.png")
            .card-content
              .card-title {{ user.name }}
</template>

<script>
import Layout from '@/components/Layout'

export default {
  name: 'Profile',
  components: { Layout },
  data: () => {
    return {
      user: {
        name: 'Tusar Pandey'
      }
    }
  }
}
</script>

<!-- styling for the component -->
<style>
.card-image {
  overflow: hidden;
  max-height: 256px;
}
</style>
