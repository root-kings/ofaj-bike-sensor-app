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
                input#username.validate(type="text")
                label(for="username") Username
            
              .input-field.col.s12
                input#password.validate(type="password")
                label(for="password") Password
            
            .row
              .col.s12
                .btn-large.full-width.blue Login

            .row
              .col.s12.center
                .btn-flat.full-width(@click="") Forgot Password

</template>

<script>
export default {
  name: 'Login'
}
</script>
<!-- styling for the component -->
<style></style>
