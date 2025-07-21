const country_code = {
  "USD": "US", "INR": "IN", "EUR": "EU", "GBP": "GB", "AUD": "AU", "CAD": "CA", "JPY": "JP",
  "CNY": "CN", "SGD": "SG", "NZD": "NZ", "CHF": "CH", "ZAR": "ZA", "RUB": "RU", "BRL": "BR",
  "MXN": "MX", "SEK": "SE", "NOK": "NO", "DKK": "DK", "PLN": "PL", "THB": "TH", "HKD": "HK"
};

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const swapBtn = document.getElementById("swapBtn");
const modeToggle = document.getElementById("modeToggle");

function populateCurrencies(selectElement) {
  for (let code in country_code) {
    let option = document.createElement("option");
    option.value = code;
    option.text = code;
    selectElement.appendChild(option);
  }
}

populateCurrencies(fromCurrency);
populateCurrencies(toCurrency);

fromCurrency.value = "USD";
toCurrency.value = "INR";

function updateFlags() {
  fromFlag.src = `https://flagsapi.com/${country_code[fromCurrency.value]}/flat/32.png`;
  toFlag.src = `https://flagsapi.com/${country_code[toCurrency.value]}/flat/32.png`;
}

function getExchangeRate() {
  const amountVal = amount.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      const converted = (amountVal * rate).toFixed(6);
      result.innerText = `${amountVal} ${from} = ${converted} ${to}`;
    });
}

fromCurrency.addEventListener("change", () => {
  updateFlags();
  getExchangeRate();
});

toCurrency.addEventListener("change", () => {
  updateFlags();
  getExchangeRate();
});

convertBtn.addEventListener("click", getExchangeRate);

swapBtn.addEventListener("click", () => {
  [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
  updateFlags();
  getExchangeRate();
});

// Dark mode toggle
modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", modeToggle.checked);
});

// Initial setup
updateFlags();
getExchangeRate();

