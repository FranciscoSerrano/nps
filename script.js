let promoterSlider = document.getElementById("promoters");
let passiveSlider = document.getElementById("passives");
let detractorSlider = document.getElementById("detractors");
let promotersValue = document.getElementById("promotersValue");
let passivesValue = document.getElementById("passivesValue");
let detractorsValue = document.getElementById("detractorsValue");
let nps = document.getElementById("NPS");

promotersValue.innerHTML = promoterSlider.value; // Display the default slider value
passivesValue.innerHTML = passiveSlider.value; // Display the default slider value
detractorsValue.innerHTML = detractorSlider.value; // Display the default slider value

let p = parseInt(promoterSlider.value);
let a = parseInt(passiveSlider.value);
let d = parseInt(detractorSlider.value);
nps.innerHTML = calculateNPS(p, a, d);
// Update the current slider value (each time you drag the slider handle)
promoterSlider.oninput = function() {
  promotersValue.innerHTML = this.value;
  p = parseInt(promoterSlider.value);
  a = parseInt(passiveSlider.value);
  d = parseInt(detractorSlider.value);
  nps.innerHTML = calculateNPS(p, a, d);
}
passiveSlider.oninput = function() {
  passivesValue.innerHTML = this.value;
  p = parseInt(promoterSlider.value);
  a = parseInt(passiveSlider.value);
  d = parseInt(detractorSlider.value);
  nps.innerHTML = calculateNPS(p, a, d);

}
detractorSlider.oninput = function() {
  detractorsValue.innerHTML = this.value;
  p = parseInt(promoterSlider.value);
  a = parseInt(passiveSlider.value);
  d = parseInt(detractorSlider.value);
  nps.innerHTML = calculateNPS(p, a, d);
}


function calculateNPS(p, a, d) {
  const percentPromoter = ((p / (p + a + d)) * 100).toFixed(2);
  const percentDetractor = ((d / (p + a + d)) * 100).toFixed(2);
  const NPS = percentPromoter - percentDetractor;
  return NPS.toFixed(2).toString();
}