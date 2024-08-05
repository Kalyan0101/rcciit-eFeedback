const date = new Date();
const year = document.getElementById('year');
const course = document.getElementById('course');
const sem = document.getElementById('sem');
const sub_btn = document.getElementById('sub_btn');
const t_body = document.getElementById('t_body');
const edit_btn = document.getElementById('edit_btn');
const reset = document.querySelector('.btn-danger');

// this for session value eg: 2024 - 2025
let currentYear = date.getFullYear();
for (let i = (currentYear-5); i <= (currentYear+2); i++ ){
    // console.log(i);
    const session_option = document.createElement('option');
    session_option.setAttribute('value', `${i} - ${i+1}`);
    session_option.innerText = `${i} - ${i+1}`;

    if(i == currentYear){
        session_option.setAttribute('selected', true);
    }
    year.appendChild(session_option);
}
year.setAttribute('value', `${currentYear} - ${currentYear + 1}`);

// call the function first time for showing the data on page
sessionData(); 

// for showing data on page
function sessionData() {
    let f_data = new FormData();
    f_data.append('session_data_call', '1');
    fetch("../../backend/php/sessionMaster.php", {
        method: "POST",
        body: f_data,
        mode: "no-cors"
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if (data.code == '00' || data.code == '10') {
            console.log(data.msg);
        }
        if (data.code != '00' && data.code != '10') {
            let i = 0;
            let table = '';
            data.map((outterARRAY) => outterARRAY)
            .map((innerArray) => {
                // console.log(innerArray);
                const myArray = innerArray[1].split('_');
                // preparing table row for display
                table += `<tr>
                        <td>${++i}</td>
                        <td>${myArray[0]}</td>
                        <td>${myArray[1]}</td>
                        <td>${myArray[2]}</td>
                        <td>${myArray[3]}</td>
                        <td>${innerArray[2]}</td>
                        <td>${innerArray[3]}</td>
                        <td>${innerArray[4]}</td>
                        <td><button type="button" class="btn btn-primary" onclick=edit_session(\'${innerArray[0]}\')>Edit</button></td>
                    </tr>`;
                })
            t_body.innerHTML = table;                
        }
    })
};

//  redirected to another page with some values 
function edit_session(id){
    window.location.href=`./session.html?id=${id}`;
}

// this is for #course/department dropdown
fetch("../../backend/php/sessionMaster.php")
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
//  for semester dropdown
course.addEventListener("change", (e) => {
    let formData = new FormData();
    formData.append("course", e.target.value);
    // console.log(e.target.value);
    fetch("../../backend/php/sessionMaster.php", {
        method: "POST",
        body: formData
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            sem.innerHTML = '';
            for (let i = 1; i <= data[0]; i++) {
                const sem_option = document.createElement('option');
                sem_option.setAttribute('value', i);
                sem_option.innerText = i;
                sem.appendChild(sem_option);

            }
        })
})

// form data submited to backend for creating new session
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
    const currDate = date.toDateString();

    formData.append('s_cre_date', currDate);
    fetch("../../backend/php/sessionMaster.php", {
        method: 'POST',
        body: formData
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            // trigger when some error occurs
            if (data.code == '01' || data.code == '02') {
                Swal.fire({
                    title: 'Error!',
                    text: data.msg,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

            // trigger while success
            if (data.code == '12') {
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
        .then( () => {
            sessionData();
            document.getElementById('session_form').reset();            
        })

})

reset.addEventListener('click', () => {
    window.location.reload();
})