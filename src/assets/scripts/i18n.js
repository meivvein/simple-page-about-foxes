const translatePage = langData => {
    document.documentElement.lang = langData['lang']
    document.title = langData['title']
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n')
        element.textContent = langData[key] ?? ''
        if (langData[key] === undefined)
            console.warn(`Missing key: '${key}' in ${langData['lang']}.json`)
    })
}

const fetchLanguageData = async lang => {
    const response = await fetch(`assets/i18n/${lang}.json`)
    if (response.ok) return response.json()
    throw new Error(`Could not fetch language file: ${lang}.json`);
}

const changeLanguage = lang => {
    fetchLanguageData(lang)
        .then(langData => translatePage(langData))
        .then(() => localStorage.setItem('language', lang))
        .catch(err => console.error(err))
}

window.addEventListener('DOMContentLoaded', () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en'
    changeLanguage(userPreferredLanguage)

    document.querySelectorAll('button[data-lang]').forEach(btn => {
        const lang = btn.getAttribute('data-lang')
        btn.addEventListener('click', () => {
            changeLanguage(lang)
        })
    })
})