const searchBtn = document.getElementById('searchBtn')
const searchInput = document.getElementById('search')
const container = document.getElementById('container')
const cardContainer = document.createElement("div")
const apiKey = "9cfe7036b90b3a13af1a88f6bf534b32"

function start(){
    handleSearch()
    generateMarkup()
}

async function handleSearch(){
    const searchVal = searchInput.value
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchVal}&appid=${apiKey}`
    const response1 = await fetch(url)
    const data = await response1.json()
    const dataString = JSON.stringify(data)
    return localStorage.setItem('weatherData', dataString)
}

function append(parent, child){
    return parent.appendChild(child)
}

function setter(element, value){
    return element.textContent = value
}

function generateMarkup(){
    const weatherData = localStorage.getItem('weatherData')
    const weatherJson = JSON.parse(weatherData)
    const cityInfo = weatherJson.city
    const days = weatherJson.list
    const fiveDay = days.slice(0,5)
    console.log("fiveday", fiveDay)
    console.log("weatherData", weatherJson)
    generateHeader(cityInfo)
    generateSubHeader(cityInfo)
    append(container, cardContainer)
    addClass(cardContainer, "cardContainer")
    fiveDay.forEach((day) => {
        console.log("day here", day)
        generateCard(day)
    })
}

function addClass(element, className){
    return element.className = className
}

function generateSubHeader(data){
    //data
    const lat = data.coord.lat
    const lon = data.coord.lon
    const country = data.country
    const sunriseMS = data.sunrise
    const sunriseFormat = new Date(sunriseMS)
    const sunrise = sunriseFormat.toString()
    const sunsetMS = data.sunsetMS
    const timezoneShift = data.timezone
    const dataArray = [lat, lon, country, sunrise, sunsetMS]

    //elements
    const subHeaderContainer = document.createElement('div')
    const latEl = document.createElement('p')
    const lonEl = document.createElement('p')
    const countryEl = document.createElement('p')
    const sunriseEl = document.createElement('p')
    const sunsetEl = document.createElement('p')
    const timezoneEl = document.createElement('p')
    const elements = [latEl, lonEl, countryEl, sunriseEl, sunsetEl, timezoneEl]

    //appends subHeader to weatherContainer
    append(container, subHeaderContainer)
    addClass(subHeaderContainer, "subHeader")

    //loops over elements to append to subcontainer, add className, and set innerText
    elements.forEach((element, index) => {
        console.log('element', element)
        console.log('index', index)
        addClass(element, "infoEl")
        setter(element, dataArray[index])
        append(subHeaderContainer, element)
    })

}

function generateHeader(data){
    const name = data.name
    const headerContainer = document.createElement('div')
    const headerTitle = document.createElement('h2')
    addClass(headerContainer, "headerContainer")
    addClass(headerTitle, "cityHeader")
    setter(headerTitle, name)
    append(container, headerContainer)
    append(headerContainer, headerTitle)
    
}

function convertKelvinToF(kelvin){
    const result = (kelvin - 273.15) * (9/5) + 32
    const temp = result.toString().slice(0,5)
    return temp
}

function generateCard(data){
    console.log('generate card hit')
    //data
    const date = data.dt_txt
    const tempData = data.main
    const temp = convertKelvinToF(tempData.temp)

    //elements
    const cardEl = document.createElement("div")
    const cardTitleEl = document.createElement("p")
    const tempEl = document.createElement("p")

    //add classes
    addClass(cardTitleEl, "cardTitle")
    addClass(cardEl, "weatherCard")
    addClass(tempEl, "temp")

    //set innerText forEach El
    setter(tempEl, temp)
    setter(cardTitleEl, date)

    //append elements to cardEl
    console.log('card container', cardContainer)
    console.log('cardEl', cardEl)
    append(container, cardEl)
    append(cardEl, cardTitleEl)
    append(tempEl, cardEl)

}



searchBtn.addEventListener("click", start)