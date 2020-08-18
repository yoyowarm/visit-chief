import axios from 'axios'

function createInstance (baseURL, opts = {}) {
    const request = axios.create({
      baseURL: baseURL,
      ...opts
    })
    return request
}
export const request = createInstance(process.env.VUE_APP_API_URL, {
})

export default request