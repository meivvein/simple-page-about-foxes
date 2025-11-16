const displayPage = html => {
    const app = document.getElementById('app')
    app.innerHTML = html
    app.dispatchEvent(new CustomEvent('contentLoaded'))
}

const display404Page = () => {
    const app = document.getElementById('app')
    app.innerHTML = `
        <div class="container">
            <h1 data-i18n="error.404"></h1>
            <p data-i18n="error.404.get-a-floof"></p>
            <div class="floof-container">
                <figure>
                    <a id="floof-link" target="_blank">
                        <img id="floof" src="" alt="Floof">
                    </a>
                    <figcaption>
                        <span data-i18n="powered-by"></span>
                        <a id="randomfox" href="https://randomfox.ca/" target="_blank">RandomFox</a>
                    </figcaption>
                </figure>
            </div>
        </div>
    `
    app.dispatchEvent(new CustomEvent('contentLoaded'))
    fetch('https://randomfox.ca/floof/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('floof').src = data['image']
            document.getElementById('floof-link').href = data['link']
            document.getElementById('randomfox').href = data['link']
        })
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