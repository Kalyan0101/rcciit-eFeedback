const url_para = new URLSearchParams(window.location.search);

const t_body = document.getElementById('t_body');
const add_qsn_btn = document.getElementById('add_qsn_btn');

if (url_para.has('id')) {
    const id = url_para.get('id');
} else {
    Swal.fire({
        title: "Do Not Change The URL Variable!!!",
        text: "You won't be able to access this page!",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Go Back!"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = './session.html'
        }
    });
}

add_qsn_btn.addEventListener('click', async () => {
    const { value: formValues } = await Swal.fire({
        title: "Multiple inputs",
        confirmButtonText: "Submit",
        // allowEscapeKey: false,
        // allowOutsideClick: false,
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Question Set Name" required>
          <textarea id="swal-input2" class="swal2-textarea" placeholder="Enter Question 1"></textarea>
          <textarea id="swal-input3" class="swal2-textarea" placeholder="Enter Question 2"></textarea>
          <textarea id="swal-input4" class="swal2-textarea" placeholder="Enter Question 3"></textarea>
          <textarea id="swal-input5" class="swal2-textarea" placeholder="Enter Question 4"></textarea>
          <textarea id="swal-input6" class="swal2-textarea" placeholder="Enter Question 5"></textarea>
          <textarea id="swal-input7" class="swal2-textarea" placeholder="Enter Question 6"></textarea>
          <textarea id="swal-input8" class="swal2-textarea" placeholder="Enter Question 7"></textarea>
          <textarea id="swal-input9" class="swal2-textarea" placeholder="Enter Question 8"></textarea>
          <textarea id="swal-input10" class="swal2-textarea" placeholder="Enter Question 9"></textarea>
          <textarea id="swal-input11" class="swal2-textarea" placeholder="Enter Question 10"></textarea>
        `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById("swal-input1").value,
                document.getElementById("swal-input2").value,
                document.getElementById("swal-input3").value,
                document.getElementById("swal-input4").value,
                document.getElementById("swal-input5").value,
                document.getElementById("swal-input6").value,
                document.getElementById("swal-input7").value,
                document.getElementById("swal-input8").value,
                document.getElementById("swal-input9").value,
                document.getElementById("swal-input10").value,
                document.getElementById("swal-input11").value
            ];
        }
    });
    console.log(formValues);
    // console.log(formValues[1].split('\n').join(' '));
    for(let i = 0; i < formValues.length; i++){
        formValues[i] = formValues[i].split('\n').join(' ');
    }
    formValues.forEach(element => {
        console.log(element);
    });
})