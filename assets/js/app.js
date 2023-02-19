/* --------------------------- */
/*           FUNCTIONS         */
/* --------------------------- */
const getSuccess = () => {
  result.classList.add("success");
};

const getWarning = () => {
  result.classList.add("warning");
};

const getError = () => {
  result.classList.add("error");
};

const getClean = () => {
  result.classList.remove("success");
  result.classList.remove("warning");
  result.classList.remove("error");
};

const calculate = (number1, symbol, number2) => {
  number1 = number1.trim().replace(",", ".");
  number2 = number2.trim().replace(",", ".");

  if (!number1 || !number2) {
    getError();

    return "Veuillez remplir tous les champs.";
  } else if (isNaN(number1) || isNaN(number2)) {
    getError();

    return "Veuillez ne saisir que des nombres.";
  }

  number1 = parseFloat(number1);
  number2 = parseFloat(number2);

  let calculation = "";

  switch (symbol) {
    case "+":
      calculation = number1 + number2;
      break;

    case "-":
      calculation = number1 - number2;
      break;

    case "x":
      calculation = number1 * number2;
      break;

    case "÷":
      if (number2 !== 0) {
        calculation = number1 / number2;
      } else {
        getWarning();
        return "Impossible de diviser par 0";
      }
      break;

    case "%":
      if (number2 !== 0) {
        calculation = number1 % number2;
      } else {
        getWarning();
        return "Opération impossible";
      }
      break;

    default:
      getError();
      return "Veuillez saisir un des opérateurs proposés.";
  }

  getSuccess();

  if (number2 < 0) {
    number2 = "(" + number2 + ")";
  }

  return `${number1} ${symbol} ${number2} = ${calculation}`;
};

/* --------------------------- */
/*            PROCESS          */
/* --------------------------- */
calculator.addEventListener("submit", (e) => {
  e.preventDefault();

  getClean();

  result.textContent = calculate(
    firstNumber.value,
    operator.value,
    secondNumber.value
  );
});

operator.addEventListener("mouseover", () => {
  let description = "";

  switch (operator.value) {
    case "+":
      description = "Addition : somme des 2 nombres.";
      break;

    case "-":
      description = "Soustraction : différence entre les 2 nombres.";
      break;

    case "x":
      description = "Multiplication : produits des 2 nombres.";
      break;

    case "÷":
      description = "Division : quotient des 2 nombres.";
      break;

    case "%":
      description = "Modulo : reste de la division entre les 2 nombres.";
      break;

    default:
      description = "Opérateur non reconnu.";
      break;
  }

  info.style.visibility = "visible";
  info.textContent = description;
});

operator.addEventListener("mouseleave", () => {
  info.style.visibility = "hidden";
});
