'use strict'

const I = actor()

module.exports = {

  // insert your locators and methods here
  locators: {
    profileLink: (locate('a').withAttr({
      href: '/profile'
    }).as('Profile Link')),
    credentialsLink: (locate('a').withText('Credentials').as('Credentials Link')),
    personalDetailsLink: (locate('a').withText('Personal details').as('Personal Details Link')),
    idField: (locate('#c-2').withAttr({
      readonly: 'true'
    }).as('Username Field')),
    currentPasswordField: (locate('.//div[2]/div/label[1]')),
    newPasswordField: (locate('.//div[2]/div/label[2]')),
    confirmNewPasswordField: (locate('.//div[2]/div/label[3]')),
    firstNameField: (locate('#c-6').as('First Name Field')),
    lastNameField: (locate('#c-7').as('Last Name Field')),
    saveSettings: (locate('button').withText('Save settings').as('Save Settings Button')),
    saveSetttingsDisabled: (locate('button[disabled]').withText('Save settings').as('Save Settings Button Disabled')),
    signOutButton: (locate('button').withText('Sign out').as('Sign Out Button')),
    confirmation: (locate('span').withText('Your profile')),
    articleLink: (locate('a').withAttr({
      href: '/articles'
    }).as('Article Link')),
    tryPassword: (locate('input').withAttr({ type: 'password' }).at(1))
  },

  async changePersonalDetails(first, last) {
    I.click(this.locators.profileLink)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/profile')
    I.see('Username')
    I.seeElement(this.locators.idField)
    I.see('Current password')
    I.seeElement(this.locators.currentPasswordField)
    I.see('New password')
    I.seeElement(this.locators.newPasswordField)
    I.see('New password (confirm)')
    I.seeElement(this.locators.confirmNewPasswordField)
    I.click(this.locators.personalDetailsLink)
    I.seeInCurrentUrl('/profile/personal-details')
    I.see('First name')
    I.fillField(this.locators.firstNameField, first)
    I.see('Last name')
    I.fillField(this.locators.lastNameField, '')
    I.fillField(this.locators.lastNameField, last)
    I.click(this.locators.saveSettings)
    I.waitForText('Your profile has been updated', 2)
    I.waitForFunction(() => document.readyState === 'complete')
    I.wait(4)
    I.waitForText(`${first} ${last}`)
  },

  async invalidCurrentPassword(currentPassword, newPassword, confirmNewPassword) {
    I.click(this.locators.profileLink)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/profile')
    I.fillField(this.locators.currentPasswordField, currentPassword)
    I.fillField(this.locators.newPasswordField, newPassword)
    I.fillField(this.locators.confirmNewPasswordField, confirmNewPassword)
    I.click(this.locators.saveSettings)
    I.waitForFunction(() => document.readyState === 'complete')
    I.waitForText('This password is incorrect')
    I.dontSee('Your profile has been updated')
    I.seeElement(this.locators.saveSetttingsDisabled)
  },

  async newPasswordsNoMatch(currentPassword, newPassword, confirmNewPassword) {
    I.click(this.locators.profileLink)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/profile')
    I.fillField(this.locators.currentPasswordField, currentPassword)
    I.fillField(this.locators.newPasswordField, newPassword)
    I.fillField(this.locators.confirmNewPasswordField, confirmNewPassword)
    I.see('The passwords must match')
    I.seeElement(this.locators.saveSetttingsDisabled)
  },

  async successfulPasswordChange(currentPassword, newPassword, confirmNewPassword) {
    I.click(this.locators.profileLink)
    I.waitForFunction(() => document.readyState === 'complete')
    I.seeInCurrentUrl('/profile')
    I.fillField(this.locators.currentPasswordField, currentPassword)
    I.fillField(this.locators.newPasswordField, newPassword)
    I.fillField(this.locators.confirmNewPasswordField, confirmNewPassword)
    I.click(this.locators.saveSettings)
    // I.waitForFunction(() => document.readyState === 'complete')
    I.waitForText('Your profile has been updated')
    I.wait(4)
    // I.click(this.locators.articleLink)
    // I.waitForFunction(() => document.readyState === 'complete')
    I.retry(3).click(this.locators.signOutButton)
  }
}