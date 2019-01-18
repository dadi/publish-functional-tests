'use strict'

const DADIAPI = require('@dadi/api-wrapper')
const http = require('http')
const promiseQueue = require('js-promise-queue')

const config = {
  api: {
    protocol: 'http',
    host: process.env.API_HOST,
    port: process.env.API_PORT,
    credentials: {
      clientId: process.env.API_CLIENT_ID,
      secret: process.env.API_CLIENT_SECRET
    }
  }
}

function getApi () {
  return new DADIAPI({
    uri: config.api.protocol + '://' + config.api.host,
    port: config.api.port,
    credentials: {
      clientId: config.api.credentials.clientId,
      secret: config.api.credentials.secret
    },
    version: '1.0',
    database: 'cloud'
  })
}

class Data extends Helper {
  async createClient(id, secret, selectedResources) {
    let client = {
      clientId: id,
      secret: secret
    }

    let api = getApi()

    await api
      .inClients()
      .create(client)
      .then(doc => {
        return this.getToken()
          .then(result => {
            this.addResources(JSON.parse(result).accessToken, client, selectedResources).then(result => {
              // console.log('result :', result)
            })
          })
      }).catch(err => {
        console.log('! Error:', err)
      })
  }

  async deleteClient (id) {
    let api = getApi()

    await api
      .inClients()
      .whereClientIs(id)
      .delete()
      .then(() => {
        // console.log('Deleted ' + id)
      }).catch(_err => {
        // console.log('! Error:', err)
      })
  }

  async deleteArticleByTitle (title) {
    let api = getApi()

    await api
      .in('articles')
      .whereFieldIsEqualTo('title', title)
      .delete()
      .then(() => {
        // console.log('Deleted ' + title)
      }).catch(err => {
        console.log('! Error:', err)
      })
  }

  async deleteFieldTestBooleans() {
    let api = getApi()

    await api
      .in('field-test-boolean')
      .whereFieldExists('boolRequired')
      .delete()
      .then(() => {
        // console.log('Deleted ' + title)
      }).catch(err => {
        console.log('! Error:', err)
      })
  }

  async deleteFieldTestDates() {
    let api = getApi()

    await api
      .in('field-test-date')
      .whereFieldExists('dateRequired')
      .delete()
      .then(() => {
        // console.log('Deleted ' + title)
      }).catch(err => {
        console.log('! Error:', err)
      })
  }

  async deleteFieldTestNumbers() {
    let api = getApi()

    await api
      .in('field-test-number')
      .whereFieldExists('numberRequired')
      .delete()
      .then(() => {
        // console.log('Deleted ' + title)
      }).catch(err => {
        console.log('! Error:', err)
      })
  }

  getToken () {
    let postData = JSON.stringify(config.api.credentials)
    // console.log("THIS" + postData)

    let options = {
      hostname: config.api.host,
      port: config.api.port,
      path: `/token`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return this.makeRequest({ options, data: postData })
  }

  async getSessionToken (id, secret) {
    let postData = JSON.stringify({
      clientId: id,
      secret: secret
    })

    let options = {
      hostname: config.api.host,
      port: config.api.port,
      path: `/token`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return this.makeRequest({ options, data: postData })
  }

  addResources(accessToken, client, selectedResources) {
    let options = {
      hostname: config.api.host,
      port: config.api.port,
      path: `/api/clients/${client.clientId}/resources`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }

    let resourceList = selectedResources || [
      'collection:cloud_articles',
      'media:mediaStore',
      'collection:cloud_team',
      'collection:cloud_categories',
      'collection:cloud_sub-categories',
      'collection:cloud_web-services',
      'collection:cloud_network-services',
      'collection:cloud_field-test-boolean',
      'collection:cloud_field-test-date',
      'collection:cloud_field-test-media',
      'collection:cloud_field-test-number',
      'collection:cloud_field-test-other',
      'collection:cloud_field-test-reference',
      'collection:cloud_field-test-string'
    ]
    let resources = []

    resourceList.forEach(resource => {
      resources.push({
        options: options,
        data: JSON.stringify({
          name: resource,
          access: {
            create: true,
            delete: true,
            read: true,
            update: true
          }
        })
      })
    })

    return promiseQueue(resources, this.makeRequest, {
      interval: 300
    })
  }

  makeRequest (obj) {
    return new Promise((resolve, reject) => {
      let req = http.request(obj.options, (res) => {
        // console.log(`STATUS: ${res.statusCode}`)
        // console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
        let data = ''

        res.setEncoding('utf8')
        res.on('data', chunk => {
          data += chunk
        })

        res.on('end', () => {
          return resolve(data)
        })
      })

      req.on('error', e => {
        console.error(`problem with request: ${e.message}`)
        return reject(e)
      })

      if (obj.data) {
        // write data to request body
        req.write(obj.data)
      }

      req.end()
    })
  }
}

module.exports = Data
