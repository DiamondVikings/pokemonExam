const log = (msg) => console.log(msg);

// I denna fil skriver ni all er kod

//Genererar 10 pokemonObject med image srcs, id & boolean isChaught 
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
            originalImg: controlArray[i - 1], // spara den ursprungliga bilden för att kunna återgå till den vid isCaught toogle
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
        let img = `url('.assets/pokemons/${formattedNumber}.png')`;
        
        imgArray.push(img)
    }

    return imgArray
}


//'KAN53-54-isCaught' 

//func() om pokemon ej isCaught, byta till pokeboll. Om isCaught, byta till pokemonbild
function isCaught(pokemonObject) {
    if (pokemonObject.isCaught) {
        pokemonObject.img = `url('.assets/ball.webp')`;
    } else {
        pokemonObject.img = pokemonObject.originalImg; // Återgå till ursprungliga bilden
    }
}






