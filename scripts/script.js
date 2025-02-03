const log = (msg) => console.log(msg);

// I denna fil skriver ni all er kod






//Eventlistener submit form
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    //validateForm(formData.get('username'), formData.get('age'), formData.get('gender'))
})