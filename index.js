
const API_URL = "https://cdn.jsdelivr.net/npm/world-countries@5.1.0/countries.json";
const grid = document.querySelector("#grid")
const statusEl = document.querySelector("#status")
const searchInput = document.querySelector("#search")
let countries = [];

async function loadCountries() {
    statusEl.textContent = "loading "
    try {
        const res = await fetch(API_URL);

        if (res.ok === false) {
            throw new Error("could not laod countries")
        }
        const data = await res.json();
        countries = data;
        renderCards(countries)
        statusEl.textContent = `Showing ${data.length} countries`
    }
    catch (err) {
        statusEl.textContent = "Something went wrong. please try again."
    }

}
function renderCards(list) {
    grid.innerHTML = ""
    list.forEach((country) => {
        const card = document.createElement("article")
        const img = document.createElement("img")
        img.src = `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`
        const name = document.createElement("h3")
        name.textContent = country.name.common
        const p = document.createElement("p")
        p.textContent = `${country.region} - ${country.capital?.[0] || "—"}`

        card.appendChild(img)
        card.appendChild(name)
        card.appendChild(p)
        grid.appendChild(card)

    });

}
function applyFilters(){
    const text = searchInput.value.toLowerCase()
    const result = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(text)
    })
    renderCards(result)
}
searchInput.addEventListener("input", applyFilters)


loadCountries()