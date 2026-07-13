document.addEventListener("DOMContentLoaded", () => {
  const convertBtn = document.getElementById("convert-btn");
  const tempInput = document.getElementById("temp-input");
  const unitSelect = document.getElementById("unit-select");
  const errorMsg = document.getElementById("error-msg");

  const resCelsius = document.getElementById("res-celsius");
  const resFahrenheit = document.getElementById("res-fahrenheit");
  const resKelvin = document.getElementById("res-kelvin");

  const boxCelsius = document.getElementById("box-1");
  const boxFahrenheit = document.getElementById("box-2");
  const boxKelvin = document.getElementById("box-3");

  convertBtn.addEventListener("click", () => {
    const inputValue = tempInput.value.trim();

    if (inputValue === "" || isNaN(inputValue)) {
      errorMsg.style.display = "block";
      tempInput.style.borderColor = "#f43f5e";
      clearResults();
      return;
    }

    errorMsg.style.display = "none";
    tempInput.style.borderColor = "#334155";

    const temp = parseFloat(inputValue);
    const sourceUnit = unitSelect.value;

    let c, f, k;

    if (sourceUnit === "C") {
      c = temp;
      f = (temp * 9) / 5 + 32;
      k = temp + 273.15;
      highlightActiveBox(boxCelsius, [boxFahrenheit, boxKelvin]);
    } else if (sourceUnit === "F") {
      c = ((temp - 32) * 5) / 9;
      f = temp;
      k = ((temp - 32) * 5) / 9 + 273.15;
      highlightActiveBox(boxFahrenheit, [boxCelsius, boxKelvin]);
    } else if (sourceUnit === "K") {
      c = temp - 273.15;
      f = ((temp - 273.15) * 9) / 5 + 32;
      k = temp;
      highlightActiveBox(boxKelvin, [boxCelsius, boxFahrenheit]);
    }

    resCelsius.textContent = `${formatNumber(c)} °C`;
    resFahrenheit.textContent = `${formatNumber(f)} °F`;
    resKelvin.textContent = `${formatNumber(k)} K`;
  });

  function formatNumber(num) {
    return parseFloat(num.toFixed(2));
  }

  function clearResults() {
    resCelsius.textContent = "--";
    resFahrenheit.textContent = "--";
    resKelvin.textContent = "--";
    [boxCelsius, boxFahrenheit, boxKelvin].forEach((box) =>
      box.classList.remove("highlight"),
    );
  }

  function highlightActiveBox(active, objectsToReset) {
    active.classList.add("highlight");
    objectsToReset.forEach((box) => box.classList.remove("highlight"));
  }
});
