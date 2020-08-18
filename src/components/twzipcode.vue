<template>
  <div>
    <select v-model="selected.county">
    <option v-for="(option, index) in county" :value="option" :key="option" :selected="index === 0">
      {{ option }}
    </option>
    </select> 
    <select v-model="selected.town">
      <option v-for="(option, index) in town[selected.county]" :value="option" :key="option" :selected="index === 0">
        {{ option }}
      </option>
    </select>
    <button @click="searchMap">搜尋</button>
  </div>
</template>

<script>
import data from '../utils/twzipcode'
export default {
  data () {
    return {
      county: data.county,
      town: data.town,
      selected: {
        county: '',
        town: ''
      }
    }
  },
  methods: {
    async searchMap() {
      const data = {
        county: this.selected.county,
        town: this.selected.town
      }
      await this.$store.dispatch('getMap', data)
      this.$emit('getMap')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>