# Undine.03

## Blurb
The interaction is via text input that returns both the simulation and a quote from De La Motte’s novella Undine (1811) – a myth about a water nymph who gains a soul by marrying a human – and the revenge that follows said human’s betrayal on her. 

Embedded in a 98.css website as a mini puzzle the user needs to solve to run the generator.       


## Concept
Undine.03 is the third iteration of an ongoing body of work based on Friedrich De La Motte Fouqué's 1811 novella *Undine*. The piece uses biologically sourced Gierer-Meinhardt parameters to generate emergent seashell pigmentation patterns in response to text input. Themes of phantom data, emergence, and the dialectics of nature and myth run throughout.

## Technology Used
- p5.js — generative animation and canvas rendering
- Node.js / Express — local server
- 98.css — desktop interface aesthetic
- Vanilla JavaScript — interaction logic
- HTML / CSS — interface structure

## How to Run / Install
```bash
npm install
node server.js
```
Then open `http://localhost:3000` in your browser.

## Requirements
- Fit to run on a computer, wasn't designed for a phone interface
- Node.js
- A modern browser 

## Video documentation
https://youtu.be/UQxDGBo61eo

## Credits / Acknowledgements
Supervisor - Professor Millicent Gunn
TAs - Marcus Round, Huichuan Wang

AI acknowledgement
 
Claude (Anthropic, 2026) was used throughout the development of this project. The following specific contributions were made by Claude:

1.Gierer-Meinhardt PDE implementation (pattern.js, lines 105–106 & shell-species.json): the reaction-diffusion equations were provided by Claude, interpreting the mathematical notation from Zhu (2018) 

2.Ternary operator solution (pattern.js, lines 88–91): handling differing parameter key names between the two species entries in the dataset

3.resetGrids() fix (pattern.js, lines 130–133): identifying and resolving a bug where arrays were being appended to rather than replaced on reset

4.makeGrid() helper function (pattern.js, lines 64–75): extracting repeated grid initialisation into a reusable function

5.patternStarted guard (pattern.js, line 30 and 78): deferring the draw loop until user input was provided by Claude

6.Unified add-btn click handler (app.js, lines 47–76): merging two conflicting event listeners into one handler integrating species selection, grid reset, quote display, and transmission confirmation

Additionally, pseudocode guidance, syntax debugging, and conceptual triage support were provided by Claude throughout the build. Claude Code (VS Code extension) assisted with isolated refactoring suggestions.
The dataset curation, creative direction, interface design, project concept, and all remaining code are my own.

Images used

Rivière, H. (1890) Vague mer montante (plage de la Garde-Guérin) [Painting, photographed by Mourad Ben Abdallah, 2022]. Wikimedia Commons. Available at: https://commons.wikimedia.org/wiki/File:Art_nouveau_-_Vague_mer_montante.jpg (Accessed: 16 April 2026).

Sumner, H. (1888) Art Nouveau book-binding [Book cover, public domain]. Available at: https://twitter.com/VictorianWeb/status/1050865557770252288 (Accessed: 24 April 2026).

Publicdomainvectors.org (2020) Book icon [Digital illustration]. Available at: https://openclipart.org/detail/320034/open-book-2 (Accessed: 24 April 2026).

Viglino and contributors (2026) Rolled paper in bottle [Vector icon]. Available at: https://github.com/waysidemapping/pinhead/blob/v13.0.0/icons/rolled_paper_in_bottle.svg (Accessed:  16 April 2026).

MarsRover (2009) Bivalve Sea Shell [Digital illustration]. Wikimedia Commons. Available at: https://commons.wikimedia.org/wiki/File:Bivalve_Sea_Shell.png (Accessed: 24 April 2026).


## License
This work is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 

## Contact / Links
GitHub: https://github.com/Eilonvir/the-undine-project  
Author: Michaella Miller, MA Computational Arts, Goldsmiths 2026
