const inputCountryElement = document.querySelector("#search_input")
inputCountryElement.focus()
const formSearch = document.querySelector('#search_form')

formSearch.addEventListener('submit', e => {
    e.preventDefault()

    const searchFormData = new FormData(e.target)
    console.log(searchFormData.get("name"))
    search(searchFormData);
})

async function search(searchFormData) {
    const countryName = searchFormData.get("name")
    const baseUrl = 'https://restcountries.com/v3.1/name/'
    const settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(baseUrl + countryName, settings)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            let div = document.createElement('ul');
            div.innerHTML += `<li><h1>${data[0].name.common}</h1></li>\n`
            div.innerHTML += `<li>Capital: ${data[0].capital}</li>\n`
            div.innerHTML += `<li><img src="${data[0].flags.png}" alt="идет загрузка"></li>\n`
            div.innerHTML += `<li>Currencies: ${data[0].currencies[Object.keys(data[0].currencies)[0]].name}</li>\n`
            div.innerHTML += `<li>Region: ${data[0].region}</li>\n`
            div.innerHTML += `<li><a href="https://www.google.com/search?q=${data[0].name.common}" target="_blank">Google</a></li>\n`
            div.innerHTML += `<li><a href="https://ru.m.wikipedia.org/wiki/${data[0].name.common}" target="_blank">Wiki</a></li>\n`
            document.body.append(div);
            
        })
        .catch(error =>{
            alert("Такой страны не существует")
            inputCountryElement.value = ""
            inputCountryElement.focus()
        })

}

