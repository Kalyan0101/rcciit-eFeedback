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
    var formdata = new formdata(document.getElementById("form"));
    console.log(formdata);

    // $.ajax({
    //     url: "../../backend/php/student_index.php",
    //     type: "POST",
    //     data: formdata,
    //     dataType: "json",
    //     success: function (res) {
    //         console.log(res);
    //     }
    // })
})
