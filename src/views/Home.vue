<template>
  <div>
    <div class="option">
      <div class="shadow">
        <button @click="Logout">登出</button>
      </div>
      <GoogleSignInButton @sign-in="oAuthSignIn('google', $event)" width="500" height="300"/>
      <twzipcode @getMap="assignMap"/>
      <input type="radio" id="true" :value="true" v-model="layerChecked">
      <label for="true">會眾圖層優先</label>
      <br>
      <input type="radio" id="false" :value="false" v-model="layerChecked">
      <label for="false">鄉里圖層優先</label>
    </div>
    <div v-show="isMap" :style="position" ref="info-box" id="info-box">?</div>
    <!-- <div ref="map" id="map"></div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import {Loader} from 'google-maps'
import twzipcode from '../components/twzipcode'
import GoogleSignInButton from '../components/googleSigninButton.vue'
// const api_revised = require('../utils/api_revised.json')
export default {
  name: 'Home',
  components: {
    twzipcode,
    GoogleSignInButton
  },
  data() {
    return {
      map: null,
      isMap: false,
      checked: false,
      infoBoxColor: {

      },
      position: {
        top: 0,
        left: 0,
        'border-color': '',
        'background-color': ''
      },
      publicPath: process.env.BASE_URL,
      towns: ['岡山區', '路竹區', '湖內區', '茄萣區', '南區', '永安區', '阿蓮區']
    }
  },
  computed: {
    layerChecked: {
      get() {
        return this.checked
      },
      set(val) {
        this.checked = Boolean(val)
        this.setStyle(Boolean(val))
      }
    },
    geoJson() {
      return this.$store.state.map.data
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
    await this.setInfoBox()
    window.document.body.addEventListener('mousemove', this.infoBoxPosition)
  },
  destroyed () {
    window.document.body.removeEventListener('mousemove', this.infoBoxPosition)
  },
  methods: {
    async oAuthSignIn(provider, id_token) {
      try {
        await this.$store.dispatch('oAuthLogin', {
          provider,
          id_token
        });
        this.$emit('submit');
      } catch (error) {
        console.error(error);
      }
    },
    async Logout() {
      try {
        const isLogout = window.confirm('確定要登出');
        if (isLogout) {
          const auth2 = window.gapi.auth2.getAuthInstance();
          auth2.signOut().then(() => {
            console.log('Google User signed out.');
          });
          // 可以在這個時候移除 cookie
          window.alert('已登出');
          this.$router.push({ name: 'Signin' }); // 回到登入頁
        }
      } catch (error) {
        if (error instanceof Error) {
          window.alert(error.messages);
        } else {
          window.alert(error.detail);
        }
      }
    },
    infoBoxPosition(e) {
      if (this.isMap) {
        this.position.top = `${e.offsetY +40}px`
        this.position.left = `${e.offsetX +20}px`
      }
    },
    async setInfoBox() {
      const infoBox = this.$refs['info-box']
      await this.map.data.addListener("mouseover", event => {
        this.isMap = true
        this.map.data.revertStyle()
        this.map.data.overrideStyle(event.feature, { strokeWeight: 8 });
        if (event.feature.getProperty("TV_ALL")) {
          infoBox.textContent = event.feature.getProperty("TV_ALL")
        } else {
          infoBox.textContent = event.feature.getProperty("Name")
        }
      });
      await this.map.data.addListener("mouseout", () => {
        this.map.data.revertStyle();
        this.isMap = false
      });
    },
    async initMap () {
      await this.map.data.loadGeoJson(`${this.publicPath}api_revised.json`)
      await this.map.data.loadGeoJson(`${this.publicPath}luzhu.json`)
      await this.map.data.loadGeoJson(`${this.publicPath}luzhu_min.json`)
      await this.map.data.loadGeoJson(`${this.publicPath}gangshan.json`)
      await this.setStyle(false)
    },
    async assignMap () {
      await this.map.data.addGeoJson(JSON.parse(JSON.stringify(this.geoJson)))
      await this.setStyle(false)
    },
    async setStyle(index) {
      this.map.data.setStyle( feature => {
        const TOWN = String(feature.j.TOWN)
        if (this.towns.find(town => town === TOWN)) {
          switch (TOWN) {
            case '岡山區':
              this.position['border-color'] = '#8F1818'
              this.position['background-color'] = '#F45151'
              this.position['color'] = '#fff'
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
              this.position['color'] = '#fff'
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
              this.position['color'] = '#fff'
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
              this.position['color'] = '#fff'
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
              this.position['color'] = '#fff'
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
              this.position['color'] = '#fff'
              return {
                strokeWeight: 1,
                strokeOpacity: .5,
                strokeColor: '#7D440C',
                fillColor: '#F4A351',
                fillOpacity: .35
              }
            case '阿蓮區':
              this.position['border-color'] = '#909710'
              this.position['background-color'] = '#C0C605'
              this.position['color'] = '#fff'
              return {
                strokeWeight: 1,
                strokeOpacity: .5,
                strokeColor: '#909710',
                fillColor: '#C0C605',
                fillOpacity: .35
              }
            }
          } else {
            if (feature.j.Name) {
              switch (feature.j.Name) {
                case '岡山會眾區域': 
                  this.position['border-color'] = '#C14242'
                  this.position['background-color'] = '#fff'
                  this.position['color'] = '#C14242'
                  return {
                  strokeWeight: 5,
                  strokeOpacity: index ? 1 : 0.3,
                  fillOpacity: .35,
                  strokeColor: index ? 'red' : '#000',
                  fillColor: index ? 'red' : '#fff',
                  zIndex: index ? 5 : 0
                }
                case '路竹閩南語會眾區域': 
                  this.position['border-color'] = '#3F59BF'
                  this.position['background-color'] = '#fff'
                  this.position['color'] = '#3F59BF'
                  return {
                  strokeWeight: 5,
                  strokeOpacity: index ? 1 : 0.3,
                  fillOpacity: .35,
                  strokeColor: index ? 'blue' : '#000',
                  fillColor: index ? 'blue' : '#fff',
                  zIndex: index ? 5 : 0
                }
                case '路竹會眾區域': 
                  this.position['border-color'] = '#20790A'
                  this.position['background-color'] = '#fff'
                  this.position['color'] = '#20790A'
                  return {
                  strokeWeight: 5,
                  strokeOpacity: index ? 1 : 0.3,
                  fillOpacity: .35,
                  strokeColor: index ? 'green' : '#000',
                  fillColor: index ? 'green' : '#fff',
                  zIndex: index ? 5 : 0
                }
              }
            }
              
          }
      })
    }
  }
}
</script>

<style lang="scss">
  #map {
    height: calc(100vh - 100px);
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
.option {
  height: 82px;
  width: 100%;
}
</style>
