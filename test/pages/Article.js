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
    publishMenu: (locate('a').withAttr({
      href: '/'
    }).as('Publish Menu')),
    navigationMenu: (locate('.//nav').as('Navigation Menu')),
    articleLink: (locate('a').withAttr({
      href: '/articles'
    }).as('Article Link')),
    articleTitleHeading: (locate('a').withText('Title').as('Article Heading')),
    footer: (locate('.//footer').as('Article Page Footer')),
    createNewButton: (locate('a').withText('Create new').as('Create New Button')),
    articleRows: (locate('.//tbody/tr').as('Article Rows')),
    numberOfArticles: (locate('.//strong[1]').as('Number Of Articles On Page')),
    totalArticles: (locate('.//strong[2]').as('Number Of Articles On Page')),
    signOutButton: (locate('button').withText('Sign out').as('Sign Out Button')),
    titleField: (locate('div').withAttr({
      'data-field-name': 'title'
    }).find('input').as('Title Field')),
    selectAuthor: (locate('a').withText('Select existing author').as('Select Author Button')),
    checkAuthor: (locate('td').withText('Dave Macpherson').as('Select The Author')),
    addAuthor: (locate('button').withText('Add selected document').as('Add The Author')),
    excerptField: (locate('div').withAttr({
      'data-field-name': 'excerpt'
    }).find('textarea').as('Excerpt Field')),
    bodyField: (locate('div').withAttr({
    'contenteditable': 'true'
    }).as('Body Field')),
    metaTab: (locate('a').withText('Meta').as('Meta Tab')),
    metaTitle: (locate('div').withAttr({
      'data-field-name': 'metaTitle'
    }).find('input').as('Meta Title Field')),
    saveMenu: (locate('button[class*="ButtonWithOptions__launcher"]').as('Save Menu')),
    saveGoBack: (locate('button').withText('Save and go back').as('Save And Go Back Button')),
    saveArticle: (locate('button').withText('Save and continue').as('Save And Continue Button')),
    createdArticle: (locate('a').withText('This Is A New Article').as('New Article')),
    signOutArticle: (locate('.//main/table/tbody/tr[1]/td[2]/a').as('Sign Out Article')),
    updatedArticle: (locate('a').withText('This Article Is Updated').as('Updated Article')),
    slugField: (locate('div').withAttr({
      'data-field-name': 'slug'
    }).find('input').as('Slugified Field')),
    checkArticle: (locate('td').withText('This is the excerpt').as('Select Article')),
    applyButton: (locate('button').withText('Apply').as('Apply Button')),
    selectDelete: (locate('.//select').as('Select Delete')),
    deleteButton: (locate('button').withText('Yes, delete it.').as('Delete Button')),
    selectCategory: (locate('a').withText('Select existing category').as('Select Existing Category Button')),
    selectSubCategory: (locate('a').withText('Select existing sub category').as('Select Existing Sub Category Button')),
    selectWebService: (locate('a').withText('Select existing web service').as('Select Existing Web Service Button')),
    selectNetworkService: (locate('a').withText('Select existing network service').as('Select Existing Newtork Service Button')),
    checkCategory: (locate('td').withText('Knowledge').as('Knowledge Row')),
    addSelected: (locate('button').withText('Add selected document').as('Add Selected Document Button')),
    checkSubCategory: (locate('td').withText('Network').as('Network Row')),
    apiWebService: (locate('td').withText('RESTful API').as('API Row')),
    cdnWebService: (locate('td').withText('faster content').as('CDN Row')),
    checkNetworkService: (locate('td').withText('processing power').as('Host Row')),
    removeNetworkButton: (locate('div').withAttr({
      'data-field-name': 'network-service'
    }).find('button').as('Remove Network Service Button')),
    editWebServiceButton: (locate('div').withAttr({
      'data-field-name': 'web-service'
    }).find('a').withText('Edit').as('Edit Web Service Button')),
    networkService: (locate('label').withText('Network service').as('Network Service')),
    webService: (locate('label').withText('Web service').as('Web Service')),
    authorPage: (locate('a').withText('4').as('Page 4')),
    nevermindButton: (locate('a').withText('Nevermind, back to document').as('Back to document')),
    boldButton: (locate('div').withAttr({
      'data-field-name': 'body'
    }).find('button').withAttr({ 'title': 'Bold'})),
    boldText: (locate('div').withAttr({
      'data-field-name': 'body'
    }).find('div[class*="RichEditor__editor___"]').withText('Bold'))
  },

  async validateArticlePage() {
    await I.amOnPage('/articles')
    await I.waitForVisible(this.locators.articleTitleHeading)
    await I.waitForElement(this.locators.footer)
    await I.seeElement(this.locators.createNewButton)
    let articles = await I.grabNumberOfVisibleElements(this.locators.articleRows)
    // console.log(articles)
    await I.seeNumberOfVisibleElements(this.locators.articleRows, articles)
    let range = await I.grabTextFrom(this.locators.numberOfArticles)
    let number = range.substring(2, 4).trim()
    // console.log(number)
    await I.seeNumbersAreEqual(articles.toString(), number)
  },

  async addArticle() {
    let total = await I.grabTextFrom(this.locators.totalArticles)
    // console.log(total)
    I.click(this.locators.createNewButton)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/articles/new')
    I.fillField(this.locators.titleField, 'This Is A New Article')
    I.fillField(this.locators.excerptField, 'This is the excerpt')
    I.fillField(this.locators.bodyField, 'This is the body of the new article')
    I.click(this.locators.saveArticle)
    I.waitForText('The document has been created', 2)
    // I.wait(3)
    I.click(this.locators.selectAuthor)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/select/author')
    I.waitForText('Author')
    // I.wait(1)
    I.click(this.locators.nevermindButton)
    I.waitForFunction(() => document.readyState === 'complete')
    I.dontSeeInCurrentUrl('/select/author')
    I.seeInField(this.locators.titleField, 'This Is A New Article')
    I.click(this.locators.selectAuthor)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/select/author')
    I.waitForText('Author')
    // I.wait(1)
    I.click(this.locators.authorPage)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/select/author/4')
    I.waitForText('Dave Macpherson')
    I.click(this.locators.checkAuthor)
    I.click(this.locators.addAuthor)
    I.waitForFunction(() => document.readyState === 'complete')
    I.see('Dave Macpherson')
    I.click(this.locators.selectCategory)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/select/category')
    I.waitForText('Category')
    I.waitForText('Knowledge')
    I.click(this.locators.checkCategory)
    I.click(this.locators.addSelected)
    I.waitForFunction(() => document.readyState === 'complete')
    I.see('Knowledge')
    I.scrollTo(this.locators.selectSubCategory)
    I.click(this.locators.selectSubCategory)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/select/sub-category')
    I.waitForText('Sub category')
    I.waitForText('Network')
    I.click(this.locators.checkSubCategory)
    I.click(this.locators.addSelected)
    I.waitForFunction(() => document.readyState === 'complete')
    I.see('Network')
    I.scrollTo(this.locators.selectWebService)
    I.click(this.locators.selectWebService)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/select/web-service')
    I.waitForText('Web service')
    I.waitForText('API')
    I.click(this.locators.apiWebService)
    I.click(this.locators.cdnWebService)
    I.click(this.locators.addSelected)
    I.waitForFunction(() => document.readyState === 'complete')
    I.see('API')
    I.see('CDN')
    I.scrollTo(this.locators.selectNetworkService)
    I.click(this.locators.selectNetworkService)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/select/network-service')
    I.waitForText('Network service')
    I.waitForText('Host')
    I.click(this.locators.checkNetworkService)
    I.click(this.locators.addSelected)
    I.waitForFunction(() => document.readyState === 'complete')
    I.scrollTo(this.locators.networkService)
    I.see('Host')
    I.click(this.locators.removeNetworkButton)
    I.seeElement(this.locators.selectNetworkService)
    I.click(this.locators.metaTab)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/meta')
    I.fillField(this.locators.metaTitle, 'This Is A New Article')
    I.click(this.locators.saveMenu)
    I.click(this.locators.saveGoBack)
    I.waitForText('The document has been updated')
    I.wait(3)
    I.seeInCurrentUrl('/articles')
    I.see('This Is A New Article')
    let newTotal = await I.grabTextFrom(this.locators.totalArticles)
    // console.log(newTotal)
    I.seeTotalHasIncreased(newTotal, total)
  },

  async editArticle() {
    let link = await I.grabAttributeFrom(this.locators.createdArticle, 'href')
    // console.log(link)
    let start = link.indexOf('/articles/')
    // console.log(start)
    let id = link.slice(start)
    // console.log(id)
    I.click(this.locators.createdArticle)
    I.seeInCurrentUrl(id)
    let slug = await I.grabValueFrom(this.locators.slugField)
    // console.log(slug)
    I.seeStringsAreEqual(slug, 'this-is-a-new-article')
    I.fillField(this.locators.titleField, '')
    I.fillField(this.locators.titleField, 'This Article Is Updated')
    I.scrollTo(this.locators.webService)
    I.click(this.locators.editWebServiceButton)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/select/web-service')
    I.waitForText('Web service')
    I.waitForText('API')
    I.click(this.locators.cdnWebService)
    I.click(this.locators.addSelected)
    I.waitForFunction(() => document.readyState === 'complete')
    I.scrollTo(this.locators.webService)
    I.see('API')
    I.dontSee('CDN')
    I.click(this.locators.saveGoBack)
    I.waitForText('The document has been updated', 2)
    I.wait(3)
    I.seeInCurrentUrl('/articles')
    I.see('This Article Is Updated')
    I.click(this.locators.updatedArticle)
    I.seeInCurrentUrl(id)
    let updatedSlug = await I.grabValueFrom(this.locators.slugField)
    I.seeStringsAreEqual(updatedSlug, 'this-article-is-updated')
    I.click(this.locators.articleLink)
  },

  async deleteArticle() {
    let total = await I.grabTextFrom(this.locators.totalArticles)
    // console.log(total)
    I.click(this.locators.checkArticle)
    I.selectOption(this.locators.selectDelete, 'Delete')
    I.click(this.locators.applyButton)
    I.waitForText('Are you sure you want to delete the selected document?')
    I.click(this.locators.deleteButton)
    I.waitForText('The document has been deleted', 2)
    I.wait(3)
    I.dontSee('This Article Is Updated')
    let newTotal = await I.grabTextFrom(this.locators.totalArticles)
    // console.log(newTotal)
    I.seeTotalHasDecreased(newTotal, total)
  },

  async newSignOut() {
    I.click(this.locators.createNewButton)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/articles/new')
  },

  async editSignOut() {
    let link = await I.grabAttributeFrom(this.locators.signOutArticle, 'href')
    // console.log(link)
    let start = link.indexOf('/articles/')
    // console.log(start)
    let id = link.slice(start)
    // console.log(id)
    I.click(this.locators.signOutArticle)
    I.seeInCurrentUrl(id)
  },

  async deleteDocument(title) {
    await I.deleteArticleByTitle(title)
  },

  async richTextInput() {
    await I.amOnPage('/articles/new')
    await I.waitForFunction(() => document.readyState === 'complete')
    await I.seeInCurrentUrl('/articles/new')
    await I.waitForVisible(this.locators.titleField)
    await I.fillField(this.locators.titleField, 'Rich Text')
    pause()
    // await I.click(this.locators.boldButton)
    await I.fillField(this.locators.bodyField, 'Bold')
    await I.doubleClick(this.locators.bodyField)
    await I.click(this.locators.boldButton)
    // I.appendField(this.locators.bodyField, 'appended')
    I.click(this.locators.saveArticle)
  }

}