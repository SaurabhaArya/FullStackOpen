import axios from 'axios'

const baseUrl = "http://localhost:3004/persons"

const getPersons = () => {
    return axios
        .get(baseUrl)
        .then(resp => resp.data)
        .catch('GET Failed')
}

const addPerson = (newPerson) => {
    return axios
        .post(baseUrl, newPerson)
        .then(resp => resp.data)
        .catch('POST Failed')
}

const updatePerson = (id, person) => {
    return axios
        .put(`${baseUrl}/${id}`, person)
        .then(resp => resp.data)
        .catch('PUT Failed')
}

const deletePerson = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(resp => resp.data)
        .catch('DELETE Failed')
}

export default { getPersons, addPerson, updatePerson, deletePerson }