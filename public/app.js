document.getElementById('add-btn').addEventListener('click', function() {
    let inputValue = document.getElementById('text20').value;
    if (inputValue.length % 2 === 0) {
        currentSpecies = 0;
    } else {
        currentSpecies = 1;
    }
    resetGrids();
});