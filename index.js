const config = require('./config')
const cheerio = require('cheerio')
// const puppeteer = require('puppeteer')

class Index {
  constructor () {
    this._params = process.argv.slice(2)
  }

  init () {
    console.log(this._params)

    const source = config.sources[0]

    config.sources.forEach((source) => {
      const { moduleName } = source

      const Module = require('./src/' + moduleName + '.js')

      if (Module == null || typeof Module !== 'function') {
        return
      }

      const module = new Module(source)

      if (module.init) {
        module.init()
      }
    })

    /*
    puppeteer
      .launch()
      .then(function(browser) {
        return browser.newPage();
      })
      .then(function(page) {
        return page.goto(source.url).then(function() {
          return page.content();
        });
      })
      .then(this.parse.bind(this))
      .catch(function(err) {
        //handle error
      });
     */
  }

  parse (html) {
    console.log('parse')

    try {
      const $ = cheerio.load(html)
      const boxes = $('.devtracker-list > a')
      console.log('length', boxes.toString())
    } catch (e) {
      console.log(e)
    }

  }
}

module.exports = new Index().init()
