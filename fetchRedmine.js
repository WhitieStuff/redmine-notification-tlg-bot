const axios = require('axios')
const key = '***'

const fetchRedmine = async (query = 'query_id=863') => {
const url = `https://tracker.egamings.com/issues.json?key=${key}&${query}`
console.log(`Fetching ${url}`)
    try {
        const response = await axios.get(url)
        let result = {
          status: 'Ok',
          data: response.data
        }
        console.log(`Status: ${result.status}`)
        return result 
    } catch (err) {
        let result = {
          status: 'Error',
          data: err
        }
        console.log(`Status: ${result.status}`)
        console.log(`Error: ${err}`)
        return result 
    }
}

module.exports = fetchRedmine