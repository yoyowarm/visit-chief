import request from '../utils/request'

export async function getMaps(county, town) {
  return (
    await request('/map', {
      params : {
          county,
          town
      }
    })
  )
}