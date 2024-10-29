const supportedCurrenciesApi = "https://api.currencyapi.com/v3/currencies";
const convertExhangeRatesApi = "https://api.currencyapi.com/v3/latest";
let cachedRates;

const fromBox = document.getElementById("fromBox");
const desiredCurrency = document.getElementById("desiredCurrency");
const amountBox = document.getElementById("amountBox");
const convertedOutput = document.getElementById("convertedOutput");
const liveExchangeRate = document.getElementById("liveExchangeRate");

// Get all supported currencies from API

async function loadSupportedCurrencies() {
  const response = await fetch(supportedCurrenciesApi, {
    headers: { apikey: "cur_live_48KaVrEyipJfEd6D6Jztpt9wJ5vsXpXWyLrWGRuL" },
  });
  let { data } = await response.json();
  console.log(data);
  return data;
}

// Getting names of currencies

function getCurrencyNames(rawCurrencies) {
  const names = [];
  for (const key in rawCurrencies) {
    names.push(`${key} - ${rawCurrencies[key].name}`);
  }
  return names;
}

// Populate drop down list with all available currencies

window.onload = async () => {
  const rawCurrencies = await loadSupportedCurrencies();
  const names = getCurrencyNames(rawCurrencies);
  await getAllExhangeRates();
  for (const name of names) {
    const el = document.createElement("option");
    el.textContent = name;
    el.value = name; // Do we need?
    fromBox.appendChild(el);
    const elle = document.createElement("option");
    elle.textContent = name;
    elle.value = name; // Do we need?
    desiredCurrency.appendChild(elle);
  }
};

// Get all

async function getAllExhangeRates() {
  const response = await fetch(convertExhangeRatesApi, {
    headers: { apikey: "cur_live_48KaVrEyipJfEd6D6Jztpt9wJ5vsXpXWyLrWGRuL" },
  });
  let { data } = await response.json();
  cachedRates = data;
  console.log(data);
}

// Convert exchange rates

function exchangeTheRates(fromRate, toRate) {
  return toRate / fromRate;
}

function convertAmount() {
  const fromSymbol = fromBox.value.split(" ")[0];
  const toSymbol = desiredCurrency.value.split(" ")[0];
  const exchangeRate = exchangeTheRates(cachedRates[fromSymbol].value, cachedRates[toSymbol].value);
  const amount = amountBox.value;
  const exchangedAmount = Math.round(amount * exchangeRate * 100) / 100;
  const oneToOneRate = Math.round(1 * exchangeRate * 100) / 100;
  liveExchangeRate.value = `${1} ${fromSymbol} = ${oneToOneRate} ${toSymbol}`;
  convertedOutput.value = !amount || isNaN(amount) ? "Please enter a number!" : `${amount} ${fromSymbol} = ${exchangedAmount} ${toSymbol}`;
}
