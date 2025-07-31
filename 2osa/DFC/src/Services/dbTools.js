import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const APIkey = import.meta.env.VITE_SOME_KEY

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`)
  return request.then(response => Array.from(response.data))
}

const callWeather = (latitude, longitude) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`)
  return request.then(response => response.data)
}

export default { getAll, callWeather }