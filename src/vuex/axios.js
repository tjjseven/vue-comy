import axios from 'axios'
// import * as types from './types'

export const sendAjax = ({commit}, options) => {
  var result = ''
  axios({
    method: options.method,
    url: options.url,
    params: options.params || {}
  }).then((res) => {
    result = res
    // commit(types[options.mutationName], res.data.data)
  }).catch((err) => {
    if (err) {
      result = err
      // console.log(err)
    }
  })
  return result
}
