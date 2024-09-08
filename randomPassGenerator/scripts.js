/**
 * Retrieves the password input box element.
 * @type {HTMLInputElement}
 */
const passwordBox = document.getElementById('password')

/**
 * Retrieves the generate password button element.
 * @type {HTMLButtonElement}
 */
const generateBtn = document.getElementById('generate')

/**
 * Retrieves the copy to clipboard button element.
 * @type {HTMLButtonElement}
 */
const copyBtn = document.getElementById('copyBtn')

/**
 * Generates a random password of a specified length.
 * @param {number} length The length of the password to generate.
 * @returns {string} A randomly generated password.
 * @example generatePassword(12) // generates a 12-character password
 */
function generatePassword(length) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-='

  let password = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }

  return password
}

/**
 * The default password length to generate.
 * @type {number}
 */
const passwordLength = 12

/**
 * Event listener for the generate password button.
 * Generates a new password and updates the password input box when clicked.
 */
generateBtn.addEventListener('click', () => {
  passwordBox.value = generatePassword(passwordLength)
})

let timeoutId

/**
 * Event listener for the copy to clipboard button.
 * Copies the current password to the clipboard when clicked.
 */
copyBtn.addEventListener('click', async () => {
  clearTimeout(timeoutId)

  try {
    await navigator.clipboard.writeText(passwordBox.value)

    copyBtn.src = 'images/thumbs-up-solid.svg'

    timeoutId = setTimeout(() => {
      copyBtn.src = 'images/copy-regular.svg'
    }, 1000)
  } catch (error) {
    console.error('Kopyalama işlemi başarısız oldu!', error)
  }
})
