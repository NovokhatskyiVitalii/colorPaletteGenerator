import { prominent } from "color.js";

const searchInput = document.querySelector("#search-input"),
  searchColor = document.querySelector(".search-color"),
  searchImage = document.querySelector("#search-image"),
  typeSelect = document.querySelector("#palette-type"),
  typeText = document.querySelector("#type-text"),
  countSelect = document.querySelector("#palette-count"),
  randomBtn = document.querySelector("#random-btn"),
  paletteContainer = document.querySelector("#palette"),
  relatedContainer = document.querySelector("#related"),
  imageColorsContainer = document.querySelector("#image-colors"),
  imageColorsWrapper = document.querySelector(".image-colors-wrapper");

let currentColor = "skyblue",
  currentType = "monochromatic",
  currentCount = "6",
  imageColors = [];

// ALL FUNCTIONS TO GENERATE DIFFERENT PALETTES

function generateAnalogousPalette(hsl, count) {
  // hsl is color, count means quantity of colors
  const palette = [];
  //get hue, saturation, lightness form hsl, this is the reason to use hsl
  const [hue, saturation, lightness] = hsl;

  // generate colors equals count
  for (let i = 0; i < count; i++) {
    // add 30 and multiple to index for every color
    let newHue = hue + 30 * i;
    // new hue can be greater than 360 so check if greater than hue - 360
    if (newHue > 360) {
      newHue -= 360;
    }
    // add new color in palette array
    palette.push([newHue, saturation, lightness]);
  }
  // after getting all colors return palette
  return palette;
}

function generateMonochromaticPalette(hsl, count) {
  //same in this but instead of hue increase lightness bu 10
  const palette = [];
  let [hue, saturation, lightness] = hsl;

  for (let i = 0; i < count; i++) {
    let newLightness = (lightness = 10 * i);
    if (newLightness > 100) {
      //lightness cannot be greater than 100
      newLightness -= 100;
    }
    palette.push([hue, saturation, newLightness]);
  }
  return palette;
}

function generateTriadicPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;
  // in triadic increase hue by 120
  for (let i = 0; i < count; i++) {
    let newHue = hue + 120 * i;
    if (newHue > 360) {
      newHue -= 360;
    }
    palette.push([newHue, saturation, lightness]);
  }
  return palette;
}

function generateCompoundPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;
  // in compound increase hue by 150
  for (let i = 0; i < count; i++) {
    let newHue = hue + 150 * i;
    if (newHue > 360) {
      newHue -= 360;
    }
    palette.push([newHue, saturation, lightness]);
  }
  return palette;
}

function generatorShadesPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;
  //to get shades increase saturation by 10
  for (let i = 0; i < count; i++) {
    let newSaturation = saturation + 10 * i;
    if (newSaturation > 100) {
      //saturation cant be greater than 100
      newSaturation -= 100;
    }
    palette.push([hue, newSaturation, lightness]);
  }
  return palette;
}

function generatorTetradicPalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;
  //to get shades increase saturation by 90
  for (let i = 0; i < count; i++) {
    let newHue = hue + 90 * i;
    if (newHue > 360) {
      //saturation cant be greater than 100
      newHue -= 360;
    }
    palette.push([newHue, saturation, lightness]);
  }
  return palette;
}

function generatorSquarePalette(hsl, count) {
  const palette = [];
  let [hue, saturation, lightness] = hsl;
  //to get shades increase saturation by 60
  for (let i = 0; i < count; i++) {
    let newHue = hue + 60 * i;
    if (newHue > 360) {
      //saturation cant be greater than 100
      newHue -= 360;
    }
    palette.push([newHue, saturation, lightness]);
  }
  return palette;
}

function generateRelatedColorPanel(hsl, count) {
  const palette = [];
  const [hue, saturation, lightness] = hsl;

  // to get related colors we`ll play with hue, saturation and lightness

  // increase saturation by 20 and if great than 100 reduce
  palette.push([hue, (saturation + 20) % 100, lightness]);
  // decrease by 20
  palette.push([hue, (saturation - 20) % 100, lightness]);
  // increase lightness by 20
  palette.push([hue, saturation, (lightness + 20) % 100]);
  //decrease lightness
  palette.push([hue, saturation, (lightness - 20) % 100]);
  // same with hue
  palette.push([(hue + 20) % 360, saturation, lightness]);
  palette.push([(hue - 20) % 360, saturation, lightness]);

  //shuffle array
  for (let i = palette.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [palette[i], palette[j]] = [palette[j], palette[i]];
  }

  return palette;
}

// a function a to call specific function above based on specific type

function generatePalette(hsl, type, count) {
  switch (type) {
    case "analogous":
      return generateAnalogousPalette(hsl, count);
    case "monochromatic":
      return generateMonochromaticPalette(hsl, count);
    case "triadic":
      return generateTriadicPalette(hsl, count);
    case "compound":
      return generateCompoundPalette(hsl, count);
    case "shades":
      return generatorShadesPalette(hsl, count);
    case "tetradic":
      return generatorTetradicPalette(hsl, count);
    case "square":
      return generatorSquarePalette(hsl, count);
    case "related":
      return generateRelatedColorPanel(hsl, count);
  }
}

