const colorContainer = document.getElementById("color-container");
const selectEl = document.querySelector("select");
let colorPickedEl = document.querySelector("input");
let defaultColor = "F55A5A";

document.addEventListener("submit", function (e) {
  let colorInput = colorPickedEl.value.replace("#", "");
  e.preventDefault();
  renderColors(colorInput);
});

// Function to fetch and render colors in multiple formats
function renderColors(colorPicked) {
  // Define the formats you want to include in the API query
  const formats = ["hex", "rgb", "hsl", "hsv", "contrast", "cmyk", "XYZ", "name"];

  // Join the formats into a comma-separated string
  const formatsQueryString = formats.join(",");

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorPicked}&mode=${selectEl.value}&format=${formatsQueryString}`
  )
    .then((res) => res.json())
    .then((data) => {
      let colorsArray = data.colors;
      let html = "";

      for (let color of colorsArray) {
        html += `<div class="color" style="background: ${color.hex.value}">
        <div id="format-info" style="color: ${color.contrast.value}">
                     <h2 class="name-text">${color.name.value}</h2>
                     <p class="color-text"><span class="color-type-text"> HEX: </span>${color.hex.value}</p>
                     <p class="color-text"><span class="color-type-text"> RGB: </span>${color.rgb.value}</p>
                     <p class="color-text"><span class="color-type-text"> CMYK: </span>${color.cmyk.value}</p>
                     <p class="color-text"><span class="color-type-text"> HSL: </span>${color.hsl.value}</p>
                     <p class="color-text"><span class="color-type-text"> HSV: </span>${color.hsv.value}</p>
                     <p class="color-text"><span class="color-type-text"> XYZ: </span>${color.XYZ.value}</p>
                   </div>
                 </div>`;
      }
      colorContainer.innerHTML = html;
    });
}

renderColors(defaultColor);
