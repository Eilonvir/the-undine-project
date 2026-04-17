# Undine.03 — Shell Pattern Generator

A reaction-diffusion shell pattern generator built in p5.js, driven by a dataset of biologically sourced Gierer-Meinhardt parameters.

## How it works

Type anything into the input field and submit. The length of your text determines which shell species pattern is generated — the simulation runs a two-grid reaction-diffusion model using parameters drawn from real shell pigmentation studies.

## Species

- **Lyria planicostata taiwanica** — slow, meditative spot pattern
- **Oliva porphyria** — fast, chaotic wave pattern

Parameters sourced from: Zhu, M. (2018). *Activator-Inhibitor Model for Seashell Pattern Formation*.

## Stack

- p5.js
- Node.js / Express
- 98.css

## Run locally

```bash
npm install
node server.js
```

Then open `http://localhost:3000`

## Credits

Michaella Miller
MA Computational Arts, Goldsmiths, University of London, 2026

AI attribution: Claude (Anthropic, 2026) with mathematical interpretation of Gierer-Meinhardt equations to a JSON.
