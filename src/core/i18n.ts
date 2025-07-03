import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ptBR from './translations/pt-BR.json'
import enUS from './translations/en-US.json'
import { KeyStorageConfig } from '@/config/KeyStorageConfig'

const resources = {
  'pt-BR': { translation: ptBR },
  'en-US': { translation: enUS },
}

const supportedLanguages = ['pt-BR', 'en-US']
const savedLanguage = localStorage.getItem(KeyStorageConfig.language)

function getInitialLanguage() {
  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    return savedLanguage
  }
  const navLang = navigator.language
  if (supportedLanguages.includes(navLang)) {
    return navLang
  }
  const partialMatch = supportedLanguages.find(lng => lng.startsWith(navLang.split('-')[0]))
  if (partialMatch) {
    return partialMatch
  }
  return 'en-US'
}

const initialLanguage = getInitialLanguage()

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false
    }
  })

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(KeyStorageConfig.language, lng)
})

export default i18n 