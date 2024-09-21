const url_para = new URLSearchParams(window.location.search);

const qns_body = document.getElementById('qns_body');
const set_body = document.getElementById('set_body');
const add_qsn_btn = document.getElementById('add_qsn_btn');
const create_qns_btn = document.getElementById('create_qns_btn');
const date = new Date();
const newDate = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


// if there is valid id found in the URL then fetch it and create table into DB accordingly
if (url_para.has('id')) {
    const id = url_para.get('id');
    let f_data = new FormData();
    f_data.append("id", id);
    fetch("../../backend/php/session.php", {
        method: "POST",
        body: f_data,
        mode: "no-cors"
    })
        .then((res) => res.json())
        .then((data) => {
        })
} else {
    Swal.fire({
        title: "<span class='error'>You won't be able to access this page!</span>",
        text: "Don't change the URL variable!!!",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Go Back!",
        allowEscapeKey: false,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = './sessionMaster.html'
        }
    });
}
question_data();
question_set();

create_qns_btn.addEventListener("click", () => {
    const checkBox = document.querySelectorAll('input[type="checkbox"]:checked');
    const qnsList = Array.from(checkBox).map(checkBox => checkBox.id);


    if (qnsList.length == 0) {
        Swal.fire({
            title: "Nothing is Selected",
            text: "To create a question set you has to select atleast one question.",
            icon: "warning",
        })
    }
    if (qnsList.length > 0) {
        Swal.fire({
            title: "Question Set Name",
            input: "text",
            inputLabel: "Optional*",
            inputPlaceholder: "Enter Question set Name",
            showCancelButton: true,
            confirmButtonText: "Create",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    if (result.value || date) {
                        let formData = new FormData();

                        formData.append("q_set_name", result.value || `Set ${newDate}`);
                        formData.append("q_list", qnsList);
                        fetch("../../backend/php/session.php", {
                            method: "POST",
                            body: formData,
                            mode: "no-cors"
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.code == '01' || data.code == "02") {
                                    Swal.fire({
                                        title: `<span class="error">${data.msg}</span>`,
                                        icon: "error"
                                    })
                                }
                                if (data.code == '12') {
                                    question_set();
                                    window.location.reload();
                                }
                            })

                    }

                }
            })

    }
})

add_qsn_btn.addEventListener('click', async () => {

    const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Enter Question",
        inputPlaceholder: "Type question here...",
        inputAttributes: {
            "aria-label": "Type question here"
        },
        showCancelButton: true
    });
    if (text) {
        const f_data = new FormData();
        f_data.append('question', text);
        fetch("../../backend/php/session.php", {
            method: "POST",
            body: f_data,
            mode: "no-cors"
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.code == '01' || data.code == '02') {
                    Swal.fire({
                        icon: "error",
                        title: `<span class="error">${data.msg}</span>`,

                    });
                }
                if (data.code == '12') {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "New Question Added."
                    });
                    question_data(); // call after every successfully addition of question
                }
            })
    }
})

// ############################ function ###################################

// showing data on page
function question_data() {
    fetch("../../backend/php/session.php?qns=true")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.code != '03') {
                let i = 0;
                let table_data = '';
                data.map((outerArray) => outerArray)
                    .map((innerArray) => {
                        table_data += `<tr>
                            <td>${++i}</td>
                            <td>
                                <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="${innerArray[0]}">
                                </div>
                            </td>
                            <td>${innerArray[1]}</td>
                            <td>
                                <button onclick=delete_qns(\'${innerArray[0]}\') class="btn_img"><img src="../img/delete_logo.svg" alt=""></button>
                            </td>
                        </tr>`
                    })
                qns_body.innerHTML = table_data;
            }
        })
}

// showing question set name
function question_set() {
    fetch("../../backend/php/session.php?questionSet=true")
        .then(res => res.json())
        .then((data) => {
            if (data.code != '01') {
                let i = 0;
                let table_data = '';
                data.map((outerArray) => outerArray)
                    .map((innerArray) => {
                        table_data += `<tr onclick=update_qns(\'${innerArray[0]}\') >
                            <td>${++i}</td>
                            <td>${innerArray[1]}</td>
                            <td>
                                <button onclick="event.stopPropagation(); delete_qns('${innerArray[0]}')" class="btn_img"><img src="../img/delete_logo.svg" alt=""></button>
                            </td>
                        </tr>`
                    })
                set_body.innerHTML = table_data;
            }
        })
}

function update_qns(id){
    fetch(`../../backend/php/session.php?Selected_questionSet=${id}`)
    .then( res => res.json())
    .then((data) => {
        console.log(data);        
    })
}

// responsible for deleting question
function delete_qns(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {

            let f_data = new FormData();
            f_data.append('delete_id', id);
            fetch("../../backend/php/session.php", {
                method: "POST",
                body: f_data,
                mode: "no-cors"
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    question_data();  // update view of question table
                    question_set();   // update view of question set table
                })
        }
    })
}


// stop propagation 
