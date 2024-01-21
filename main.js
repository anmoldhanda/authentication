const namefield = document.getElementById("namefield");
const emailfield = document.getElementById("emailfield");
const phonefield = document.getElementById("phonefield");
const passwordfield = document.getElementById("passwordfield");
const errorname = document.getElementById("errorname");
const erroremail = document.getElementById("erroremail");
const errorphone = document.getElementById("errorphone");
const errorpassword = document.getElementById("errorpassword");
// by default the valid input fields are set to false so the user cannot submit the form if the input fields are passed by the regex (regular expression) then valid fields are set to true and the user can submit the form
let validname = false;
let validemail = false;
let validphone = false;
let validpassword = false;
namefield.addEventListener("blur", (e) => {
  let regex = /^([a-zA-Z]){1,30}$/;
  let name = namefield.value;
  if (regex.test(name)) {
    console.log(`valid name`);
    errorname.innerHTML = ``;
    namefield.classList.remove("invalid");
    validname = true;
  } else {
    console.log(`name is invalid`);
    errorname.innerHTML = `invalid name`;
    namefield.classList.add("invalid");
    validname = false;
  }
});
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
phonefield.addEventListener("blur", (e) => {
  let regex = /^([0-9]){10}$/;
  let phone = phonefield.value;
  if (regex.test(phone)) {
    console.log(`phone number is valid`);
    errorphone.innerHTML = ``;
    phonefield.classList.remove("invalid");
    validphone = true;
  } else {
    console.log(`phone number is invalid`);
    errorphone.innerHTML = `Phone number must be atleast 10 digits long`;
    phonefield.classList.add("invalid");
    validphone = false;
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
const detailsform = document.querySelector(".formdesign");
const formerrormessage = document.getElementById("formerrormessage");
const formsuccessmessage = document.getElementById("formsuccessmessage");
const emailiduserexists = document.getElementById("emailiduserexists");
detailsform.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validname && validemail && validphone && validpassword) {
    formsuccessmessage.style.display = "block";
    formerrormessage.style.display = "none";
    console.log("ok");
    // ================= store user's details in localstorage =================
    let storename = namefield.value;
    let storeemail = emailfield.value;
    let storephone = phonefield.value;
    let storepassword = passwordfield.value;
    // ================= retrieve user's details from localstorage =================
    let formdatabase = new Array();
    formdatabase = JSON.parse(localStorage.getItem("formdata"))
      ? JSON.parse(localStorage.getItem("formdata"))
      : [];
    // ================= check for duplicate entries of user's existing email address =================
    if (
      formdatabase.some((duplicatedataentry) => {
        return duplicatedataentry.emailid === storeemail;
      })
    ) {
      emailiduserexists.style.display = "block";
      formsuccessmessage.style.display = "none";
    } else {
      let formdataentry = {
        name: storename,
        emailid: storeemail,
        phonenumber: storephone,
        password: storepassword,
      };
      formdatabase.push(formdataentry);
      let storeformdata = localStorage.setItem(
        "formdata",
        JSON.stringify(formdatabase)
      );
      emailiduserexists.style.display = "none";
    }
    detailsform.reset();
  } else {
    formsuccessmessage.style.display = "none";
    formerrormessage.style.display = "block";
    detailsform.reset();
    console.log("not ok");
  }
});
