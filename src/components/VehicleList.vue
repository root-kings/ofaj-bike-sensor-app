<template lang="pug">
  .collection
    a.collection-item(@click="$emit('selectVehicle', vehicle._id)" v-for="vehicle in vehicles", :key="vehicle._id") {{ vehicle.make }} {{ vehicle.model }} - {{ vehicle.registration }}
</template>

<script>
export default {
  name: 'VehicleList',
  props: ['vehicles']
}
</script>
<!-- styling for the component -->
<style></style>
