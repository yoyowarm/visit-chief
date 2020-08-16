<template>
  <div ref="map" id="map">
  </div>
</template>

<script>
// @ is an alias to /src
import {Loader} from 'google-maps'
// const api_revised = require('../utils/api_revised.json')
export default {
  name: 'Home',
  data() {
    return {
      map: null,
      publicPath: process.env.BASE_URL,
      towns: ['岡山區', '路竹區', '湖內區', '茄萣區', '南區', '永安區']
    }
  },
  async mounted() {
    const loader = new Loader('AIzaSyBajzS_o0383vmY7QYkE9hJ4coL2-khRGs')
    const google = await loader.load()
    this.map =  new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 22.879346, lng: 120.248056 }
      });
      await this.initMap()
  },
  methods: {
    initMap() {
      this.map.data.loadGeoJson(`${this.publicPath}api_revised.json`)
      this.map.data.setStyle( feature => {
        console.log(feature.j.TOWN)
        const TOWN = String(feature.j.TOWN)
        if (this.towns.find(town => town === TOWN)) {
          if (TOWN === '岡山區') {
            return {
              strokeWeight: 1,
              strokeOpacity: .5,
              strokeColor: '#f00',
              fillColor: '#F45151',
              fillOpacity: .35
            }
          }
          if (TOWN === '路竹區') {
            return {
              strokeWeight: 1,
              strokeOpacity: .5,
              strokeColor: '#f00',
              fillColor: '#51F4A3',
              fillOpacity: .35
            }
          }
          if (TOWN === '茄萣區') {
            return {
              strokeWeight: 1,
              strokeOpacity: .5,
              strokeColor: '#f00',
              fillColor: '#51F4F4',
              fillOpacity: .35
            }
          }
          if (TOWN === '湖內區') {
            return {
              strokeWeight: 1,
              strokeOpacity: .5,
              strokeColor: '#f00',
              fillColor: '#F451F4',
              fillOpacity: .35
            }
          }
          if (TOWN === '永安區') {
            return {
              strokeWeight: 1,
              strokeOpacity: .5,
              strokeColor: '#f00',
              fillColor: '#5177F4',
              fillOpacity: .35
            }
          }
          if (TOWN === '南區') {
            return {
              strokeWeight: 1,
              strokeOpacity: .5,
              strokeColor: '#f00',
              fillColor: '#F4A351',
              fillOpacity: .35
            }
          }
        }
        
      });
      // var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      // var locations = [
      //     { lat: 22.879346, lng: 120.248056 }
      // ]
      // var markers = locations.map(function(location, i) {
      //     return new google.maps.Marker({
      //         position: location,
      //         label: 'dfff'
      //     });
      // })
    }
  }
}
</script>

<style lang="scss">
  #map {
    height:800px;
    width: 100%;
  }
</style>
