<template lang="pug">
  #register.pink.lighten-5.screen-height.valign-wrapper
    .full-width
      .row
        .col.s12.m6.offset-m3.l4.offset-l4
          .card-panel
            h4.light.center fuelostic
            h5.light.center Register

            .row
              .input-field.col.s12
                input#name.validate(type="text" v-model="name")
                label(for="name") Name

              .input-field.col.s12
                input#email.validate(type="email" v-model="email")
                label(for="email") Email

              .input-field.col.s12
                input#password.validate(type="password" v-model="password")
                label(for="password") Password

            .row
              .col.s12
                .btn-large.full-width.blue(@click="register()") Register

            .row
              .col.s12.center
                router-link.btn-flat.full-width(:to="'/login'") Login

</template>

<script>
import M from 'materialize-css'
const apiHost = process.env.API_ENDPOINT

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      let currVue = this
      fetch(apiHost + '/user/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          name: currVue.name,
          email: currVue.email,
          password: currVue.password
        })
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.status) currVue.$router.push('/login')
          else M.toast({ html: 'Something bad happened. Please try again.' })
        })
        .catch(err => {
          console.error(err)
        })
      // console.log(this.name, this.email, this.password)
    }
  }
}
</script>
<!-- styling for the component -->
<style></style>