// function generate HTML of palette
function generatePaletteHtml(type, container) {
  // container means for which container palette or related
  let color = currentColor;
  let count = currentCount;
  // we can give any type of color like name of color, rgb, hex to get hsl
  const hsl = getHslFromColor(color);
  // if hsl null do nothing
  if (!hsl) return;
  let palette = [];
  container.innerHTML = "";
  // if type is image colors no need to generate palette we have imageColors
  if (type === "image-colors") {
    palette = imageColors;
  } else {
    palette = generatePalette(hsl, type, count);
  }

  palette.forEach((color) => {
    //if type image colors it already have hex colors so no need to convert
    if (type != "image-colors") {
      // convert hsl color to hex
      color = HslToHex(color);
    }

    const colorEl = document.createElement("div");
    colorEl.classList.add("color");
    colorEl.style.backgroundColor = color;

    colorEl.innerHTML = `
        <div class="overlay">
          <div class="icons">
            <div class="copy-color" title="Copy color code">
                <i class="far fa-copy"></i>
            </div>
            <div class="generate-palette" tittle="Generate Palette">
                <i class="fas fa-palette"></i>
            </div>
          </div>
            <div class="code">${color}</div>
        </div>
    `;

    container.appendChild(colorEl);
  });
}

function getHslFromColor(color) {
  // to get hsl from any type of given color
  let hsl;
  if (isValidColor(color)) {
    //id valid color name, hex, rgb, given
    // create a temp div element give it color and that get color from that div which will be rgb always then we can convert rgb to hsl
    let temp = document.createElement("div");
    temp.style.color = color;
    document.body.appendChild(temp);
    // get all styles of temp div
    let styles = window.getComputedStyle(temp, null);
    // get only color from styles
    let rgb = styles.getPropertyValue("color");
    // no need of temp div remove it
    document.body.removeChild(temp);
    // remove rgb from rgb (255, 255, 255) to [255, 255, 255]
    rgb = removeRGB(rgb);
    // convert rgb array to hsl
    hsl = rgbToHsl(rgb);
  }

  return hsl;
}

function isValidColor(color) {
  // check color validity
  // a function to check if a given value is valid css
  return CSS.supports("color", color);
}

function removeRGB(rgb) {
  return rgb.replace("rgb(", "").replace(")", "").split(",");
}

function rgbToHsl(rgb) {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;

  let cMin = Math.min(r, g, b);
  let cMax = Math.max(r, g, b);
  let delta = cMax - cMin;
  let h = 0;
  let s = 0;
  let l = (cMin + cMax) / 2;

  if (delta === 0) {
    h = 0;
    s = 0;
  } else if (cMax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cMax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) {
    h += 360;
  }
  if (delta !== 0) {
    s = Math.round((delta / (1 - Math.abs(2 * l - 1))) * 100);
  }
  l = Math.round(l * 100);
  return [h, s, l];
}

function HslToHex(hsl) {
  let h = hsl[0];
  let s = hsl[1];
  let l = hsl[2];
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}

// function generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// function copy clip board
function copyClipBoard(text) {
  const input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

function toast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  document.body.appendChild(toast);
  //add show class after some time to animate
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // remove after 2 sec
  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 2000);
}

function extractColorsFromImage(image) {
  // we can increase or decrease color to detect by amount
  prominent(image, { amount: 6, format: "hex" }).then((color) => {
    // empty image colors array
    imageColors = [];
    imageColors.push(...color);
    generatePaletteHtml("image-colors", imageColorsContainer);
    // show image colors wrapper
    imageColorsWrapper.classList.remove("hidden");
  });
}

generatePaletteHtml(currentType, paletteContainer);
generatePaletteHtml("related", relatedContainer);

// generate palette when a color is written in input

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value;
  if (isValidColor(value)) {
    // if valid color written
    searchColor.style.backgroundColor = value;
    currentColor = value;
    generatePaletteHtml(currentType, paletteContainer);
    generatePaletteHtml("related", relatedContainer);
  }
});

typeSelect.addEventListener("change", (e) => {
  const value = e.target.value;
  currentType = value;
  typeText.textContent = value + "Palette";
  generatePaletteHtml(currentType, paletteContainer);
});

countSelect.addEventListener("change", (e) => {
  const value = e.target.value;
  currentCount = value;
  generatePaletteHtml(currentType, paletteContainer);
});

randomBtn.addEventListener("click", (e) => {
  const randomColor = getRandomColor();
  searchInput.value = randomColor;
  searchColor.style.backgroundColor = randomColor;
  currentColor = randomColor;
  generatePaletteHtml(currentType, paletteContainer);
  generatePaletteHtml("related", relatedContainer);
});

searchImage.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const image = new Image();
      image.src = reader.result;
      image.onload = function () {
        extractColorsFromImage(image);
      };
    };
  }
});

// add event listener on each color
const palettes = document.querySelectorAll(".palette");
palettes.forEach((palette) => {
  palette.addEventListener("click", (e) => {
    const target = e.target;
    const color = e.target.parentElement.parentElement.children[1].textContent;
    if (target.classList.contains("copy-color")) {
      copyClipBoard(color);
      toast(`Color ${color} copied to clipboard`);
    }
    // if generate palette clicked
    if (target.classList.contains("generate-palette")) {
      searchInput.value = color;
      searchColor.style.backgroundColor = color;
      currentColor = color;
      generatePaletteHtml(currentType, paletteContainer);
      generatePaletteHtml("related", relatedContainer);
      toast("Palette generated for" + color);
    }
  });
});
