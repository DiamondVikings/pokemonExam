
document.addEventListener('DOMContentLoaded', () => {
    const log = (msg) => console.log(msg);

    // Eventlistener submit form
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        // Validera formuläret
        const isValid = validateForm();
        if (isValid) {
            // Om formuläret är giltigt, skapa player
            const player = createPlayer(oGameData.trainerName, oGameData.trainerAge, oGameData.trainerGender);
            console.log(player.getPlayerInfo()); 

            // startGame();
        }
    });

    //Musikspelaren
    const audio = new Audio('assets/pokemon_vs_trainer.mp3')
    function playPauseMusic() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
});





// ------ FORM VALIDERING ----- 

// Validera hela formuläret
function validateForm() {
    const isNameValid = validateName();
    const isAgeValid = validateAge();
    const isGenderValid = validateGender();

    return isNameValid && isAgeValid && isGenderValid; // Returnerar true om alla valideringar är godkända
}

function validateName() {
    try {
        let trainerName = document.querySelector("#nick").value.trim();
        if (trainerName === "") {
            throw new Error("Name cannot be empty.");
        }

        if (trainerName.length < 5 || trainerName.length > 10) {
            throw new Error("Name must be between 5 and 10 characters long.");
        }
        oGameData.trainerName = trainerName;
        document.querySelector("#nameErrorMsg").textContent = "";
        return true;
    } catch (error) {
        document.querySelector("#nameErrorMsg").textContent = error.message;
        return false;
    }
}

function validateAge() {
    try {
        let ageInput = document.querySelector("#age");
        let age = parseInt(ageInput.value.trim(), 10);

        if (isNaN(age)) {
            throw new Error("Age must be a number.");
        }
        if (age < 10 || age > 15) {
            throw new Error("Age must be between 10 and 15.");
        }
        oGameData.trainerAge = age;
        document.querySelector("#ageErrorMsg").textContent = "";
        return true;
    } catch (error) {
        document.querySelector("#ageErrorMsg").textContent = error.message;
        return false;
    }
}

function validateGender() {
    try {
        let gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            throw new Error("Please select a gender.");
        }
        oGameData.trainerGender = gender.value;
        document.querySelector("#genderErrorMsg").textContent = "";
        return true;
    } catch (error) {
        document.querySelector("#genderErrorMsg").textContent = error.message;
        return false;
    }
}

// ------ END FORM VALIDATION ----- 



// --- PLAYER LOGIC ---

//Create player object
const createPlayer = (nameInput, ageInput, genderInput) => {
    const player = {
        name: nameInput,
        age: ageInput,
        gender: genderInput,
        score: []
    }

    return {
        getPlayerInfo: (() => {
            return player;
        }),
        setPlayerScore: ((time) => {
            player.score.push(time);
        })
    }
}

// --- END PLAYER LOGIC ---


// --- GAME LOGIC ----

//BakgrundsBild
function changeBackgroundImage() {
    document.body.style.backgroundImage = `url('./assets/arena-background.png')`;
}

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

 
//Genererar ett htmlelement för varje pokeObject
function createHTMLforPokeObj() {
    // Test objekt med pokemon. Detta ska vara startingPoke eg.
        let pokemonObject = [  
            {
                namn: "hej",
                img: "imgUrl",
                score: 10,
                id: 1
            },
            {
                namn: "hej",
                img: "imgUrl",
                score: 10,
                id: 2
            },
            {
                namn: "hej",
                img: "imgUrl",
                score: 10,
                id: 3
            }
            ];

        let gameField = document.querySelector('#gameField')
        
        //Skapa ett htmlEl för varje objekt i pokemonObject(som ska va startingPoke eg.)
        pokemonObject.forEach(function(poke) {
            let gamePokEl = document.createElement('img')
            gamePokEl.src = poke.img
            gameField.appendChild(gamePokEl)
        }) 
}





// Om pokemon ej isCaught, byta till pokeboll. Om isCaught, byta till pokemonbild
function isCaught(pokemonObject) {
    if (pokemonObject.isCaught) {
        pokemonObject.img = `url('.assets/ball.webp')`;
    } else {
        pokemonObject.img = pokemonObject.originalImg; // Återgå till ursprungliga bilden
    }
}


//Kallas på vid hoverIn & hover Out function 
function checkGameOver(pokemonArray) {
    if (pokemonArray.every(pokemonObject => pokemonObject.isCaught === true)) {
        console.log('spelet är slut');
        playPauseMusic();
        
    } else {
        console.log('alla är inte isCaught, fortsätt spela');
    }
}

// --- END GAME LOGIC ---- 



// --- HIGHSCORE LOGIC ---