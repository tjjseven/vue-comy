import axios from 'axios'
// import * as types from './types'

export const sendAjax = ({commit}, options) => {
  axios({
    method: options.method,
    url: options.url,
    params: options.params || {}
  }).then((res) => {
    // console.log(res.data.data)
    // commit(types[options.mutationName], res.data.data)
  }).catch((err) => {
    if (err) {
      // console.log(err)
    }
  })
}
