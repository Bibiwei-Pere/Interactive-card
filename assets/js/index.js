"use strict";
// Card Images
const numberfrontCard = document.querySelector(".card-front-numb");
const namefrontCard = document.querySelector(".card-front-name");
const expMonthCard = document.querySelector(".exp-month");
const expYearCard = document.querySelector(".exp-year");
const cvcBackCard = document.querySelector(".card-back-num");

// Form and completed container
const formContainer = document.querySelector(".form-state");
const completedContainer = document.querySelector(".completed-state-container");

// Form
const userInput = document.querySelectorAll(".user-input"); // All input containers
const nameInput = document.querySelector("#user-name");
const numbCardInput = document.querySelector("#user-card");
const monthInput = document.querySelector("#date-exp-mm");
const yearInput = document.querySelector("#date-exp-yy");
const cvcInput = document.querySelector("#user-cvc");
const btnConfirm = document.querySelector(".btn");
const btnCompleted = document.querySelector("#btn-completed");

const eventsArray = ["focus", "keypress", "input", "click"];
let keyPress;

btnConfirm.addEventListener("click", (e) => {
  if (e.target.id === "btn-form") {
    e.preventDefault();
    console.log(e.target);
    const isValid = formValidation();
    isValidForm(isValid, e.target.id);
  }
});

btnCompleted.addEventListener("click", (e) => {
  if (e.target.id === "btn-completed") {
    e.preventDefault();
    resetForm();
    isValidForm(true, e.target.id);
  }
});

// Register which key the user is pressing
document.onkeydown = (e) => {
  keyPress = e.key;
};

//                 --  Add Event Listeners  --
eventsArray.forEach((evt) => {
  userInput.forEach((i) => {
    i.addEventListener(evt, (input) => {
      if (input.target.id === "user-name") {
        cardUpdate(namefrontCard, input.target.value);
      } else if (input.target.id === "user-card") {
        inputOnlyNumbers(input);
        creditCardFormat(input.target.value);
        cardUpdate(numberfrontCard, input.target.value);
      } else if (input.target.id === "date-exp-mm") {
        inputOnlyNumbers(input);
        cardUpdate(expMonthCard, input.target.value);
      } else if (input.target.id === "date-exp-yy") {
        inputOnlyNumbers(input);
        cardUpdate(expYearCard, input.target.value);
      } else if (input.target.id === "user-cvc") {
        inputOnlyNumbers(input);
        cardUpdate(cvcBackCard, input.target.value);
      }
    });
  });
});

//                     --  UI Card Image Update  --
//    This updates the ui in the image according to the users input values

const cardUpdate = (element, inputTxt) => {
  //            Front Card Name
  if (element.classList.contains("card-front-name")) {
    // When the user types a valid value
    element.textContent = inputTxt;
    // When the user deletes everything or input has no value
    if (element.textContent === "") {
      element.textContent = "Jane Appleseed";
    }
    //          Front Card Numbers
  } else if (element.classList.contains("card-front-numb")) {
    //       When the user types a valid value
    //    Pass the values to format in the UI function
    uiCardFormat(element, inputTxt);

    //   When the user deletes everything or input has no value
    //            Fill every span with ceros
    if (element.textContent === "") {
      element.firstElementChild.textContent = "0000";
      element.firstElementChild.nextElementSibling.textContent = "0000";
      element.lastElementChild.previousElementSibling.textContent = "0000";
      element.lastElementChild.textContent = "000";
    }
  } else if (element.classList.contains("exp-month")) {
    uiCardFormat(element, inputTxt);
    if (element.textContent === "") {
      element.textContent = "00";
    }
  } else if (element.classList.contains("exp-year")) {
    uiCardFormat(element, inputTxt);
    if (element.textContent === "") {
      element.textContent = "00";
    }
  } else if (element.classList.contains("card-back-num")) {
    uiCardFormat(element, inputTxt);
    if (element.textContent === "") {
      element.textContent = "000";
    }
  }
};

//        --  Format Input Field "Card Number" When Typing  --
//       This updates the input field when the user is typing
//       and add white spaces after four numbers.

