
let promoterSlider = document.getElementById("promoters");
let passiveSlider = document.getElementById("passives");
let detractorSlider = document.getElementById("detractors");
let promotersValue = document.getElementById("promotersValue");
let passivesValue = document.getElementById("passivesValue");
let detractorsValue = document.getElementById("detractorsValue");
let nps = document.getElementById("NPS");
let goal = document.getElementById("goal");

let data = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 100,
    title: { text: "NPS" },
    type: "indicator",
    mode: "gauge+number+delta",
    delta: { reference: 70 },
    gauge: {
      axis: { range: [-100, 100] },
      steps: [
        { range: [-100, 60], color: "#f9114f" },
        { range: [60, 80], color: "#e9f817" },
        { range: [80, 100], color: "#6dd941" },
      ],
      bar: {
        color: "#00000080",
        thickness: .7,
      },
      threshold: {
        line: { color: "black", width: 4 },
        thickness: .8,
        value: 70
      }
    }
  }
];

let layout = { width: 350, height: 250, margin: { t: 0, b: 0 }, paper_bgcolor: "rgba(0,0,0,0)", font : {color: "#fff" }};
Plotly.newPlot('gauge', data, layout);

promotersValue.value = promoterSlider.value; // Display the default slider value
passivesValue.value = passiveSlider.value; // Display the default slider value
detractorsValue.value = detractorSlider.value; // Display the default slider value

let p = parseInt(promoterSlider.value);
let a = parseInt(passiveSlider.value);
let d = parseInt(detractorSlider.value);
nps.innerHTML = calculateNPS(p, a, d);
// Update the current slider value (each time you drag the slider handle)
promoterSlider.oninput = function() {
  promotersValue.value = this.value;
  updateNPS();
}
passiveSlider.oninput = function() {
  passivesValue.value = this.value;
  updateNPS();
}

detractorSlider.oninput = function() {
  detractorsValue.value = this.value;
  updateNPS();
}
// Update the current slider value when you manually enter a number
promotersValue.onchange = function() {
  promoterSlider.value = this.value;
  updateNPS();
}
passivesValue.onchange = function() {
  passiveSlider.value = this.value;
  updateNPS();
}

detractorsValue.onchange = function() {
  detractorSlider.value = this.value;
  updateNPS();
}
// Update the goal
goal.onchange = function() {
  goal.value = this.value;
  updateNPS();
}

// plus/minus buttons
const promoterMinus = document.getElementById('promoter-minus')
const promoterPlus = document.getElementById('promoter-plus')
const passiveMinus = document.getElementById('passive-minus')
const passivePlus = document.getElementById('passive-plus')
const detractorMinus = document.getElementById('detractor-minus')
const detractorPlus = document.getElementById('detractor-plus')

promoterMinus.onclick = function() {
  promoterSlider.value--;
  promotersValue.value--;
  updateNPS();
}

promoterPlus.onclick = () => {
  promoterSlider.value++;
  promotersValue.value++;
  updateNPS();
}

passiveMinus.onclick = function() {
  passiveSlider.value--;
  passivesValue.value--;
  updateNPS();
}

passivePlus.onclick = () => {
  passiveSlider.value++;
  passivesValue.value++;
  updateNPS();
}

detractorMinus.onclick = function() {
  detractorSlider.value--;
  detractorsValue.value--;
  updateNPS();
}

detractorPlus.onclick = () => {
  detractorSlider.value++;
  detractorsValue.value++;
  updateNPS();
}

function calculateNPS(p, a, d) {
  const percentPromoter = ((p / (p + a + d)) * 100).toFixed(2);
  const percentDetractor = ((d / (p + a + d)) * 100).toFixed(2);
  const NPS = percentPromoter - percentDetractor;
  return NPS.toFixed(2).toString();
}

function updateNPS() {
  p = parseInt(promoterSlider.value);
  a = parseInt(passiveSlider.value);
  d = parseInt(detractorsValue.value);
  nps.innerHTML = calculateNPS(p, a, d);
  data[0].value = Math.round(parseFloat(nps.innerHTML));
  data[0].gauge.threshold.value = parseInt(goal.value);
  data[0].delta.reference = parseInt(goal.value);
  Plotly.newPlot('gauge', data, layout);
}