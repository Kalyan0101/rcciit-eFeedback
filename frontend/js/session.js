const date = new Date();
const year = document.getElementById('year');
const course = document.getElementById('course');
const sem = document.getElementById('sem');
const sub_btn = document.getElementById('sub_btn');
const t_body = document.getElementById('t_body'); 

// this for session value
let currentYear = date.getFullYear();
year.setAttribute('value', `${currentYear} - ${currentYear + 1}`);

// for showing data on page
sub_btn.addEventListener('click', () => {

    const data = new FormData();
    data.append('session_data_call', '1');
    fetch("../../backend/php/session.php", {
        method: "POST",
        body: data,
        mode: "no-cors"
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if(data.code == '00' || data.code == '10'){
            console.log(data.msg);
        }
        if (data.code != '00' && data.code != '10') {
            console.log(data);
        }
    })
});
    
    
    










// this is for #course dropdown
fetch("../../backend/php/session.php")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        // console.log(data);
        // console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i]);
            const cor_option = document.createElement('option');
            cor_option.setAttribute('value', data[i][1]);
            cor_option.innerText = data[i][1];
            course.appendChild(cor_option);
        }

    })
course.addEventListener("change", (e) => {
    let formData = new FormData();
    formData.append("course", e.target.value);
    // console.log(e.target.value);
    fetch("../../backend/php/session.php", {
        method: "POST",
        body: formData
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
sub_btn.addEventListener('click', (e) => {
    e.preventDefault();

    const session = document.getElementById('year');
    const sem = document.getElementById('sem');
    const slot = document.getElementById('slot');
    const s_date = document.getElementById('s_date');
    const e_date = document.getElementById('e_date');

    // form validation
    if (session.value == "") {
        session.focus();
        return false;
    }
    if (sem.value == "") {
        sem.focus();
        return false;
    }
    if (slot.value == "") {
        slot.focus();
        return false;
    }
    if (s_date.value == "") {
        s_date.focus();
        return false;
    }
    if (e_date.value == "") {
        e_date.focus();
        return false;
    }



    const formData = new FormData(document.getElementById('session_form'));
    fetch("../../backend/php/session.php", {
        method: 'POST',
        body: formData
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            // trigger when some error occurs
            if (data.code == '0') {
                Swal.fire({
                    title: 'Error!',
                    text: data.msg,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

            // trigger while success
            if (data.code == '1') {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: data.msg // new session created
                });
            }
        })

})