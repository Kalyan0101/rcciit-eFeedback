// {
//     const roll = document.getElementById("roll");

// }

// // select otp mode
// {
//     if (document.querySelector('input[name="optradio"]')) {
//         document.querySelectorAll('input[name="optradio"]').forEach((ele) => {
//             ele.addEventListener('click', (e) => {
//                 var otpMode = e.target.value;
//                 console.log(otpMode);
//             })
//         })
//     }
// }

// $("#form").submit(function(e){
$("#form").submit(function (e) {
    e.preventDefault();


    // const formdata = new formdata(document.getElementById("form"));
    const formData = new FormData(document.getElementById("form"));
    formData.forEach((value, key)=>{
        console.log(`${key}: ${value}`);
    })

    $.ajax({
        type: "POST",
        url: "../../backend/php/student_index.php",
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            if (data.status === 0) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Roll Number Not Found',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }

            if (data.status === 200) {
                document.getElementById("radio").style.display = "block";
                document.getElementById("email").innerHTML = data.email;
                document.getElementById("mobile").innerHTML = data.mobile;

                document.getElementById('radio1').value = data.email;
                document.getElementById('name').value = data.name;
            }
        }
        // ,
        // error: function(xhr, status, error) {
        //     console.log(xhr.responseText);
        //     console.log(status);
        //     console.log(error);
        // }
    })
})