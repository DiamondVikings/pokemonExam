// I denna fil skriver ni all er kod

document.addEventListener('DOMContentLoaded', () => {
    const log = (msg) => console.log(msg);
  
    //Eventlistener submit form
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        //validateForm(formData.get('username'), formData.get('age'), formData.get('gender'))
    });
    
      const audio = new Audio('assets/pokemon_vs_trainer.mp3')
      function playPauseMusic () {
          if (audio.paused) {
              audio.play();
          } else {
              audio.pause();
          }
      }   
  });

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
        document.querySelector("#errorMsg").textContent = "";
        return true;
    } catch (error) {
        document.querySelector("#errorMsg").textContent = error.message;
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
        document.getElementById("errorMsg").textContent = "";
        return true;
    } catch (error) {
        document.getElementById("errorMsg").textContent = error.message;
        return false;
    }
}
