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
export default {
  name: 'Layout',
  mounted: function() {
    M.AutoInit()
  }
}
</script>
<!-- styling for the component -->
<style>
@media only screen and (min-width: 992px) {
  .brand-logo {
    margin-left: 15px;
  }
}
nav .brand-logo img {
  max-height: 48px;
}

nav,
nav .nav-wrapper i,
nav a.sidenav-trigger,
nav a.sidenav-trigger i {
  height: 48px;
  line-height: 48px;
}
</style>
