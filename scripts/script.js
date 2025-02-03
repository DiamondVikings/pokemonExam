// I denna fil skriver ni all er kod

document.addEventListener('DOMContentLoaded', () => {
    const log = (msg) => console.log(msg);
  
    //Eventlistener submit form
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        //validateForm(formData.get('username'), formData.get('age'), formData.get('gender'))
      })
    
      // I denna fil skriver ni all er kod
      const audio = new Audio('assets/pokemon_vs_trainer.mp3')
      function playPauseMusic () {
          if (audio.paused) {
              audio.play();
          } else {
              audio.pause();
          }
      }   
  });

  function changeBackgroundImage() {
    document.body.style.backgroundImage = `url('../assets/arena-background.png')`;
  }

  function validateName() {
    try {
        let nameInput = document.getElementById("nick");  
        let trainerName = nameInput.value.trim();

        if (trainerName === "") {
            throw new Error("Name cannot be empty.");
        }

    }  



});

        if (trainerName.length < 5 || trainerName.length > 10) {
            throw new Error("Name must be between 5 and 10 characters long.");
        }
        oGameData.trainerName = trainerName;
        nameInput.placeholder = "Trainer nickname";
        return true;
    } catch (error) {
        document.getElementById("nick").placeholder = error.message;
        return false;
    }
}



