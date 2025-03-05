import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    return axios.get(`${baseUrl}/all`).then(response => response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const deleteId = id => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const changeNumber = (repeatedPerson, newPhone) => {
    const changedPerson = {...repeatedPerson, number: newPhone}
    return axios.put(`${baseUrl}/${repeatedPerson.id}`, changedPerson).then(response => response.data)
}

const getWeather = (Capital) => {
    return axios.get(`${weatherUrl}${Capital}&appid=${api_key}&units=metric`).then(response => response.data)
}

export default { getAll, create, deleteId, changeNumber, getWeather }