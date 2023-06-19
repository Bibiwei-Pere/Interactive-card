// Document Objects
const cname = document.getElementById("name");
const number = document.getElementById("num");
const mm = document.getElementById("mm");
const yy = document.getElementById("yy");
const cvc = document.getElementById("cvc");
const button = document.getElementById("request");
const ername = document.getElementById("errname");
const ernum = document.getElementById("errnum");
const ermm = document.getElementById("errmm-yy");
const ercvc = document.getElementById("errcvc");

// Output
const dname = document.getElementById("dname");
const dnum = document.getElementById("dnumber");
const dmm = document.getElementById("dmonth");
const dyy = document.getElementById("dyear");
const dcvc = document.getElementById("dcvc");

// Handlers
button.addEventListener("click", getinput);

function getinput(){
    const cardname = cname.value;
    const cardnum = number.value;
    const cardmonth = mm.value;
    const cardyear = yy.value;
    const cardcvc = cvc.value;

    cname.style.borderColor ='hsl(0, 0%, 86%)'
    number.style.borderColor ='hsl(0, 0%, 86%)'
    mm.style.borderColor ='hsl(0, 0%, 86%)'
    yy.style.borderColor ='hsl(0, 0%, 86%)'
    cvc.style.borderColor ='hsl(0, 0%, 86%)'

    ername.innerHTML ='';
    ernum.innerHTML ='';
    ermm.innerHTML ='';
    ercvc.innerHTML ='';
    
    if(cardname==''){
        ername.innerHTML ="Can't be blank";
        cname.style.borderColor = 'crimson'
        ername.style.color = "crimson"
    }
    else{
    dname.innerHTML = cardname;
    }
       
    if(cardnum==''){
        ernum.innerHTML ="Can't be blank";
        number.style.borderColor = 'crimson'
        ernum.style.color = "crimson"
    }
    else {
    dnum.innerHTML = cardnum;
    }

    if(cardmonth==''){
        ermm.innerHTML ="Can't be blank";
        mm.style.borderColor = 'crimson'
        ermm.style.color = "crimson"
    }
    else {
    dmm.innerHTML = cardmonth;
    }

    if(cardyear==''){
        ermm.innerHTML ="Can't be blank";
        yy.style.borderColor = 'crimson'
        ermm.style.color = "crimson"
    }
    else {
    dyy.innerHTML = cardyear;
    }

    if(cardcvc==''){
        ercvc.innerHTML ="Can't be blank";
        cvc.style.borderColor = 'crimson'
        ercvc.style.color = "crimson"
    }
    else {
    dcvc.innerHTML = cardcvc;
    }
}

// Pop up
window.onload = function () {
    // Document objects
    const content = document.getElementsByClassName("content")[0];
    const subscribe = document.getElementsByClassName("form__subscribe")[0];
    const notification = document.getElementsByClassName("notification")[0];
  
    // Handlers
    const showNotificationSuccess = () => {
      notification.classList.remove("hide");
      content.classList.add("hide");
    };
  
    // Events
    subscribe.addEventListener("click", (e) => {
      e.preventDefault();
      showNotificationSuccess();
    });
  };