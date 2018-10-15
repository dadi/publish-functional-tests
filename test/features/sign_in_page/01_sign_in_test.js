Feature('Sign In Page - @smoke')

BeforeSuite((loginPage) => {
  loginPage.addUser('syst_one', '123456')
})

AfterSuite((loginPage) => {
  loginPage.deleteUser('syst_one')
})

Before((loginPage) => {
  loginPage.validateSignInPage()
})

Scenario('Unauthenticated Page Load', async (loginPage) => {
  await loginPage.validateUnauthPageLoad()
})

// DataTable to test different combinations of sign in fields
let passwords = new DataTable(['username', 'password'])
passwords.add(['testuser1', 'a_test_user@somedomain.tech'])
passwords.add(['testuser2', 'a_test_user@somedomain.com'])

Data(passwords).Scenario('Invalid Credentials - Screen Error', (current, loginPage) => {
  loginPage.validateInvalidCredentials(current.username, current.password)
})

Scenario('Successful Sign In and Out', async (loginPage) => {
  await loginPage.validateSignIn('syst_one', '123456')
  await loginPage.validateSignOut()
})