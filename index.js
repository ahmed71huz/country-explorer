
const API_URL = "https://cdn.jsdelivr.net/npm/world-countries@5.1.0/countries.json";
const grid = document.querySelector("#grid")
const statusEl = document.querySelector("#status")
const searchInput = document.querySelector("#search")
const regionSelect = document.querySelector("#region")
const sortSelect = document.querySelector("#sort")
const details = document.querySelector("#details")
let countries = [];

async function loadCountries() {
    statusEl.textContent = "loading countries "
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
        img.alt = `Flag of ${country.name.official}`
        const name = document.createElement("h3")
        name.textContent = country.name.common
        const p = document.createElement("p")
        p.textContent = `${country.region} - ${country.capital?.[0] || "—"} -
        ${country.area.toLocaleString()} km²`
        card.dataset.code = country.cca3
        card.addEventListener("click", () => {
            details.innerHTML = `
            <h2>${country.name.official}</h2>
            <p> Region: ${country.region}</p>
            <p>Area: ${country.area}</p>
            <p>Languages: ${Object.values(country.languages || {}).join(", ") || "-"}</p>
            <p>Borders: ${(country.borders || []).join(", ") || "-"}</p>
            <button id="close-details">Close</button>
            `
            const closeDetails = details.querySelector("#close-details")
            closeDetails.addEventListener("click", () => {
                details.hidden = true
            })
            details.hidden = false
        })

        card.appendChild(img)
        card.appendChild(name)
        card.appendChild(p)
        grid.appendChild(card)
    });

}
function applyFilters(){
    const text = searchInput.value.toLowerCase()
    const region = regionSelect.value
    const result = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(text) &&
            (region === "" || country.region === region)
    })
const sorted = [...result].sort((a, b) => {
    if (sortSelect.value === "za") {
        return b.name.common.localeCompare(a.name.common)
    }
    if (sortSelect.value ==="area-desc"){
        return b.area - a.area
    }
    if (sortSelect.value ==="area-asc"){
        return a.area - b.area
    }
    return a.name.common.localeCompare(b.name.common)
})
renderCards(sorted)
if(sorted.length === 0){
    grid.innerHTML ="<p>No countries found</p>"
}
    statusEl.textContent = `Showing ${sorted.length} of ${countries.length}`
}
searchInput.addEventListener("input", applyFilters)
regionSelect.addEventListener("change", applyFilters)
sortSelect.addEventListener("change", applyFilters)

loadCountries()