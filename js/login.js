const emailfield = document.getElementById("emailfield");
const passwordfield = document.getElementById("passwordfield");
const erroremail = document.getElementById("erroremail");
const errorpassword = document.getElementById("errorpassword");
// by default the valid input fields are set to false so the user cannot submit the form if the input fields are passed by the regex (regular expression) then valid fields are set to true and the user can submit the form
let validemail = false;
let validpassword = false;
emailfield.addEventListener("blur", (e) => {
  let regex = /^([\-_\.a-zA-Z0-9]+)@([\-_\.a-zA-Z0-9]+)\.([a-zA-Z]){1,30}$/;
  let email = emailfield.value;
  if (regex.test(email)) {
    console.log(`valid email id`);
    erroremail.innerHTML = ``;
    emailfield.classList.remove("invalid");
    validemail = true;
  } else {
    console.log(`email id is invalid`);
    erroremail.innerHTML = `invalid email id`;
    emailfield.classList.add("invalid");
    validemail = false;
  }
});
passwordfield.addEventListener("blur", (e) => {
  let regex = /^([a-zA-Z0-9]+){8,20}$/;
  let password = passwordfield.value;
  if (regex.test(password)) {
    console.log(`password is valid`);
    errorpassword.innerHTML = ``;
    passwordfield.classList.remove("invalid");
    validpassword = true;
  } else {
    console.log(`password is invalid`);
    errorpassword.innerHTML = `Password must be atleast 8 characters long`;
    passwordfield.classList.add("invalid");
    validpassword = true;
  }
});
// ================= toggle password visibility =================
const showhidepassword = document.getElementById("showhidepassword");
showhidepassword.addEventListener("click", () => {
  showhidepassword.classList.toggle("fa-eye");
  if (passwordfield.type === "password") {
    passwordfield.type = "text";
  } else {
    passwordfield.type = "password";
  }
});
// if all the user inputs are valid then we can submit the form and it will show success or error message depending upon the user's input or if the existing emailid user tries to again register then it will get existing email id validation error
const submitbtn = document.querySelector(".submitbtn");
const detailsform = document.querySelector(".detailsform");
const formerrormessage = document.getElementById("formerrormessage");
const formsuccessmessage = document.getElementById("formsuccessmessage");
const emailiduserexists = document.getElementById("emailiduserexists");
const usernotregistered = document.getElementById("usernotregistered");
// if the user hasn't logged out from the profile then without logging out user can't see the login page
let currentloggedinuser = localStorage.getItem("currentusername")
  ? localStorage.getItem("currentusername")
  : "";
if (currentloggedinuser != "") {
  location.href = "profile.html";
}
detailsform.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validemail && validpassword) {
    formsuccessmessage.style.display = "block";
    formerrormessage.style.display = "none";
    console.log("ok");
    // ================= store user's login details in localstorage in encrypted form using btoa() localstorage method =================
    let storeemail = btoa(emailfield.value);
    let storepassword = btoa(passwordfield.value);
    // ================= retrieve user's login details from localstorage =================
    let formdatabase = new Array();
    formdatabase = JSON.parse(localStorage.getItem("formdata"))
      ? JSON.parse(localStorage.getItem("formdata"))
      : [];
    // ================= check if the user's email & password is registered with us =================
    if (
      formdatabase.some((registereduser) => {
        return (
          registereduser.emailid === storeemail &&
          registereduser.password === storepassword
        );
      })
    ) {
      let storecurrentuserdetails = formdatabase.find((currentuserdetails) => {
        return (
          currentuserdetails.emailid === storeemail &&
          currentuserdetails.password === storepassword
        );
      });
      // ================= export and print current logged in user email address =================
      if (storecurrentuserdetails) {
        localStorage.setItem("currentusername", storecurrentuserdetails.name);
      }
      usernotregistered.style.display = "none";
      formsuccessmessage.style.display = "block";
      location.href = "profile.html";
    } else {
      // ================= user is registered with us so the user can't log in =================
      usernotregistered.style.display = "block";
      formerrormessage.style.display = "none";
      formsuccessmessage.style.display = "none";
    }
    detailsform.reset();
  } else {
    formsuccessmessage.style.display = "none";
    formerrormessage.style.display = "block";
    detailsform.reset();
    console.log("not ok");
  }
});
