const currentuser = document.getElementById("currentuser");
const logoutcurrentuserbtn = document.getElementById("logoutcurrentuserbtn");
// when the user logged in and stored its credentials then redirect the user to profile page
// decrypting the user's login credentials using localstorage's atob() method
let currentloggedinuser = localStorage.getItem("Y3VycmVudHVzZXJuYW1l")
  ? localStorage.getItem("Y3VycmVudHVzZXJuYW1l")
  : "";
currentuser.innerHTML = atob(currentloggedinuser);
if (currentloggedinuser == "") {
  location.href = "login.html";
}
// if the user clicks on the logout button then remove its login credentials and redirect to login page
logoutcurrentuserbtn.addEventListener("click", () => {
  location.href = "login.html";
  // localstorage's encrypted key is being deleted
  localStorage.removeItem("Y3VycmVudHVzZXJuYW1l");
});
