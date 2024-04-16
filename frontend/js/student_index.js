const formData = new FormData(document.getElementById("form"));
const submit = document.getElementById("btn").disabled = true;

let roll = document.getElementById("roll");
roll.addEventListener("keydown", (e) => {

	if (e.key == "Enter" && roll.value) {

		formData.append("roll", roll.value);

		fetch("../../backend/php/student_index.php", {
			method: "POST",
			// Set the FormData instance as the request body
			body: formData,
			mode: 'no-cors',
		})
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				// response code --0-- roll number not matched
				if (data.status === 0) {
					Swal.fire({
						title: 'Error!',
						text: 'Roll Number Not Found',
						icon: 'error',
						confirmButtonText: 'OK'
					});
				}

				// response code --200-- roll number matched
				if (data.status === 200) {
					// change visibility
					document.getElementById("radio").style.display = "block";
					document.getElementById("roll").disabled = true;

					// manipulate DOM for showing student data fetched form database
					document.getElementById("email").innerHTML = data.email;
					document.getElementById("mobile").innerHTML = data.mobile;

					//
					document.getElementById("mobile").disabled = true;

					// set tag values
					document.getElementById('name').value = data.name;
					document.getElementById('radio1').value = data.email;
					document.getElementById('radio2').value = data.mobile;
				}
			})
			.catch((e) => {
				console.error(e);
			})
	}
})

const radioBtns = document.querySelectorAll('input[name = "optradio"]');

for (const radiobtn of radioBtns) {

	radiobtn.addEventListener("change", (e) => {

		userName = document.getElementById("name").value;
		console.log(userName);
		
		// sending otp sending medium(eg. email)
		formData.append("otpMode", e.target.value);
		formData.append("name", userName);

		fetch("../../backend/php/student_index.php", {
			method: "POST",
			body: formData,
			mode: "no-cors",
		})
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				console.log(data);

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
						title: "Mail Send Sucessfully."
					});

					document.getElementById("otp").style.display = "flex";
					document.getElementById("btn").style.display = "flex";
					document.getElementById("btn").disabled = false;

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
			})
			.catch((e) => {
				console.error(e);
			})
	})
}
































// // $("#form").submit(function(e){
// $("#form").submit(function (e) {
// 	e.preventDefault();


// 	// const formdata = new formdata(document.getElementById("form"));
// 	const formData = new FormData(document.getElementById("form"));
// 	// console.log(typeof formData);
// 	// console.log(formData);
// 	// formData.forEach((value, key)=>{
// 	//     console.log(`${key}: ${value}`);
// 	// })

// 	$.ajax({
// 		type: "POST",
// 		url: "../../backend/php/student_index.php",
// 		data: formData,
// 		dataType: "json",
// 		processData: false,
// 		contentType: false,
// 		cache: false,
// 		success: function (data) {

// 			// response code --0-- roll number not matched
// 			if (data.status === 0) {
// 				Swal.fire({
// 					title: 'Error!',
// 					text: 'Roll Number Not Found',
// 					icon: 'error',
// 					confirmButtonText: 'OK'
// 				});
// 			}

// 			// response code --104-- mail not send
// 			if (data.status === 104) {
// 				const Toast = Swal.mixin({
// 					toast: true,
// 					position: "top-end",
// 					showConfirmButton: false,
// 					timer: 3000,
// 					timerProgressBar: true,
// 					didOpen: (toast) => {
// 						toast.onmouseenter = Swal.stopTimer;
// 						toast.onmouseleave = Swal.resumeTimer;
// 					}
// 				});
// 				Toast.fire({
// 					icon: "error",
// 					title: "Mail not send"
// 				});
// 			}

// 			// response code --200-- roll number matched
// 			if (data.status === 200) {
// 				// change visibility
// 				document.getElementById("radio").style.display = "block";

// 				// manipulate DOM for showing student data fetched form database
// 				document.getElementById("email").innerHTML = data.email;
// 				document.getElementById("mobile").innerHTML = data.mobile;

// 				// set tag values
// 				document.getElementById('name').value = data.name;
// 				document.getElementById('radio1').value = data.email;
// 				document.getElementById('radio2').value = data.mobile;
// 			}

// 			//  response code --100--  mail send successfully
// 			if (data.status === 100) {
// 				const Toast = Swal.mixin({
// 					toast: true,
// 					position: "top-end",
// 					showConfirmButton: false,
// 					timer: 3000,
// 					timerProgressBar: true,
// 					didOpen: (toast) => {
// 						toast.onmouseenter = Swal.stopTimer;
// 						toast.onmouseleave = Swal.resumeTimer;
// 					}
// 				});
// 				Toast.fire({
// 					icon: "success",
// 					title: "Mail Send Sucessfull."
// 				});

// 				document.getElementById("otp").style.display = "flex";
// 				document.getElementById("check_otp").value = 1;
// 			}
// 		}
// 	})
// })