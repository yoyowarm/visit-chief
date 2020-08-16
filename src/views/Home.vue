<template>
  <div>
    <div :style="position" ref="info-box" id="info-box">?</div>
    <div ref="map" id="map">
  </div>
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
      isMap: false,
      infoBoxColor: {

      },
      position: {
        top: 0,
        left: 0,
        'border-color': '',
        'background-color': ''
      },
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
  window.document.body.addEventListener('mousemove', this.infoBoxPosition)
  },
  methods: {
    infoBoxPosition(e) {
      if (this.isMap) {
        this.position.top = `${e.offsetY +40}px`
        this.position.left = `${e.offsetX +20}px`
      }
    },
    async initMap() {
      await this.map.data.loadGeoJson(`${this.publicPath}api_revised.json`)
      await this.map.data.loadGeoJson(`${this.publicPath}luzhu.json`)
      this.map.data.setStyle( feature => {
        const TOWN = String(feature.j.TOWN)
        if (this.towns.find(town => town === TOWN)) {
          switch (TOWN) {
            case '岡山區':
              this.position['border-color'] = '#8F1818'
              this.position['background-color'] = '#F45151'
              return {
              strokeWeight: 1,
              strokeOpacity: .5,
              strokeColor: '#8F1818',
              fillColor: '#F45151',
              fillOpacity: .35
            }
            case '路竹區':
              this.position['border-color'] = '#173E08'
              this.position['background-color'] = '#3C8B1C'
              return {
                strokeWeight: 1,
                strokeOpacity: .5,
                strokeColor: '#173E08',
                fillColor: '#3C8B1C',
                fillOpacity: .35
              }
            case '茄萣區':
              this.position['border-color'] = '#064545'
              this.position['background-color'] = '#08C3C3'
              return {
                strokeWeight: 1,
                strokeOpacity: .5,
                strokeColor: '#064545',
                fillColor: '#08C3C3',
                fillOpacity: .35
              }
            case '湖內區':
              this.position['border-color'] = '#f00'
              this.position['background-color'] = '#F451F4'
              return {
                strokeWeight: 1,
                strokeOpacity: .5,
                strokeColor: '#f00',
                fillColor: '#F451F4',
                fillOpacity: .35
              }
            case '永安區':
              this.position['border-color'] = '#5177F4'
              this.position['background-color'] = '#5177F4'
              return {
                strokeWeight: 1,
                strokeOpacity: .5,
                strokeColor: '#5177F4',
                fillColor: '#5177F4',
                fillOpacity: .35
              }
            case '南區':
              this.position['border-color'] = '#7D440C'
              this.position['background-color'] = '#F4A351'
              return {
                strokeWeight: 1,
                strokeOpacity: .5,
                strokeColor: '#7D440C',
                fillColor: '#F4A351',
                fillOpacity: .35
              }
            }
          } else {
              this.position['border-color'] = '#000'
              this.position['background-color'] = '#fff'
            return {
              strokeWeight: 2,
              strokeOpacity: .5,
              // strokeColor: '#f00',
              // fillColor: '#F4A351',
              fillOpacity: .35
            }
          }
      })
      const infoBox = this.$refs['info-box']
      await this.map.data.addListener("mouseover", event => {
        this.isMap = true
        this.map.data.revertStyle()
        this.map.data.overrideStyle(event.feature, { strokeWeight: 8 });
        infoBox.textContent = event.feature.getProperty(
          "TV_ALL"
        );
      });
      await this.map.data.addListener("mouseout", () => {
        this.map.data.revertStyle();
        this.isMap = false
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
  #info-box {
    font-weight: 600;
    border-radius: 10px;
    background-color: white;
    border: 1px solid black;
    color: #fff;
    bottom: 30px;
    height: 20px;
    padding: 10px;
    position: absolute;
    left: 30px;
    z-index: 999;
  }
</style>
