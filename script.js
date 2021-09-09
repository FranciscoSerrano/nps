
let promoterSlider = document.getElementById("promoters");
let passiveSlider = document.getElementById("passives");
let detractorSlider = document.getElementById("detractors");
let promotersValue = document.getElementById("promotersValue");
let passivesValue = document.getElementById("passivesValue");
let detractorsValue = document.getElementById("detractorsValue");
let nps = document.getElementById("NPS");

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
        { range: [0, 250], color: "white" },
        { range: [250, 400], color: "gray" }
      ],
      bar: { color: "lightblue" },
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 70
      }
    }
  }
];

let layout = { width: 400, height: 250, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', data, layout);

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
  updateNPS();
}
passiveSlider.oninput = function() {
  passivesValue.innerHTML = this.value;
  updateNPS();
}

detractorSlider.oninput = function() {
  detractorsValue.innerHTML = this.value;
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
  d = parseInt(detractorSlider.value);
  nps.innerHTML = calculateNPS(p, a, d);
  data[0].value = parseInt(nps.innerHTML).toFixed(2);
  Plotly.newPlot('gauge', data, layout);
}
