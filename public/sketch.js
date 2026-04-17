let shellData = nulll
let cols = 150;
let rows = 150;
let activatorGrid;
let futureActivatorGrid;
let inhibitorGrid;
let futureInhibitorGrid;
let currentSpecies = 0;

function preload() {
  shellData = loadJSON('shell_species.json');
  //clamImg = loadImage('clam.png');
}

async function fetchQuotes() {
  try {
    const response = await fetch('undine_quotes.json');
    const data = await response.json();
    quotes = data.quotes;
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setInterval(() => {
      currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    }, 6000);
  } catch (e) {
    
  }
}

function setup() {
  let canvas = createCanvas(200, 200);
  fetchQuotes();
  textFont('Courier New');
  noStroke();
  frameRate(30)
  activatorGrid = [];
  futureActivatorGrid = [];
  inhibitorGrid = [];
  futureInhibitorGrid = [];


  for (let i = 0; i < cols; i++) {
    let roe = [];
    for (let j = 0; j < rows; j++) {
      roe.push(random(1));
    }
    activatorGrid.push(roe);
  }

  for (let i = 0; i < cols; i++) {
    let roe = [];
    for (let j = 0; j < rows; j++) {
      roe.push(random(1));
    }
    futureActivatorGrid.push(roe);
  }

  for (let i = 0; i < cols; i++) {
    let roe = [];
    for (let j = 0; j < rows; j++) {
      roe.push(random(1));
    }
    inhibitorGrid.push(roe);
  }

  for (let i = 0; i < cols; i++) {
    let roe = [];
    for (let j = 0; j < rows; j++) {
      roe.push(random(1));
    }
    futureInhibitorGrid.push(roe);
  }

}

function draw() {
  background(0);
   let cellSize = width / cols;
  let from = color(240, 171, 137);
  let to = color(80, 40, 10);
  

  let growth = shellData.species[currentSpecies].params.rho_a;
  let diffusionA = shellData.species[currentSpecies].params.Da;
  let diffusionB = currentSpecies === 0 ? shellData.species[0].params.Ds : shellData.species[1].params.Dh;
let SourceRate = currentSpecies === 0 ? shellData.species[0].params.delta_s : shellData.species[1].params.delta_h;
  let decayRate = shellData.species[currentSpecies].params.mu_a;
  let subtractDecay = currentSpecies === 0 ? shellData.species[0].params.mu_s : shellData.species[1].params.mu_c;
  console.log(growth, diffusionA, diffusionB, decayRate, SourceRate, subtractDecay);

  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
    let a = activatorGrid[i][j];
    let h = inhibitorGrid[i][j];  
    let activatorAverage = (activatorGrid[i-1][j] + activatorGrid[i+1][j] + activatorGrid[i][j-1] + activatorGrid[i][j+1]) / 4;
    let activatorDiffusion = diffusionA * (activatorAverage - a);
    let inhibitorAverage = (inhibitorGrid[i-1][j] + inhibitorGrid[i+1][j] + inhibitorGrid[i][j-1] + inhibitorGrid[i][j+1]) / 4;
    let inhibitorDiffusion = diffusionB * (inhibitorAverage - h);
    futureActivatorGrid[i][j] = a + (growth * (a*a/h) - decayRate * a + activatorDiffusion)
futureInhibitorGrid[i][j] = h + (growth * (a*a) - decayRate * h + inhibitorDiffusion);
//futureActivatorGrid[i][j] = constrain(futureActivatorGrid[i][j], 0, 20);
//futureInhibitorGrid[i][j] = constrain(futureInhibitorGrid[i][j], 0, 20);
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
    activatorGrid[i][j] = futureActivatorGrid[i][j]
    inhibitorGrid[i][j] = futureInhibitorGrid[i][j]
    }
  }
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
     let c = lerpColor(from, to, activatorGrid[i][j]);
     fill(c);
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  } 
}

function resetGrids() {
  activatorGrid = [];
  futureActivatorGrid = [];
  inhibitorGrid = [];
  futureInhibitorGrid = [];
  for (let i = 0; i < cols; i++) {
    let roe = [];
    for (let j = 0; j < rows; j++) {
      roe.push(random(1));
    }
    activatorGrid.push(roe);
  }

  for (let i = 0; i < cols; i++) {
    let roe = [];
    for (let j = 0; j < rows; j++) {
      roe.push(random(1));
    }
    futureActivatorGrid.push(roe);
  }

  for (let i = 0; i < cols; i++) {
    let roe = [];
    for (let j = 0; j < rows; j++) {
      roe.push(random(1));
    }
    inhibitorGrid.push(roe);
  }

  for (let i = 0; i < cols; i++) {
    let roe = [];
    for (let j = 0; j < rows; j++) {
      roe.push(random(1));
    }
    futureInhibitorGrid.push(roe);
  }

}
