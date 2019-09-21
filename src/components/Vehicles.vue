<template lang="pug">
  layout
    section#vehicles.section
      .row
        .col.s12.m3
          vehicle-list(:vehicles="vehicles")
        .col.s12.m9
          .card-panel
            .row
              .col.s6.center
                h5.light Fuel
                v-gauge#fuelGauge.gauge(:height="gauge.height" :maxValue="100" :minValue="0" unit="%" :value="fuel")
              .col.s6.center
                h5.light Speed
                v-gauge#speedGauge.gauge(:height="gauge.height" :maxValue="200" :minValue="0" unit="kmph" :value="speed")
              .col.s12

                l-map#trackermap( :zoom="map.zoom" :center="map.center")
                  l-tile-layer(:url="map.url")
                  l-marker(:lat-lng="map.center")

</template>

<script>
import Layout from '@/components/Layout'
import VehicleList from '@/components/VehicleList'
import VGauge from 'vgauge'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Vehicles',
  components: { Layout, VehicleList, VGauge, LMap, LTileLayer, LMarker },
  data: () => {
    return {
      vehicles: [
        { model: 'Veyron', make: 'Bugatti', _id: 1 },
        { model: '525i', make: 'BMW', _id: 2 },
        { model: 'SLS', make: 'Mercedes AMG', _id: 3 },
        { model: 'A8', make: 'Audi', _id: 4 }
      ],
      speed: 35,
      fuel: 45,
      gauge: {
        height: '125px'
      },
      map: {
        zoom: 13,
        center: [21.125509, 79.022119],
        url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3J1c2huZGF5c2htb29raCIsImEiOiJjazBxaXloanowMjd0M2Jtc3dobTN0azV6In0.fxd0j10H7zXSH0aE3APu2g`
      }
    }
  },
  mounted: () => {}
}
</script>
<!-- styling for the component -->
<style>
.gauge {
  text-align: center;
}
.gauge-title {
  width: 100%;
}
#trackermap {
  height: 300px;
  width: 100%;
}
</style>
