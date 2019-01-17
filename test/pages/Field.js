'use strict'

const {
  assert,
  expect
} = require('chai')
const moment = require('moment')

let I

module.exports = {

  _init() {
    I = require('../stepDefinitions/steps_file.js')()
  },

  // insert your locators and methods here
  locators: {
    footer: (locate('.//footer').as('Field Test Page Footer')),
    createNewButton: (locate('a').withText('Create new').as('Create New Button')),
    boolReq: (locate('div').withAttr({
      'data-field-name': 'boolRequired'
    }).find('input').withAttr({
      'name': 'boolRequired'
    }).as('A boolean')),
    boolReadOnly: (locate('div').withAttr({
      'data-field-name': 'boolReadOnly'
    }).find('input').withAttr({
      'name': 'boolReadOnly'
    }).as('Read-only boolean')),
    dateReq: (locate('div').withAttr({
      'data-field-name': 'dateRequired'
    }).find('input').withAttr({
      'name': 'dateRequired'
    }).as('A date')),
    dateReqError: (locate('div').withAttr({
      'data-field-name': 'dateRequired'
    }).find('p').withText('This field must be specified').as('Required Field Error Message')),
    dateReadOnly: (locate('div').withAttr({
      'data-field-name': 'dateReadOnly'
    }).find('input').withAttr({
      'name': 'dateReadOnly'
    }).as('Read-only date')),
    dateFuture: (locate('div').withAttr({
      'data-field-name': 'dateFuture'
    }).find('input').withAttr({
      'name': 'dateFuture'
    }).as('A future date')),
    dateFutureError: (locate('div').withAttr({
      'data-field-name': 'dateFuture'
    }).find('p').withText('This field must be after').as('Future Date Error Message')),
    datePast: (locate('div').withAttr({
      'data-field-name': 'datePast'
    }).find('input').withAttr({
      'name': 'datePast'
    }).as('A past date')),
    datePastError: (locate('div').withAttr({
      'data-field-name': 'datePast'
    }).find('p').withText('This field must be before').as('Past Date Error Message')),
    dateAfter: (locate('div').withAttr({
      'data-field-name': 'dateAfter'
    }).find('input').withAttr({
      'name': 'dateAfter'
    }).as('A date after x')),
    dateAfterError: (locate('div').withAttr({
      'data-field-name': 'dateAfter'
    }).find('p').withText('This field must be after Mon Jan 01 2018 00:00:00').as('A Date After Error Message')),
    dateBefore: (locate('div').withAttr({
      'data-field-name': 'dateBefore'
    }).find('input').withAttr({
      'name': 'dateBefore'
    }).as('A date before x')),
    dateBeforeError: (locate('div').withAttr({
      'data-field-name': 'dateBefore'
    }).find('p').withText('This field must be before Mon Jan 01 2018 00:00:00').as('A Date Before Error Message')),
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
    saveMenu: (locate('button[class*="ButtonWithOptions__launcher"]').as('Save Menu')),
    saveGoBack: (locate('button').withText('Save and go back').as('Save And Go Back Button')),
    saveContinue: (locate('button').withText('Save and continue').as('Save And Continue Button')),
    totalImages: (locate('.//strong[2]').as('Total Number of Images')),
    checkImage: (locate('input[class *= "MediaGridCard__select___"]').first().as('Select Image')),
    applyButton: (locate('button').withText('Apply').as('Apply Button')),
    selectDelete: (locate('.//select').as('Select Delete')),
    deleteButton: (locate('button').withText('Yes, delete it.').as('Delete Button')),
    nevermindButton: (locate('a').withText('Nevermind, back to document').as('Back to document')),
    boolYes: (locate('span[class*="FieldBoolean__enabled"]').withText('Yes').as('Yes')),
    boolNo: (locate('span[class*="FieldBoolean__disabled"]').withText('No').as('No'))
  },

  async validateBoolean() {
    await I.amOnPage('/field-testing/field-test-boolean')
    I.wait(3)
    await I.waitForFunction(() => document.readyState === 'complete')
    await I.waitForElement(this.locators.footer)
    await I.seeElement(this.locators.createNewButton)
    await I.click(this.locators.createNewButton)
    await I.waitForFunction(() => document.readyState === 'complete')
    await I.seeInCurrentUrl('/field-test-boolean/new')
    await I.seeElement(this.locators.boolReq)
    await I.seeElement(this.locators.boolReadOnly)
    await I.click(this.locators.boolReq)
    await I.click(this.locators.saveMenu)
    await I.click(this.locators.saveGoBack)
    await I.waitForText('The document has been created', 3)
    await I.dontSeeInCurrentUrl('/new')
    await I.waitForVisible(this.locators.boolYes)
    await I.seeElement(this.locators.boolNo)
  },

  async deleteAllBooleans() {
    await I.deleteFieldTestBooleans()
  },

  async validateDate() {
    await I.amOnPage('/field-testing/field-test-date')
    I.wait(3)
    await I.waitForFunction(() => document.readyState === 'complete')
    await I.waitForElement(this.locators.footer)
    await I.seeElement(this.locators.createNewButton)
    await I.click(this.locators.createNewButton)
    await I.waitForFunction(() => document.readyState === 'complete')
    await I.seeInCurrentUrl('/field-test-date/new')
    await I.seeElement(this.locators.dateReq)
    await I.seeElement(this.locators.dateReadOnly)
    await I.seeElement(this.locators.dateFuture)
    await I.seeElement(this.locators.datePast)
    await I.seeElement(this.locators.dateAfter)
    await I.seeElement(this.locators.dateBefore)
    await I.click(this.locators.saveContinue)
    await I.waitForText('Document failed to save', 3)
    await I.waitForVisible(this.locators.dateReqError)
    var formattedDate = moment(new Date()).format('YYYY/MM/DD 09:00')
    // console.log(formattedDate)
    await I.fillField(this.locators.dateReq, formattedDate)
    var futureDateErr = moment(new Date(), 'YYYY/MM/DD').subtract(2, 'day')
    futureDateErr = futureDateErr.format('YYYY/MM/DD 09:00')
    // console.log(futureDateErr)
    await I.fillField(this.locators.dateFuture, futureDateErr)
    var pastDateErr = moment(new Date(), 'YYYY/MM/DD').add(2, 'day')
    pastDateErr = pastDateErr.format('YYYY/MM/DD 09:00')
    // console.log(pastDateErr)
    await I.fillField(this.locators.datePast, pastDateErr)
    await I.fillField(this.locators.dateAfter, '2018/01/01 09:00')
    var dateBefore = moment(new Date()).format('YYYY/MM/DD 09:00')
    await I.fillField(this.locators.dateBefore, dateBefore)
    await I.click(this.locators.saveContinue)
    await I.waitForText('Document failed to save', 3)
    await I.waitForVisible(this.locators.dateFutureError)
    await I.waitForVisible(this.locators.datePastError)
    await I.waitForVisible(this.locators.dateAfterError)
    await I.waitForVisible(this.locators.dateBeforeError)
    await I.fillField(this.locators.dateFuture, '')
    var futureDate = moment(new Date(), 'YYYY/MM/DD').add(2, 'day')
    futureDate = futureDate.format('YYYY/MM/DD 09:00')
    // console.log(futureDate)
    await I.fillField(this.locators.dateFuture, futureDate)
    await I.fillField(this.locators.datePast, '')
    var pastDate = moment(new Date(), 'YYYY/MM/DD').subtract(2, 'day')
    pastDate = pastDate.format('YYYY/MM/DD 09:00')
    // console.log(pastDate)
    await I.fillField(this.locators.datePast, pastDate)
    await I.fillField(this.locators.dateAfter, '')
    await I.fillField(this.locators.dateAfter, '2018/01/02 09:00')
    await I.fillField(this.locators.dateBefore, '')
    await I.fillField(this.locators.dateBefore, '2017/12/31 09:00')
    await I.click(this.locators.saveMenu)
    await I.click(this.locators.saveGoBack)
    await I.waitForText('The document has been created', 3)
    await I.dontSeeInCurrentUrl('/new')
    await I.waitForText(formattedDate)
  },

  async deleteAllDates() {
    await I.deleteFieldTestDates()
  }

}