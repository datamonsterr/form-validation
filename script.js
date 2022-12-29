let $ = (selector) => {
  return document.querySelector(selector);
};
let $$ = (selector) => {
  return document.querySelectorAll(selector);
};

let submitBtn = $("#submitBtn");

let generateSecurityCode = () => {
  const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let code = "";
  for (let i = 0; i < 3; i++)
    code += letters[Math.floor(Math.random() * letters.length)];
  for (let i = 0; i < 2; i++) code += Math.floor(Math.random() * 10);
  return code;
};
let code = generateSecurityCode();
let securityCode = $("#security-code");
securityCode.textContent = code;

let showNoti = (element, content) => {
  $("#warning").classList.remove("hidden");
  element.classList.remove("hidden");
  element.textContent = content;
};
let hideNoti = (element) => {
  element.classList.add("hidden");
  element.textContent = "";
};

submitBtn.onclick = (e) => {
  e.preventDefault();
  let isValid = 0;
  let f = {
    name: $("#name").value,
    subject: $("#subject").value,
    msg: $("#message").value,
    email: $("#email").value,
    code: $("#security").value,
  };
  let n = {
    name: $$(".notify")[0],
    subject: $$(".notify")[1],
    msg: $$(".notify")[2],
    email: $$(".notify")[3],
    code: $$(".notify")[4],
  };
  //name
  if (f.name) {
    isValid++;
    hideNoti(n.name);
  } else {
    showNoti(n.name, "Please enter your name!");
  }

  // subject
  if (f.subject) {
    isValid++;
    hideNoti(n.subject);
  } else {
    showNoti(n.subject, "Please enter your subject!");
  }

  // msg
  if (f.msg) {
    isValid++;
    hideNoti(n.msg);
  } else {
    showNoti(n.msg, "Please enter your message!");
  }

  //code
  if (f.code) {
    if (code !== f.code) {
      showNoti(n.code, "Wrong security code!");
    } else {
      isValid++;
      hideNoti(n.code);
    }
  } else {
    showNoti(n.code, "Please enter security code!");
  }

  //email
  if (f.email) {
    if (f.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
      isValid++;
      hideNoti(n.email);
    } else {
      showNoti(n.email, "Your email is invalid!");
    }
  } else {
    showNoti(n.email, "Please Enter Your Email!");
  }
  console.log(isValid);

  //Valid
  if (isValid === 5) {
    $("#warning").classList.add("hidden");
    console.log("Form submitted");
  }
};
