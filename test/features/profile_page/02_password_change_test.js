Feature('Profile Page Password Change - @smoke')

BeforeSuite((loginPage) => {
  // loginPage.deleteUser('syst_four')
  loginPage.addUser('syst_four', '123456')
  loginPage.validateSignInPage()
  loginPage.validateSignIn('syst_four', '123456')
})

AfterSuite((loginPage) => {
  loginPage.validateSignOut()
  loginPage.deleteUser('syst_four')
})

Before((loginPage) => {
  // loginPage.validateSignInPage()
  loginPage.gotoHomePage()
})

After((loginPage) => {
  // loginPage.validateSignOut()
})

// DataTable to test different combinations of password fields
let passwords = new DataTable(['currentPassword', 'newPassword', 'confirmNewPassword'])
passwords.add(['123456', '123456', '123455'])
passwords.add(['123456', '123457', '123456'])

Data(passwords).Scenario('Invalid Passwords - Screen Error', async (current, loginPage, profilePage) => {
  // await loginPage.validateSignIn('syst_four', '123456')
  await profilePage.newPasswordsNoMatch(current.currentPassword, current.newPassword, current.confirmNewPassword)
})

Scenario('Invalid Current Password - Screen Error', async (loginPage, profilePage) => {
  // await loginPage.validateSignIn('syst_four', '123456')
  await profilePage.invalidCurrentPassword('12345', '1234567', '1234567')
})

Scenario('Successful Password Change', async (loginPage, profilePage) => {
  // await loginPage.validateSignIn('syst_four', '123456')
  await profilePage.successfulPasswordChange('123456', '654321', '654321')
  await loginPage.validateSignIn('syst_four', '654321')
})