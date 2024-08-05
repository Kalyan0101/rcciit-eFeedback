const url_para = new URLSearchParams(window.location.search);

const t_body = document.getElementById('t_body');
const add_qsn_btn = document.getElementById('add_qsn_btn');

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
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);

        })
} else {
    Swal.fire({
        title: "Do Not Change The URL Variable!!!",
        text: "You won't be able to access this page!",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Go Back!"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = './sessionMaster.html'
        }
    });
}

question_data();

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

// responsible for showing data on page
function question_data() {
    fetch("../../backend/php/session.php")
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
                            <td>${innerArray[1]}</td>
                            <td>
                                <button onclick=delete_qns(\'${innerArray[0]}\') class="btn_img"><img src="../img/delete_logo.svg" alt=""></button>
                            </td>
                        </tr>`
                    })
                t_body.innerHTML = table_data;
            }
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
        confirmButtonText: "Yes, delete it!"
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
                })
        }
    })

}