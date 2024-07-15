const date = new Date();
const year = document.getElementById('year');
const course = document.getElementById('course');
const sem = document.getElementById('sem');

// this for session value
let currentYear = date.getFullYear();
year.setAttribute('value', `${currentYear} - ${currentYear + 1}`);

// this is for #course dropdown
fetch("../../backend/php/session.php")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        // console.log(data);
        // console.log(data.length);
        for(let i = 0; i < data.length; i++){
            // console.log(data[i]);
            const cor_option = document.createElement('option');
            cor_option.setAttribute('value', data[i][1]);
            cor_option.innerText = data[i][1];
            course.appendChild(cor_option);
        }

    })
course.addEventListener("change", (e)=>{
    let formData = new FormData();
    formData.append("course", e.target.value);
    // console.log(e.target.value);
    fetch("../../backend/php/session.php", {
        method : "POST",
        body : formData
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        // console.log(data[0]);
        sem.innerHTML = '';
        for (let i = 1; i <= data[0]; i++) {
            const sem_option = document.createElement('option');
            sem_option.setAttribute('value', i);
            sem_option.innerText = i;
            sem.appendChild(sem_option);
            
        }
    })
    
})