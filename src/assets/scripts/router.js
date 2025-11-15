const displayPage = html => {
    const app = document.getElementById('app')
    app.innerHTML = html
    app.dispatchEvent(new CustomEvent('contentLoaded'))
}

const display404Page = () => {
    const app = document.getElementById('app')
    app.innerHTML = `
        <h1 data-i18n="error.404"></h1>
        <p data-i18n="error.404.get-a-floof"></p>
        <img id="floof" src="" alt="Floof">
        <div>
            <span data-i18n="powered-by"></span>
            <a href="https://randomfox.ca/" target="_blank">RandomFox</a>
        </div>
    `
    app.dispatchEvent(new CustomEvent('contentLoaded'))
    fetch('https://randomfox.ca/floof/')
        .then(response => response.json())
        .then(data => document.getElementById('floof').src = data['image'])
        .catch(err => console.error(err))
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