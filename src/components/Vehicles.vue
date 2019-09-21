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
                v-gauge#fuelGauge.gauge(:height="gauge.height" :maxValue="100" :minValue="0" unit="%" :value="selectedVehicle.fuel")
              .col.s6.center
                h5.light Speed
                v-gauge#speedGauge.gauge(:height="gauge.height" :maxValue="200" :minValue="0" unit="kmph" :value="selectedVehicle.speed")
              .col.s12

                l-map#trackermap( :zoom="map.zoom" :center="location")
                  l-tile-layer(:url="map.url")
                  l-marker(:lat-lng="location")

    .modal#vehicleFormModal(ref="vehicleFormModal")
      .modal-content
        vehicle-form(ref="vehicleForm" @saved="handleSaved")
    .fixed-action-btn
      .btn-floating.btn-large.red.waves-effect.waves-light(@click="showVehicleForm")
        i.large.material-icons add

</template>

<script>
import M from 'materialize-css'

import Layout from '@/components/Layout'

import VehicleList from '@/components/VehicleList'
import VehicleForm from '@/components/VehicleForm'

import VGauge from 'vgauge'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const apiHost = process.env.API_ENDPOINT

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Vehicles',
  components: {
    Layout,
    VehicleList,
    VehicleForm,
    VGauge,
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      vehicles: [],
      selectedVehicle: {
        speed: 35,
        fuel: 45,
        lat: 21.125509,
        lng: 79.022119
      },

      gauge: {
        height: '125px'
      },
      map: {
        zoom: 13,

        url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3J1c2huZGF5c2htb29raCIsImEiOiJjazBxaXloanowMjd0M2Jtc3dobTN0azV6In0.fxd0j10H7zXSH0aE3APu2g`
      }
    }
  },
  computed: {
    location() {
      return [this.selectedVehicle.lat, this.selectedVehicle.lng]
    }
  },
  mounted() {
    this.vehicleFormModal = M.Modal.init(this.$refs.vehicleFormModal)

    this.populateVehicles()
  },
  methods: {
    showVehicleForm() {
      this.vehicleFormModal.open()
    },
    handleSaved(status) {
      if (status) this.vehicleFormModal.close()
    },
    populateVehicles() {
      let currVue = this
      fetch(apiHost + '/user/' + currVue.$session.get('user')._id + '/vehicles')
        .then(resp => resp.json())
        .then(vehicles => (currVue.vehicles = vehicles))
        .catch(err => {
          console.error(err)
        })
    }
  }
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
