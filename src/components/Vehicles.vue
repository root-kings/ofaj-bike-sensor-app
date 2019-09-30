<template lang="pug">
  layout
    section#vehicles.section
      .row
        .col.s12.m3
          vehicle-list(:vehicles="vehicles" @selectVehicle="selectVehicle")
        .col.s12.m9
          .card-panel(v-if="showDashboard")
            .row
              .col.s12
                h4.center {{ selectedVehicle.make }} {{ selectedVehicle.model }}
              .col.s6.center
                h5.light Fuel
                v-gauge#fuelGauge.gauge(:height="gauge.height" :maxValue="100" :minValue="0" unit="%" :value="state.fuel")
              .col.s6.center
                h5.light Speed
                v-gauge#speedGauge.gauge(:height="gauge.height" :maxValue="200" :minValue="0" unit="kmph" :value="state.speed")
              .col.s12

                l-map#trackermap( :zoom="map.zoom" :center="[state.lat,state.lng]")
                  l-tile-layer(:url="map.url")
                  l-marker(:lat-lng="[state.lat,state.lng]")

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
      gauge: {
        height: '125px'
      },
      state: {
        speed: 0,
        fuel: 0,
        lat: 0,
        lng: 0
      },
      map: {
        zoom: 13,

        url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3J1c2huZGF5c2htb29raCIsImEiOiJjazBxaXloanowMjd0M2Jtc3dobTN0azV6In0.fxd0j10H7zXSH0aE3APu2g`
      },
      ticker: null,
      selectedVehicle: null
    }
  },
  computed: {
    showDashboard() {
      return this.selectedVehicle && true
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
      this.populateVehicles()
    },
    populateVehicles() {
      let currVue = this
      fetch(apiHost + '/user/' + currVue.$session.get('user')._id + '/vehicles')
        .then(resp => resp.json())
        .then(vehicles => (currVue.vehicles = vehicles))
        .catch(err => {
          console.error(err)
        })
    },
    selectVehicle(vehicleID) {
      let currVue = this
      fetch(apiHost + '/vehicle/' + vehicleID)
        .then(resp => resp.json())
        .then(data => {
          if (data.status) {
            currVue.selectedVehicle = data.vehicle
            this.setTicker()
          } else M.toast({ html: 'Vehicle not found.' })
        })
        .catch(err => {
          console.error(err)
        })
    },
    setTicker() {
      this.ticker = setInterval(this.fetchData, 1000)
    },
    fetchData() {
      let currVue = this
      fetch(apiHost + '/record/latest/' + currVue.selectedVehicle._id)
        .then(resp => resp.json())
        .then(record => {
          currVue.state = record
        })
    }
  },
  beforeDestroy() {
    clearInterval(this.ticker)
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
