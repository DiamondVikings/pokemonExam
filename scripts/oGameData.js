const oGameData = {
    pokemonNumbers : [],
    nmbrOfCaughtPokemons : 0,
    startTime : 0,
    endTime : 0,
    timerId : null,
    trainerName : '',
    trainerAge : 0,
    trainerGender : '',
    // Metod som nollställer datan i oGameData
    init : function() {
        this.startTime = 0;
        this.endTime = 0;
        this.timerId = null;
        
        this.trainerName = '';
        this.trainerAge = 0;
        this.trainerGender = '';
    },

    // Metod som slumpar fram ett tal som förhåller sig mellan 0 och webbläsarens bredd minus bildens bredd
    getLeftPosition : () => {
        let nmbr = Math.round(Math.random() * ( window.innerWidth - 300)) + 1;
        return nmbr;
    },
    // Metod som slumpar fram ett tal som förhåller sig mellan 0 och webbläsarens höjd minus bildens höjd
    getTopPosition : () => {
        let nmbr = Math.round(Math.random() * ( window.innerHeight - 300)) + 1;
        return nmbr;
    },
}