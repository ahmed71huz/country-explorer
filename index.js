const API_URL = "https://cdn.jsdelivr.net/npm/world-countries@5.1.0/countries.json";

async function loadCountries() {
    const res = await fetch(API_URL);
    res.ok
    if (res.ok === false){
        throw new error("no country with that name ")
    }
    const data = await res.json();
    console.log(data.length);
}

loadCountries()