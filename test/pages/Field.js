'use strict'

const {
  assert,
  expect
} = require('chai')

let I

module.exports = {

  _init() {
    I = require('../stepDefinitions/steps_file.js')()
  },

  // insert your locators and methods here
  locators: {
    footer: (locate('.//footer').as('Field Test Page Footer')),
    createNewButton: (locate('a').withText('Create new').as('Create New Button')),
    readOnly: (locate('div').withAttr({
      'data-field-name': 'stringReadonly'
    }).find('input').withAttr({
    'readonly': 'true'
    }).as('Read Only Field')),
    images: (locate('[class *= "MediaGridCard__wrapper___"]').as('Number of Images')),
    dropArea: (locate('[class *= "DropArea__droparea"]').as('Drop File Area')),
    fileUpload: (locate('input[class *= "FileUpload__file"]').as('File Upload')),
    firstImage: (locate('a[class *= "MediaGridCard__image-holder___"]').first().as('First Image')),
    stoneImage: (locate('img[src*="Stone.jpeg"]')),
    editImage: (locate('img[class *= "MediaEditor__image-preview___"]').as('Image Preview')),
    openNewWindow: (locate('a').withText('Open in new window').as('Open In New Window Link')),
    captionField: (locate('input').withAttr({
      'name': 'caption'
    }).as('Caption Field')),
    altTextField: (locate('input').withAttr({
      'name': 'altText'
    }).as('Alt Text Field')),
    copyrightField: (locate('input').withAttr({
      'name': 'copyright'
    }).as('Copyright Field')),
    saveButton: (locate('button').withText('Save').as('Save Button')),
    totalImages: (locate('.//strong[2]').as('Total Number of Images')),
    checkImage: (locate('input[class *= "MediaGridCard__select___"]').first().as('Select Image')),
    applyButton: (locate('button').withText('Apply').as('Apply Button')),
    selectDelete: (locate('.//select').as('Select Delete')),
    deleteButton: (locate('button').withText('Yes, delete it.').as('Delete Button')),
    nevermindButton: (locate('a').withText('Nevermind, back to document').as('Back to document'))
  },

  async validateFields() {
    await I.amOnPage('/field-test')
    I.wait(3)
    await I.waitForFunction(() => document.readyState === 'complete')
    // await I.waitForText('Media Library')
    await I.waitForElement(this.locators.footer)
    await I.seeElement(this.locators.createNewButton)
    // pause()
    await I.click(this.locators.createNewButton)
    await I.waitForFunction(() => document.readyState === 'complete')
    await I.seeInCurrentUrl('/field-test/new')
    await I.seeElement(this.locators.readOnly)
    // I.wait(3)
    // let images = await I.grabNumberOfVisibleElements(this.locators.images)
    // // console.log(images)
    // await I.seeNumberOfVisibleElements(this.locators.images, images)
    // await I.seeTotalGreaterThanZero(images)
    // await I.attachFile(this.locators.fileUpload, 'test/images/Stone.jpeg')
    // await I.waitForFunction(() => document.readyState === 'complete')
    // I.wait(2)
    // let newImages = await I.grabNumberOfVisibleElements(this.locators.images)
    // // console.log(newImages)
    // I.seeTotalHasIncreased(newImages, images)
    // await I.see('Stone.jpeg')
  }

}