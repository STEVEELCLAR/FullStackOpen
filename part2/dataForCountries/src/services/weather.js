import axios from 'axios'

const getAll = (lat,lon) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eb30f0e304f543638c66b07ae4937217`)
}

export default { getAll}