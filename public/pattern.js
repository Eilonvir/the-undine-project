// pattern.js - Reaction-diffusion shell pattern generator
// Implements Gierer-Meinhardt activator-inhibitor model
// Adapted from Shiffman, D. (2024) The Nature of Code, Chapter 7
// Parameters sourced from Zhu (2018), interpreted with Claude (Anthropic, 2026)



let shellData = null; // Parameters for seashell species pattern evolution JSON
let quotes = [];

//grid for generative pattern animation
let cols = 150  
let rows = 150

/*
You need four grids to implement the reaction-diffusion model:
1. activatorGrid: holds current activator concentrations
2. futureActivatorGrid: holds future activator concentrations
3. inhibitorGrid: holds current inhibitor concentrations
4. futureInhibitorGrid: holds future inhibitor concentrations
*/
let activatorGrid;
let futureActivatorGrid;
let inhibitorGrid;
let futureInhibitorGrid;


let currentQuote = '';
let currentSpecies = 0;  // Determines which species is generated
let patternStarted = false;


function preload() {
  shellData = loadJSON('shell_species.json');
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
    console.error('Error fetching quotes:', e);
  }
}

function setup() {
  createCanvas(200, 200);
  fetchQuotes();
  textFont('Courier New');
  noStroke();
  frameRate(30)
 
  activatorGrid = makeGrid();
  futureActivatorGrid = makeGrid();
  inhibitorGrid = makeGrid();
  futureInhibitorGrid = makeGrid();
}

function makeGrid() {
  // Initialize a 2D grid with random values between 0 and 1 - to create a unique starting point for each pattern generation
  let grid = [];
  for (let i = 0; i < cols; i++) {
    let roe = [];
    for (let j = 0; j < rows; j++) {
      roe.push(random(1));
    }
    grid.push(roe);
  }
  return grid;
}

function draw() {
  if (!patternStarted) return;
  background(0);
  let cellSize = width / cols;
  let from = color(240, 171, 137);
  let to = color(80, 40, 10);

  
  // Parameters for the reaction-diffusion model are in the draw function rather than setup as they should stay dynamic
  let growth = shellData.species[currentSpecies].params.rho_a; // Growth rate of the activator, which influences how quickly the pattern evolves. Higher values lead to faster pattern formation
  let diffusionA = shellData.species[currentSpecies].params.Da;// Diffusion rate of the activator, which determines how quickly the activator spreads across the grid. Higher values lead to more blurred patterns, while lower values create sharper patterns.
  let diffusionB = currentSpecies === 0 ? shellData.species[0].params.Ds : shellData.species[1].params.Dh;//Diffusion rate of the inhibitor
  let SourceRate = currentSpecies === 0 ? shellData.species[0].params.delta_s : shellData.species[1].params.delta_h;//Source rate of the inhibitor, which determines how quickly the inhibitor is produced in response to the activator. Higher values lead to stronger inhibition and more defined patterns.
  let decayRate = shellData.species[currentSpecies].params.mu_a;//Decay rate of the activator, which determines how quickly the activator breaks down over time. Higher values lead to faster decay and more transient patterns, while lower values create more stable patterns.
  let subtractDecay = currentSpecies === 0 ? shellData.species[0].params.mu_s : shellData.species[1].params.mu_c;// Decay rate of the inhibitor, which determines how quickly the inhibitor breaks down over time. Higher values lead to faster decay and more transient patterns, while lower values create more stable patterns.



//Simulation  loop: the activator is an accelerated pattern growth simulation. The inhibitor gives it shape by spreading faster than the activator and restricting its growth
//For the sake of generative animation I need to take to account the future state of the grid as it evolves, which is reflected by two additional grids for the future states of the activator and inhibitor  
  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      let a = activatorGrid[i][j];
      let h = inhibitorGrid[i][j];
      let activatorAverage = (activatorGrid[i - 1][j] + activatorGrid[i + 1][j] + activatorGrid[i][j - 1] + activatorGrid[i][j + 1]) / 4;
      let activatorDiffusion = diffusionA * (activatorAverage - a);
      let inhibitorAverage = (inhibitorGrid[i - 1][j] + inhibitorGrid[i + 1][j] + inhibitorGrid[i][j - 1] + inhibitorGrid[i][j + 1]) / 4;
      let inhibitorDiffusion = diffusionB * (inhibitorAverage - h);
      futureActivatorGrid[i][j] = a + (growth * (a * a / h) - decayRate * a + activatorDiffusion)
      futureInhibitorGrid[i][j] = h + (growth * (a * a) - decayRate * h + inhibitorDiffusion);
    }
  }
  
  //here we update the current state of the activator and inhibitor grids to their future states, which allows the pattern to evolve over time
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      activatorGrid[i][j] = futureActivatorGrid[i][j]
      inhibitorGrid[i][j] = futureInhibitorGrid[i][j]
    }
  }
  
  //Finally we draw the pattern as pixels on the grid, mapping it with a color gradient.
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let c = lerpColor(from, to, activatorGrid[i][j]);
      fill(c);
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

function resetGrids() {
  //Reinitialize the grids to random values, which allows for a new pattern to be generated when the species is switched
  activatorGrid = makeGrid();
  futureActivatorGrid = makeGrid();
  inhibitorGrid = makeGrid();
  futureInhibitorGrid = makeGrid();
}