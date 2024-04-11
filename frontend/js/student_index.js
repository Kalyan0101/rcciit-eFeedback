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
  // formData.forEach((value, key)=>{
  //     console.log(`${key}: ${value}`);
  // })

  $.ajax({
    type: "POST",
    url: "../../backend/php/student_index.php",
    data: formData,
    dataType: "json",
    processData: false,
    contentType: false,
    cache: false,
    success: function (data) {

      // response code --0-- roll number not matched
      if (data.status === 0) {
        Swal.fire({
          title: 'Error!',
          text: 'Roll Number Not Found',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }

      // response code --104-- mail not send
      if (data.status === 104) {
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
          icon: "error",
          title: "Mail not send"
        });
      }

      // response code --200-- roll number matched
      if (data.status === 200) {
        // change visibility
        document.getElementById("radio").style.display = "block";

        // manipulate DOM for showing student data fetched form database
        document.getElementById("email").innerHTML = data.email;
        document.getElementById("mobile").innerHTML = data.mobile;

        // set tag values
        document.getElementById('name').value = data.name;
        document.getElementById('radio1').value = data.email;
        document.getElementById('radio2').value = data.mobile;
      }

      //  response code --100--  mail send successfully
      if (data.status === 100) {
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
          title: "Mail Send Sucessfull."
        });
      }
    }
  })
})