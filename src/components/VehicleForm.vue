<template lang="pug">
  .row
    form.col.s12
      .row
        .input-field.col.s12
          input#make.validate(type="text" v-model="vehicle.make")
          label(for="make") Make

        .input-field.col.s12
          input#model.validate(type="text" v-model="vehicle.model")
          label(for="model") Model

        .input-field.col.s12
          input#registration.validate(type="text" v-model="vehicle.registration")
          label(for="registration") Registration

      .row
        .col.s12
          .btn-large.full-width.blue(@click="save()") Save

</template>

<script>
import M from 'materialize-css'
const apiHost = process.env.API_ENDPOINT

export default {
  name: 'VehicleForm',
  data() {
    return {
      vehicle: {
        model: '',
        make: '',
        registration: '',
        owner: this.$session.get('user')._id
      }
    }
  },
  methods: {
    save() {
      console.log(this.vehicle)

      let currVue = this
      fetch(apiHost + '/vehicle/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(currVue.vehicle)
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.status) currVue.$emit('saved', true)
          else M.toast({ html: 'Something bad happened. Please try again.' })
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
