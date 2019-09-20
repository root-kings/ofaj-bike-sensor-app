<template lang="pug">
  #layout
    header
      nav
        .nav-wrapper.blue-grey
          a.brand-logo(href="#") Logo
          a.sidenav-trigger(href="#" data-target="mobile-demo")
            i.material-icons menu
          ul#nav-mobile.right.hide-on-med-and-down
            li
              router-link(:to="'/vehicles'") Vehicles
            li
              router-link(:to="'/profile'") Profile
      ul#mobile-demo.sidenav
        li
          router-link(:to="'/vehicles'") Vehicles
        li
          router-link(:to="'/profile'") Profile
    main
      slot
    // footer
</template>

<script>
import M from 'materialize-css'
export default {
  name: 'Layout',
  mounted: () => {
    M.AutoInit()
  }
}
</script>
<!-- styling for the component -->
<style></style>
