const displayPassword = document.querySelector('.display-password');
const copyButton = document.querySelector('.copy-button');
const lengthSliderInput = document.querySelector('#length-slider-input');
const lengthSliderOutput = document.querySelector('.length-slider-output');
const includeNumber = document.querySelector('#include-number');
const includeSpecial = document.querySelector('#include-special');

// generate password
const generatePassword = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';

  let selected = letters;
  if (includeNumber.checked && !includeSpecial.checked) {
    selected += numbers;
  }
  if (includeSpecial.checked && !includeNumber.checked) {
    selected += specialCharacters;
  }
  if (includeSpecial.checked && includeNumber.checked) {
    selected += numbers + specialCharacters;
  }

  let generatedPassword = '';

  for (let i = 0; i < lengthSliderOutput.textContent; i++) {
    const randomIndex = Math.floor(Math.random() * selected.length);
    generatedPassword += selected.charAt(randomIndex);
  }

  return generatedPassword;
};

// Update password in display container
const updatePassword = () => {
  const password = generatePassword();
  console.log(password);
  displayPassword.textContent = password;
};

lengthSliderOutput.textContent = lengthSliderInput.value;

lengthSliderInput.addEventListener('input', (event) => {
  lengthSliderOutput.textContent = event.target.value;
  updatePassword();
});

includeNumber.addEventListener('input', updatePassword);
includeSpecial.addEventListener('input', updatePassword);

//copy password
copyButton.addEventListener('click', async () => {
  const passwordToCopy = displayPassword.textContent;
  try {
    await navigator.clipboard.writeText(passwordToCopy);
    alert('Password copied to clipboard!');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
});

// Initial password generation
updatePassword();
