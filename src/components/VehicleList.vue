<template lang="pug">
  .collection
    a.collection-item(v-for="vehicle in vehicles", :key="vehicle._id") {{ vehicle.make }} {{ vehicle.model }}
</template>

<script>
export default {
  name: 'VehicleList',
  props: ['vehicles']
}
</script>
<!-- styling for the component -->
<style></style>
