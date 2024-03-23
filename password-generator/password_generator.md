## Algorithm
- Initialize DOM elements

- Function generatePassword():
  - Define character sets for letters, numbers, and special characters
  - Initialize selected character set with letters
  - Update selected based on checkbox states for numbers and special characters
  - Generate a password of the specified length using the selected character set
  Return the generated password

- Function updatePassword():
  - Call generatePassword to get a new password
  - Update the display container with the generated password

- Event Listeners:
  - Set up event listener for length slider input to update displayed length and regenerate password
  - Set up event listeners for checkbox changes to regenerate password when the user selects or deselects inclusion of numbers or special characters

- Copy Button Event Listener:
  - Attempt to copy the generated password to the clipboard
  - Display an alert on successful copying
  - Log an error message if copying fails

- Initial Password Generation:
  - Call updatePassword initially to generate and display an initial password

### `index.html`
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Generator</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div
      class="wrapper flex justify-center items-center h-[100vh] bg-slate-900 text-xl"
    >
      <div
        class="main-container w-[90%] mx-auto max-w-[400px] bg-slate-600 text-slate-100 p-8 flex flex-col gap-4"
      >
        <div class="upper">
          <textarea
            class="display-password w-[90%] h-[30px] bg-white text-blue-600 font-semibold"
            cols="20"
            row="1"
          ></textarea>
          <button
            class="copy-button bg-blue-800 h-[30px] px-3 right-0 top-[0px]"
          >
            Copy
          </button>
        </div>
        <div class="lower flex flex-col gap-2">
          <div>
            <label for="length-slider-input">Length</label>
            <input
              type="range"
              name="length-slider-input"
              id="length-slider-input"
              min="1"
              max="32"
              value="8"
              skip="1"
            />
            <span class="length-slider-output bg-slate-700 px-2"></span>
          </div>
          <div>
            <label for="include-number">Numbers</label>
            <input
              type="checkbox"
              name="include-number"
              id="include-number"
              class="accent-slate-800 w-[32px] h-[16px]"
            />
          </div>
          <div>
            <label for="include-special">Special Characters</label>
            <input
              type="checkbox"
              name="include-special"
              id="include-special"
              class="accent-slate-800 w-[32px] h-[16px]"
            />
          </div>
        </div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

### `script.js`
```
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
```