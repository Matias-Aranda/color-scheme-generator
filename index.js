const colorContainer = document.getElementById("color-container")
const selectEl = document.querySelector("select")
let colorPickedEl = document.querySelector("input")
let defaultColor = "F55A5A"

document.addEventListener("submit",function(e){
    let colorInput = colorPickedEl.value.replace("#","")
    e.preventDefault()
    renderColors(colorInput)
    
})

function renderColors(colorPicked) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicked}&mode=${selectEl.value}`)
        .then(res => res.json())
        .then(data => {
            let colorsArray = data.colors.map(color => color.hex.value)
            let html = ""
            for(let color of colorsArray){
                html += `<div class="color" style="background: ${color}">
                             <div class="hex">
                                 <h3 class="hex-text">${color}</h3>
                             </div>
                         </div>`
            }   
            colorContainer.innerHTML = html  
        })  
}

renderColors(defaultColor)