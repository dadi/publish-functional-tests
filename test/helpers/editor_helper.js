'use strict'

// const {
//   expect
// } = require('chai')

class Editor extends Helper {
  async getPage () {
    return this.helpers['Puppeteer'].page
  }

  async setBoldText (locators) {
    let page = await this.getPage()

    await page.click(locators.bodyField.value)
    await page.keyboard.type('Bold')
    await page.keyboard.down('Shift')

    for (let i = 0; i < 'Bold'.length; i++) {
      await page.keyboard.press('ArrowLeft')
    }

    await page.keyboard.up('Shift')

    await page.click(locators.boldButton.value)
  }

  async getThePage () {
    console.log('this :', this)
    const browser = this.helpers['Puppeteer'].browser
    let x = await browser.pages() // List of pages in the browser

    const currentPage = this.helpers['Puppeteer'].page
    let y = await currentPage.url() // Get the url of the current page
    console.log('object :', x, y)
  }
}

module.exports = Editor
