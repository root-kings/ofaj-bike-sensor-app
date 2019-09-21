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
            li
              a(@click="logout()") Logout
      ul#mobile-demo.sidenav
        li
          router-link(:to="'/vehicles'") Vehicles
        li
          router-link(:to="'/profile'") Profile
        li
          a(@click="logout()") Logout
    main
      slot
    // footer
</template>

<script>
import M from 'materialize-css'
// const apiHost = process.env.API_ENDPOINT

export default {
  name: 'Layout',
  beforeCreate: function() {
    if (!this.$session.exists() || !this.$session.get('user'))
      this.$router.push('/login')
  },
  mounted: () => {
    M.AutoInit()
  },
  methods: {
    logout() {
      this.$session.remove('user')
      this.$session.destroy()
      this.$router.push('/login')
    }
  }
}
</script>
<!-- styling for the component -->
<style></style>