const creditCardFormat = (numbers) => {
  //  Checking for more than 4 numbers in the string
  //  remove white spaces and formats the input
  if (numbers.length >= 4 && keyPress !== "Backspace") {
    const str = numbers.split(" ").join("");
    let newNumbers = "";

    for (let i = 0; i < str.length; i++) {
      if (i === 3 || i === 7 || i === 11) {
        newNumbers += str[i];
        newNumbers += " ";
      } else {
        newNumbers += str[i];
      }
    }
    numbCardInput.value = newNumbers; // Change the old numbers for the new formated ones in the input field
  } else if (
    // Remove white spaces when deliting the input so the user only deletes numbers
    (numbers.length === 5 && keyPress === "Backspace") ||
    (numbers.length === 10 && keyPress === "Backspace") ||
    (numbers.length === 15 && keyPress === "Backspace")
  ) {
    numbCardInput.value = numbCardInput.value.slice(0, -1);
  }
};

const uiCardFormat = (element, txt) => {
  let str2 = "";
  const cero = "0";
  let iterator;

  if (element.classList.contains("card-front-numb")) {
    let newStr = txt.split(" ");
    for (let a = newStr.length; a < 4; a++) {
      switch (a) {
        case 1:
          newStr.push("0000");
          break;
        case 2:
          newStr.push("0000");
          break;
        case 3:
          newStr.push("0000");
          break;
        default:
          console.log(" Error creating an array of ceros uiCardFormat");
      }
    }

    for (let i = 0; i < 4; i++) {
      switch (i) {
        case 0:
          str2 = newStr[0] + cero.repeat(4 - newStr[0].length);
          element.firstElementChild.textContent = str2;
          break;
        case 1:
          str2 = newStr[1] + cero.repeat(4 - newStr[1].length);
          element.firstElementChild.nextElementSibling.textContent = str2;
          break;
        case 2:
          str2 = newStr[2] + cero.repeat(4 - newStr[2].length);
          element.lastElementChild.previousElementSibling.textContent = str2;
          break;
        case 3:
          str2 = newStr[3] + cero.repeat(4 - newStr[3].length);
          element.lastElementChild.textContent = str2;
          break;
        default:
          console.log("error");
      }
    }
  } else {
    iterator =
      element.classList.contains("exp-month") ||
      element.classList.contains("exp-year")
        ? 2
        : 3;

    for (let i = 0; i < iterator; i++) {
      switch (i) {
        case 0:
        case 1:
        case 2:
          str2 = txt + cero.repeat(iterator - txt.length);
          element.textContent = str2;
          break;
        default:
          console.log("error");
      }
    }
  }
};

