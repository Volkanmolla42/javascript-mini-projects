const passwordBox = document.getElementById('password')
const generateBtn = document.getElementById('generate')
const copyBtn = document.getElementById('copyBtn')
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

const passwordLength = 12
generateBtn.addEventListener('click', () => {
  passwordBox.value = generatePassword(passwordLength)
})
let timeoutId
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
