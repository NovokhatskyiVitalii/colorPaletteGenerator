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
