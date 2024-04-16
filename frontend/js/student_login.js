const formData = new FormData(document.getElementById("form"));
const submit = document.getElementById("submit_btn");
const reset = document.getElementById("reset_btn");
const roll = document.getElementById("roll");



submit.disabled = true;
reset.disabled = true;
var sendOtp = 0;

reset.addEventListener("click", () => {
	window.location.href = "../html/student_login.html";
})


roll.addEventListener("keydown", (e) => {

	if (e.key == "Enter" && roll.value) {

		formData.append("roll", roll.value);

		fetch("../../backend/php/student_login.php", {
			method: "POST",
			// Set the FormData instance as the request body
			body: formData,
			mode: 'no-cors',
		})
			.then((response) => {
				reset.disabled = false;
				reset.style.display = "inline-block";
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
					document.getElementById("radio2").disabled = true;

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

		// sending otp sending medium(eg. email)
		formData.append("otpMode", e.target.value);
		formData.append("name", userName);
		loading();
		fetch("../../backend/php/student_login.php", {
			method: "POST",
			body: formData,
			mode: "no-cors",
		})
			.then((response) => {
				swal.close();
				return response.json()
			})
			.then((data) => {
				
				//  response code --100--  mail send successfully
				if (data.status === 100) {

					sendOtp = data.sendotp;

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
					document.getElementById("submit_btn").style.display = "inline-block";
					document.getElementById("radio1").disabled = true;
					document.getElementById("radio3").disabled = true;
					submit.disabled = false;
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

submit.addEventListener("click",  () => {

	const userOtp = document.getElementById("check_otp").value;

	if(userOtp){		
		if(userOtp == sendOtp){
			window.location.href="../html/student_landing.html";
			
		}else{
			Swal.fire({
				// position: "top-end",
				icon: "error",
				title: "!!! Wrong OTP",
				showConfirmButton: false,
				timer: 1000
			});
		}
	}else{
		Swal.fire({
			// position: "top-end",
			icon: "warning",
			title: "!!! Enter OTP",
			showConfirmButton: false,
			timer: 1000
		});
	}
})



function loading() {
	Swal.fire({
		title: "Loading...",
		width: "550",
		imageUrl: "../img/loading 3.gif",
		imageWidth: 400,
		imageHeight: 350,
		imageAlt: "Custom image",
		backdrop: `rgba(0,0,123,0.4)`,
		showConfirmButton: false,
		allowEscapeKey: false,
		allowOutsideClick: false
	});
}