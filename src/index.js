import EventEmitter from 'events'

const defaultOptions = {
  method: 'GET',
  headers: {}
}

/**
 * Streamers!
 * @class
 */
class Streamydoo extends EventEmitter {
  /**
   * @typedef Options
   * @prop {string} method - HTTP method
   * @prop {Object} headers - HTTP headers
   *
   * @constructor
   * @param {string} url
   * @param {Options} opts
   */
  constructor (url, opts = {}) {
    super()

    this.opts = Object.assign({}, defaultOptions, opts)
    this.url = url
    this.xhr = new XMLHttpRequest()
    this.seenBytes = 0

    this.xhr.addEventListener('error', console.error)
    this.setHeaders(this.opts.headers)

    // Open the XHR request
    this.open()
  }

  /**
   * Sets the request headers by giving an object of headers
   * @param {object} headers
   */
  setHeaders (headers) {
    Object.keys(headers).forEach(key => {
      this.xhr.setRequestHeader(key, headers[key])
    })
  }

  open () {
    this.xhr.open(this.opts.method, this.url)

    this.xhr.onreadystatechange = () => {
      const { readyState } = this.xhr

      // "Loading" with partial data, so a chunk
      if (readyState === 3) {
        // Just get the new stuff
        const newData = this.xhr.responseText.substr(this.seenBytes)

        // Emit the data event
        this.emit('data', newData)

        // Update pointer
        this.seenBytes = this.xhr.responseText.length
      } else if (readyState === 4) {
        // Request is done!
        this.emit('end', this.xhr.response)
      }
    }
  }

  /**
   * Send the XHR request
   * @param {any} [data]
   */
  send (data) {
    if (typeof data === 'object') {
      if (!this.opts.headers.hasOwnProperty('Content-Type') && !this.opts.headers.hasOwnProperty('content-type')) {
        this.xhr.setRequestHeader('Content-Type', 'application/json')
      }
      this.xhr.send(JSON.stringify(data))
    } else {
      this.xhr.send(data)
    }
  }
}

export default Streamydoo
