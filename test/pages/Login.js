'use strict'

const I = actor()

const {
  assert,
  expect
} = require('chai')

module.exports = {

  // insert your locators and methods here
  locators: {
    usernameField: (locate('input').withAttr({
      placeholder: 'Your username'
    }).as('Username Field')),
    passwordField: (locate('input').withAttr({
      placeholder: 'Your password'
    }).as('Password Field')),
    signInButtonDisabled: (locate('button[type=submit][disabled]').as('Sign In Button Disabled')),
    signInButton: (locate('button[type = submit]').withText('Sign In').as('Sign In Button')),
    publishMenu: (locate('a').withAttr({
      href: '/'
    }).as('Publish Menu')),
    navigationMenu: (locate('.//nav').as('Navigation Menu')),
    articleLink: (locate('a').withAttr({
      href: '/articles'
    })),
    signOutButton: (locate('button').withText('Sign out').as('Sign Out Button'))
  },

  validateSignInPage() {
    I.amOnPage('/')
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/sign-in')
    I.seeElement(this.locators.usernameField)
    I.seeElement(this.locators.passwordField)
    I.seeElement(this.locators.signInButton)
  },

  async validateUnauthPageLoad() {
    I.amOnPage('/articles')
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/sign-in')
  },

  validateInvalidCredentials(username, password) {
    I.fillField(this.locators.usernameField, username)
    I.seeElement(this.locators.signInButtonDisabled)
    I.fillField(this.locators.passwordField, password)
    I.click(this.locators.signInButton)
    I.waitForFunction(() => document.readyState === 'complete')
    I.waitForText('Username not found or password incorrect')
  },

  async validateSignIn(username, password) {
    I.waitForVisible(this.locators.usernameField)
    I.fillField(this.locators.usernameField, username)
    I.seeElement(this.locators.signInButtonDisabled)
    I.fillField(this.locators.passwordField, password)
    I.click(this.locators.signInButton)
    I.waitForFunction(() => document.readyState === 'complete')
    I.resizeWindow(1200, 650)
    I.waitForText('Welcome,')
    // pause() You can use the menu to navigate collections and start editing documents.
    // I.wait(5)
    // I.see('Dave Mac')
    // await I.click(this.locators.publishMenu)
    // pause()
    I.waitForVisible(this.locators.navigationMenu, 4)
    I.see('Content')
    I.see('Taxonomy')
    // I.see('Publish authors')
    I.see('Articles')
    // pause()
    I.see('Network services')
    I.see('Web services')
  },

  async validateSignOut() {
    I.retry(3).click(this.locators.signOutButton)
    I.waitForText('Password')
    I.seeInCurrentUrl('/sign-in')
    I.seeElement(this.locators.usernameField)
    I.seeElement(this.locators.passwordField)
    I.seeElement(this.locators.signInButton)
  },

  addUser(id, secret) {
    I.createClient(id, secret)
  },

  deleteUser(id) {
    I.deleteClient(id)
  },

  gotoHomePage() {
    I.click(this.locators.publishMenu)
  }
}