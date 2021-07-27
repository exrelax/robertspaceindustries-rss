const axios = require('axios')
const cheerio = require('cheerio')

class DevTracker {
  constructor (config) {
    this.config = config
  }

  init () {
    const promises = []

    for (let i = 1; i <= this.config.pages; i++) {
      promises.push(this._requestSinglePage(i))
    }

    Promise.all(promises).then(results => {
      const htmlArray = results.map(singleResult => {
        console.log(singleResult.data.data)

        if (singleResult.data != null  &&
          singleResult.data.success === 1 &&
          singleResult.data.code === 'OK' &&
          singleResult.data.data != null &&
          typeof singleResult.data.data.html === 'string') {

          return singleResult.data.html
        }
      })

      console.log(htmlArray)
    })
  }

  _requestSinglePage (pageNumber) {
    return new Promise((resolve, reject) => {
      axios
        .post(this.config.requestUrl, {
          page: pageNumber
        })
        .then(result => {
          console.log(`statusCode: ${result.status}`)

          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

module.exports = DevTracker
