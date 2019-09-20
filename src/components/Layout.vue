<template lang="pug">
  #layout
    header
      nav
        .nav-wrapper
          a.brand-logo(href="#") Logo
          ul#nav-mobile.right.hide-on-med-and-down
            li
              a(href="sass.html") Sass
            li
              a(href="badges.html") Components
            li
              a(href="collapsible.html") JavaScript
    main
      slot
    footer
</template>

<script>
export default {
  name: 'Layout'
}
</script>
<!-- styling for the component -->
<style>

</style>
