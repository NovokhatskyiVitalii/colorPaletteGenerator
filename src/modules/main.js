import { prominent } from "color.js";

const searchInput = document.querySelector("#search-input"),
  searchColor = document.querySelector(".search-color"),
  searchImage = document.querySelector("#search-image"),
  typeSelect = document.querySelector("#palette-type"),
  countSelect = document.querySelector("#palette-count"),
  randomBtn = document.querySelector("#random-btn"),
  paletteContainer = document.querySelector("#palette"),
  relatedContainer = document.querySelector("#related");

let currentColor = "skyblue",
  currentType = "analogous",
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
}
