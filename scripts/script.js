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

//BakgrundsBild
function changeBackgroundImage() {
    document.body.style.backgroundImage = `url('./assets/arena-background.png')`;
}

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


//Creat player object
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


// console.log("Tid:", timer.startTimeInMilliseconds());
console.log("Pts:", timer.nmbrOfMilliseconds());

// ------------------  endTimer