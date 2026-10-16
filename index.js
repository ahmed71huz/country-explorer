const API_URL = "https://cdn.jsdelivr.net/npm/world-countries@5.1.0/countries.json";
const statu = document.querySelector("#status")
async function loadCountries() {
    statu.textContent = "loading "
    try {
        const res = await fetch(API_URL);
        
        if (res.ok === false) {
            throw new Error("could not laod countries")
        }
        const data = await res.json();
        statu.textContent =`Showing ${data.length} countries`
    }
    catch (err) {
        statu.textContent = "Something went wrong. please try again."
    }
}

loadCountries()