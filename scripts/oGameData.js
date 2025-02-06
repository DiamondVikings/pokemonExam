const oGameData = {
    trainerName : '',
    trainerAge : 0,
    trainerGender : '',
    // Metod som nollställer datan i oGameData
    init : function() {    
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