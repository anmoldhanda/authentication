const currentuser = document.getElementById("currentuser");
currentuser.innerHTML =
  "the current logged in user is " + localStorage.getItem("currentusername");
