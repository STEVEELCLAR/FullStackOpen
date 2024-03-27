import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = newObject => {
  console.log("here",newObject)
  return axios.delete(newObject)
}

export default { getAll, create, remove}