import axios from 'axios'

const baseURL = process.env.REACT_APP_BASEURL

export const fetchapi = async (method = 'GET', apipath = '', body = {}) => {
  const url = `${baseURL}${apipath}`
  const formData = new FormData()
  for (let key in body) {
    formData.append(key, body[key])
  }

  try {
    const { data } = await axios({
      method,
      url,
      data: formData,
    })
    return data
  } catch (e) {
    throw e
  }
}
