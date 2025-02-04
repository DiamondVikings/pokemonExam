
document.addEventListener('DOMContentLoaded', () => {
    const log = (msg) => console.log(msg);
    document.querySelector('#gameField').classList.add('d-none');

    // Eventlistener submit form
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Validera formuläret
        const isValid = validateForm();
        if (isValid) {
            startGame();
        }
    });

});

    //Musikspelaren
const audio = new Audio('assets/pokemon_vs_trainer.mp3')
audio.volume = 0.5;
function playPauseMusic() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}


// --- START GAME ---

function startGame() {
    console.log('Spelet startar..');

    document.querySelector('#formWrapper').style.display = 'none';
    document.querySelector('#gameField').classList.remove('d-none');

    const player = createPlayer(oGameData.trainerName, oGameData.trainerAge, oGameData.trainerGender);
    setPlayerInfo(player);

    changeBackgroundImage();
    let startingPoke = createStartingPokemon();
    createHTMLforPokeObj(startingPoke);
    movePok();

    // Spela musik
    playPauseMusic();

    // Starta timer
    timer.startTimeInMilliseconds();
}

// --- END START GAME ---


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

        let img = `../assets/pokemons/${formattedNumber}.png`;
        
        imgArray.push(img)
    }

    return imgArray
}

function movePok() {
    //välj ut alla img el med class movingPoke(returnerar en array)
    let pokeImg = document.querySelectorAll('.movingPoke')

    setInterval(() => {
        pokeImg.forEach(function(element) {
            let leftP = oGameData.getLeftPosition()
            let topP = oGameData.getTopPosition()
    
            element.style.left = leftP + 'px'
            element.style.top = topP + 'px'
            console.log(element.style.top)
            console.log('Flyttar grejer')
        })
    }, 3000)
}


// Skapa en variabel med alla startpokemons så den kan användas i functionen createHTMLforPokeObj
 
//Genererar ett htmlelement för varje pokeObject
function createHTMLforPokeObj(startingPoke) {
    let gameField = document.querySelector('#gameField');
    
    // Skapa ett htmlEl för varje objekt i pokemonObject(som ska va startingPoke eg.)
    startingPoke.forEach(function(poke, index) {
        let gamePokEl = document.createElement('img');
        gamePokEl.setAttribute('id', poke.id)
        gamePokEl.setAttribute('class', 'movingPoke')

        gamePokEl.src = poke.img;
        gameField.appendChild(gamePokEl);

        gamePokEl.addEventListener('mouseenter', (e) => {

            const pokemonObject = startingPoke[index];

            if (pokemonObject) {
                if (pokemonObject.isCaught === true) {
                    pokemonObject.isCaught = false;
                    console.log(pokemonObject.isCaught);
                    imgToggle(pokemonObject);
                } else {
                    pokemonObject.isCaught = true;
                    imgToggle(pokemonObject);
                    console.log(pokemonObject.isCaught);
                }
            checkGameOver(startingPoke);
            imgToggle(pokemonObject);
            }
  
        });
    });
}

const manageHighScores = () => {
    return {
        addHighScore: (player) => {
            const highScoreArray = JSON.parse(localStorage.getItem('highScores')) || [];
            highScoreArray.push(player)
            localStorage.setItem('highScores', JSON.stringify(highScoreArray))
        },
        getHighScores: () => {
            return JSON.parse(localStorage.getItem('highScores')) || [];
        },    
        clearHighScore: () => {
            localStorage.removeItem('highScores');
        },
        sortHighScores: () => {
            let highScoreArray = JSON.parse(localStorage.getItem('highScores')) || [];
            highScoreArray.sort((a, b) => b.score - a.score);
            highScoreArray = highScoreArray.slice(0, 10);
            localStorage.setItem('highScores', JSON.stringify(highScoreArray));
        } 
    }
}

// Om pokemon ej isCaught, byta till pokeboll. Om isCaught, byta till pokemonbild
function imgToggle(pokemonObject) {
    console.log(pokemonObject.id);
    if (pokemonObject.isCaught) {
        pokemonObject.img = `./assets/ball.webp`;
    } else {
        pokemonObject.img = pokemonObject.originalImg; // Återgå till ursprungliga bilden
    }
    const imgElement = document.getElementById(pokemonObject.id);
    console.log // Ensure each Pokémon has a unique ID
    imgElement.src = pokemonObject.img;
}

//Kallas på vid hoverIn & hover Out function 
function checkGameOver(startingPoke) {
    if (startingPoke.every(pokemonObject => pokemonObject.isCaught === true)) {
        console.log('spelet är slut');
        playPauseMusic();
        // timer.endTimeInMilliseconds();
        
    } else {
        console.log('alla är inte isCaught, fortsätt spela');
    }
}

// --- END GAME LOGIC ---- 

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
        score: 0,
    }

    return {
        getPlayerInfo: (() => {
            return player;
        }),
        getPlayerName: (() => {
            return player.name;
        }),
        getPlayerScore: (() => {
            return player.score;
        }),
        setPlayerScore: ((time) => {
            player.score = time;
        })
    }
}

function setPlayerInfo (player) {
    let nameNode = document.createTextNode(player.getPlayerName());
    let scoreNode = document.createTextNode(player.getPlayerScore());
    document.querySelector('.playerName').appendChild(nameNode);
    document.querySelector('.playerScore').appendChild(scoreNode);
}

// --- END PLAYER LOGIC ---


// ---Timer/poängräknare ----------- placeholder, otestad live
const timer = {
    beginning: 0,
    ending: 0,
    startTimeInMilliseconds: function() {
        this.beginning = Date.now();
    },
    endTimeInMilliseconds: function() {
        this.ending = Date.now();
    },
    nmbrOfMilliseconds: function() {
        return this.ending - this.beginning;
    }
};

timer.startTimeInMilliseconds();
timer.endTimeInMilliseconds();
// Här behöver vi referera tillbaka räknaren till ett visuellt element i html:en
// console.log("Tid:", timer.startTimeInMilliseconds());
console.log("Pts:", timer.nmbrOfMilliseconds());
// ------------------  endTimer




