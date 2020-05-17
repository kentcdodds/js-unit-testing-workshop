import {isPasswordAllowed, userToJSON} from '../auth'

describe('isPasswordAllowed', () => {
  const badPasswords = ['', 'rrrrrrrrrrr', '1111111111', 'sushi1']
  const validPasswords = ['sushi12', 'Johhny123']

  badPasswords.forEach(badPassword => {
    it(`${badPassword} should not be allowed as passoword`, () => {
      expect(isPasswordAllowed(badPassword)).toBe(false)
    })
  })

  validPasswords.forEach(validPassword => {
    it(`${validPassword} should be allowed as password`, () => {
      expect(isPasswordAllowed(validPassword)).toBe(true)
    })
  })
})

test('isPasswordAllowed only allows some passwords', () => {
  // bad passwords.
  expect(isPasswordAllowed('')).toBe(false)
  expect(isPasswordAllowed('rrrrrrrrrrr')).toBe(false)
  expect(isPasswordAllowed('1111111111')).toBe(false)

  // incorrect length passwords
  expect(isPasswordAllowed('sushi1')).toBe(false)

  // good passwords mix of letters and alphabets.
  expect(isPasswordAllowed('sushi12')).toBe(true)
  expect(isPasswordAllowed('Johhny123')).toBe(true)
})

test('userToJSON excludes secure properties', () => {
  // Here you'll need to create a test user object
  // pass that to the userToJSON function
  // and then assert that the test user object
  // doesn't have any of the properties it's not
  // supposed to.
  // Here's an example of a user object:

  const safeUser = {
    id: 'some-id',
    username: 'sarah',
  }

  const user = {
    ...safeUser,
    // ↑ above are properties which should
    // be present in the returned object

    // ↓ below are properties which shouldn't
    // be present in the returned object
    exp: new Date(),
    iat: new Date(),
    hash: 'some really long string',
    salt: 'some shorter string',
  }

  const jsonUser = userToJSON(user)
  expect(jsonUser).toEqual(safeUser)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=auth%20util&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
