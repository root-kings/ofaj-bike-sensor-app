<template lang="pug">
  #login.pink.lighten-5.screen-height.valign-wrapper
    .full-width
      .row
        .col.s12.m6.offset-m3.l4.offset-l4
          .card-panel
            h4.light.center fuelostic
            h5.light.center Login

            .row
              .input-field.col.s12
                input#email.validate(type="email" v-model="email")
                label(for="email") Email

              .input-field.col.s12
                input#password.validate(type="password" v-model="password")
                label(for="password") Password

            .row
              .col.s12
                .btn-large.full-width.blue(@click="login()") Login

            .row
              .col.s6.center
                router-link.btn-flat.full-width(:to="'/register'") Register
              .col.s6.center
                .btn-flat.full-width(@click="") Forgot Password

</template>

<script>
const M = require('materialize-css')
const apiHost = process.env.API_ENDPOINT

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      let currVue = this
      fetch(apiHost + '/user/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          email: currVue.email,
          password: currVue.password
        })
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.status) {
            currVue.$router.push('/vehicles')
          } else {
            M.toast({ html: 'Incorrect login details.' })
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
<!-- styling for the component -->
<style></style>
