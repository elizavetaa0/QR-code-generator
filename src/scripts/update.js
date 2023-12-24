import {translations} from './translations'

function updateContent(language) {
  const elementTranslate = document.querySelectorAll('[data-lang]');

  elementTranslate.forEach(element => {
    const langKey = element.getAttribute('data-lang');
    const translatedText = translations[language][langKey];

    if (translatedText) {
      element.textContent = translatedText;
      element.placeholder = translatedText;
    }
  });

}

export {updateContent};