const inputOnlyNumbers = (numbers) => {
  if (!Number(numbers.key) && keyPress !== "Backspace" && keyPress !== "0") {
    numbers.preventDefault();
  }
};
const formValidation = () => {
  const date = new Date();
  let formValid = true;
  userInput.forEach((input) => {
    let elInput = input.firstElementChild.nextElementSibling;

    if (elInput.id === nameInput.id) {
      // Reset Error class
      removeCssError(elInput);
      if (nameInput.value === "") {
        nameInput.classList.add("in-border-red");
        createErrorEl(nameInput.parentElement, "Can't be blank");
        formValid = false;
      } else if (nameInput.value.length < 4) {
        nameInput.classList.add("in-border-red");
        createErrorEl(nameInput.parentElement, "Enter a valid name");
        formValid = false;
      }
    } else if (elInput.id === numbCardInput.id) {
      // Reset Error class
      removeCssError(elInput);
      if (numbCardInput.value === "") {
        numbCardInput.classList.add("in-border-red");
        createErrorEl(numbCardInput.parentElement, "Can't be blank");
        formValid = false;
      } else if (numbCardInput.value.split(" ").join("").length < 15) {
        numbCardInput.classList.add("in-border-red");
        createErrorEl(numbCardInput.parentElement, "Enter a valid Card");
        formValid = false;
      }
    } else if (elInput.classList.contains("user-input-date")) {
      //

      //       -- Month Input --
      if (elInput.firstElementChild.firstElementChild.id === monthInput.id) {
        // Reset Error class
        removeCssError(elInput.firstElementChild);
        if (monthInput.value === "") {
          monthInput.classList.add("in-border-red");
          createErrorEl(monthInput.parentElement, "Can't be blank");
          formValid = false;
        } else if (monthInput.value.length < 2) {
          monthInput.classList.add("in-border-red");
          createErrorEl(monthInput.parentElement, "Enter a valid number");
          formValid = false;
        } else if (
          (Number(monthInput.value) < date.getMonth() + 1 &&
            Number(yearInput.value) < date.getFullYear() - 2000) ||
          Number(monthInput.value) > 12 ||
          Number(monthInput.value) < 1
        ) {
          monthInput.classList.add("in-border-red");
          createErrorEl(monthInput.parentElement, "Enter a valid date");
          formValid = false;
        } else if (
          (Number(monthInput.value) <= date.getMonth() + 1 &&
            Number(yearInput.value) <= date.getFullYear() - 2000) ||
          Number(monthInput.value) > 12 ||
          Number(monthInput.value) < 1
        ) {
          formValid = false;
          monthInput.classList.add("in-border-red");
          createErrorEl(monthInput.parentElement, "Enter a valid date");
        }
      }
      //       -- Year Input --
      if (
        elInput.firstElementChild.nextElementSibling.firstElementChild.id ===
        yearInput.id
      ) {
        // Reset Error class
        removeCssError(elInput.firstElementChild.nextElementSibling);
        if (yearInput.value === "" || yearInput.value.length < 2) {
          yearInput.classList.add("in-border-red");
          formValid = false;
        } else if (Number(yearInput.value) < date.getFullYear() - 2000) {
          yearInput.classList.add("in-border-red");
          formValid = false;
        }
      }
    } else if (elInput.id === cvcInput.id) {
      // Reset Error class
      removeCssError(elInput);
      if (cvcInput.value === "") {
        cvcInput.classList.add("in-border-red");
        createErrorEl(cvcInput.parentElement, "Can't be blank");
        formValid = false;
      } else if (cvcInput.value.length < 3) {
        cvcInput.classList.add("in-border-red");
        createErrorEl(cvcInput.parentElement, "Enter a valid number");
        formValid = false;
      }
    }
  });
  return formValid;
};

const removeCssError = (input) => {
  if (
    input.classList.contains("in-border-red") &&
    input.parentElement.id !== "user-input-date"
  ) {
    input.classList.remove("in-border-red");
    input.parentElement.removeChild(input.nextElementSibling);
  } else if (
    input.classList.contains("date") &&
    input.parentElement.classList.contains("user-input-date")
  ) {
    if (
      input.firstElementChild.classList.contains("in-border-red") &&
      input.firstElementChild.id === monthInput.id
    ) {
      input.firstElementChild.classList.remove("in-border-red");
      input.removeChild(input.lastElementChild);
    }
    if (
      input.firstElementChild.classList.contains("in-border-red") &&
      input.firstElementChild.id === yearInput.id
    ) {
      input.firstElementChild.classList.remove("in-border-red");
    }
  }
};

const createErrorEl = (input, txt) => {
  // Create Element
  const div = document.createElement("div");
  const parg = document.createElement("p");

  // Element Styles

  parg.classList.add("error");
  parg.textContent = txt;
  div.appendChild(parg);

  // Add Input To HTML
  //console.log(input);
  if (input.classList.contains("user-input")) {
    input.appendChild(div);
  } else if (input.parentElement.classList.contains("user-input-date")) {
    //console.log(input.firstElementChild);
    if (input.firstElementChild.id === monthInput.id) {
      input.firstElementChild.parentElement.appendChild(div);
    }
  }
};

const isValidForm = (isValid, btn) => {
  if (isValid && btn === "btn-form") {
    formContainer.classList.add("hidden");
    completedContainer.classList.remove("hidden");
    completedContainer.classList.add("visible");
    setInterval(() => {
      completedContainer.classList.remove("visible");
    }, 3000);
  } else if (isValid && btn === "btn-completed") {
    completedContainer.classList.add("hidden");
    formContainer.classList.remove("hidden");
  }
};

const resetForm = () => {
  //
  // Reset All Inputs
  nameInput.value = "";
  numbCardInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
  cvcInput.value = "";

  // Reset Images
  cardUpdate(namefrontCard, "");
  cardUpdate(numberfrontCard, "");
  cardUpdate(expMonthCard, "");
  cardUpdate(expYearCard, "");
  cardUpdate(cvcBackCard, "");
};
