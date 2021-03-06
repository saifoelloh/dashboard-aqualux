import axios from 'axios'

const baseURL = process.env.REACT_APP_BASEURL

export const fetchapi = async (method = 'GET', apipath = '', body = {}) => {
  const url = `${baseURL}${apipath}`

  try {
    const { data } = await axios({ method, url, data: body })
    return data
  } catch (e) {
    throw e
  }
}
