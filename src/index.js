import './pages/index.css';
import { checkValidation} from './scripts/validation';
import { updateContent } from './scripts/update';

const contentWrapper = document.querySelector('.content-container');
const generateBtn = contentWrapper.querySelector('.content-button');
const formInput = contentWrapper.querySelector('.content-input');
const qrImg = contentWrapper.querySelector('.qr-code__image');
const downloadBtn = contentWrapper.querySelector('.download-button');
const langBtn = contentWrapper.querySelector('.language-button');
const errorMessage = contentWrapper.querySelector('.error-message');
let currentLanguage = 'en';


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
  checkValidation(formInput, currentLanguage, generateBtn, errorMessage);
});

function setButtonText(button, text) {
  button.textContent = text;
}

langBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  errorMessage.textContent = '';
  formInput.classList.remove('input-error');
  currentLanguage = currentLanguage === 'en' ? 'ru' : 'en';
  updateContent(currentLanguage);
});

updateContent(currentLanguage);

formInput.addEventListener('input', (evt) => {
  evt.preventDefault();
  checkValidation(formInput, currentLanguage, generateBtn, errorMessage);
})




