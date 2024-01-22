const currentuser = document.getElementById("currentuser");
const logoutcurrentuserbtn = document.getElementById("logoutcurrentuserbtn");
// when the user logged in and stored its credentials then redirect the user to profile page
let currentloggedinuser = localStorage.getItem("currentusername")
  ? localStorage.getItem("currentusername")
  : "";
currentuser.innerHTML = currentloggedinuser;
if (currentloggedinuser == "") {
  location.href = "login.html";
}
// if the user clicks on the logout button then remove its login credentials and redirect to login page
logoutcurrentuserbtn.addEventListener("click", () => {
  location.href = "login.html";
  localStorage.removeItem("currentusername");
});
