import './pages/index.css';

const contentWrapper = document.querySelector('.content-container');
const generateBtn = contentWrapper.querySelector('.content-button');
const formInput = contentWrapper.querySelector('.content-input');
const qrImg = contentWrapper.querySelector('.qr-code__image');
const downloadBtn = contentWrapper.querySelector('.download-button');
const langBtn = contentWrapper.querySelector('.language-button');
const errorMessage = contentWrapper.querySelector('.error-message');
let currentLanguage = 'en';

const translations = {
  en: {
    header: "QR-code generator",
    text: "Put down a URL or enter text to create QR-code",
    input: "Enter text or URL",
    generateBtn: "Generate QR-code",
    langBtn: "Ru"
  },
  ru: {
    header: "QR-код генератор",
    text: "Введите URL или текст для генерации QR-кода",
    input: "Введите текст или URL",
    generateBtn: "Сгенерировать QR-код",
    langBtn: "En"
  },
};

generateBtn.addEventListener('click', async (evt) => {
  evt.preventDefault();
  let inputValue = formInput.value;

  if (!inputValue) {
    return;
  }

  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${inputValue}`;
  
  if (currentLanguage === 'en') {
    setButtonText(generateBtn, "Generating QR-code...");
  }
  else {
    setButtonText(generateBtn, "Генерация QR-кода...");
  }

  qrImg.addEventListener('load', async (evt) => {
    evt.preventDefault();
    contentWrapper.classList.add('active');
    if (currentLanguage === 'en') {
      setButtonText(generateBtn, "Generate QR-code");
    }
    else {
      setButtonText(generateBtn, "Сгенерировать QR-код");
    }
  });
});

downloadBtn.addEventListener('click', async () => {
  const blob = await fetch(qrImg.src)
    .then(response => response.blob())
    .catch(error => console.log('Error while fetching data'));

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'qr-code.png';

  link.click();
});

formInput.addEventListener('input', (evt) => {
  evt.preventDefault();
  if (!formInput.value) {
    contentWrapper.classList.remove('active');
  }
  checkValidation();
});

function setButtonText(button, text) {
  button.textContent = text;
}

function updateContent() {
  const elementTranslate = document.querySelectorAll('[data-lang]');

  elementTranslate.forEach(element => {
    const langKey = element.getAttribute('data-lang');
    const translatedText = translations[currentLanguage][langKey];

    if (translatedText) {
      element.textContent = translatedText;
      element.placeholder = translatedText;
    }
  });

}

langBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  errorMessage.textContent = '';
  formInput.classList.remove('input-error');
  currentLanguage = currentLanguage === 'en' ? 'ru' : 'en';
  updateContent();
});

updateContent();

function checkValidation() {
  const isValid = formInput.validity.valid;
  
  if (isValid) {
    errorMessage.textContent = '';
    toggleButtonState(generateBtn, formInput);

  } else {
    if (currentLanguage === 'en') {
      errorMessage.textContent = 'Please fill in this field.';
      toggleButtonState(generateBtn, formInput);
    }
    else if (currentLanguage === 'ru') {
      errorMessage.textContent = 'Заполните это поле.';
      toggleButtonState(generateBtn, formInput);
    }

  }

}

formInput.addEventListener('input', (evt) => {
  evt.preventDefault();
  checkValidation();
})

function disableButton (button) {
  button.setAttribute('disabled', true);
  button.classList.add('button-disabled');
}

function toggleButtonState (button, input) {
  const isValid = formInput.validity.valid;
  if (!isValid) {
    disableButton(button);
    input.classList.add('input-error');
  }
  else {
    button.removeAttribute('disabled', true);
    button.classList.remove('button-disabled');
    input.classList.remove('input-error');
  }

}



