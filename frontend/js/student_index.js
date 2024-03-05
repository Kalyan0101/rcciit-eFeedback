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
    var formData = new FormData(document.getElementById("form"));

    $.ajax({
        type: "POST",
        url: "../../backend/php/student_index.php",
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false,
        cache: false,
    }).success(function (data) {
        console.log(typeof(data));
    })
})