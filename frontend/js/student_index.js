<<<<<<< HEAD
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
=======
const drop = document.getElementById('mailRno')
    document.querySelector('.mail').style.display='block';

    drop.addEventListener('change', ()=>{
        if(drop.value == 1){
            document.querySelector('.mail').style.display='block';
            document.querySelector('.number').style.display='none';
        }
        else if(drop.value == 2){            
            document.querySelector('.number').style.display='block';
            document.querySelector('.mail').style.display='none';
        }
    })
>>>>>>> c5e32074c9b80816832b98a9212a1f5f088850e6
