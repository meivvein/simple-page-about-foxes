const displayPage = html => {
    const app = document.getElementById('app')
    app.innerHTML = html
    app.dispatchEvent(new CustomEvent('contentLoaded'))
}

const display404Page = () => {
    const app = document.getElementById('app')
    app.innerHTML = '<h1 data-i18n="error.404"></h1>'
    app.dispatchEvent(new CustomEvent('contentLoaded'))
}

const fetchPageHTML = async page => {
    const response = await fetch(`/pages/${page}.html`)
    if (response.ok) return response.text()
    throw new Error(`Could not fetch page: ${page}.html`)
}

const routes = {
    '/': 'home',
    '/species': 'species',
    '/about': 'about',
}

const router = () => {
    const hash = window.location.hash.slice(1) || '/'
    if (routes[hash] !== undefined) fetchPageHTML(routes[hash])
        .then(html => displayPage(html))
        .catch(err => console.error(err))
    else display404Page()
}

window.addEventListener('hashchange', router)

window.addEventListener('DOMContentLoaded', router)