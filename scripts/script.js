const log = (msg) => console.log(msg);

// I denna fil skriver ni all er kod

//Genererar 10 pokemonObject med image scrs, id & boolean isChaught 
function createStartingPokemon() {
    let startingPoke = []
    //Alla pokemon bilder
    let imgArray = imgSrc();

    // Shuffla elementen i imgArray
    // Fisher-Yates Shuffle
    for (let i = imgArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [imgArray[i], imgArray[j]] = [imgArray[j], imgArray[i]];
    }
    
    // Ta de första 10 elementen
    let controlArray = imgArray.slice(0, 10);

    // Skapa 10 pokeObjekt o tilldela img & id
    for (let i = 1; i <= 10; i++) {
        let pokemonObject = {
            img: controlArray[i - 1], // Tilldela bilderna direkt 
            id: i,
            isCaught: false
        }
        startingPoke.push(pokemonObject)
    }
    // Returnerar en array med 10 random pokemon
    return startingPoke
}


//func() Skapa en array av alla pokemonbilderna
function imgSrc() {
    let imgArray = []

    //skapa en array med alla pokemonbilderna
    for (let i = 1; i <= 151; i++) {
        let formattedNumber = i.toString().padStart(3, '0');
        let img = `url('.assets/pokemons/${formattedNumber}.png')`; //ENDA GREJEN ÄR BILDERNA KORREKT LÄNKADE??
        
        imgArray.push(img)
    }

    return imgArray
}






