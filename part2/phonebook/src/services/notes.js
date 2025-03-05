import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
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

export default { getAll, create, deleteId, changeNumber }