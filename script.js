let bitcoinPrice = 0;
let isGBP = false;

async function fetchBitcoinPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,gbp');
        const data = await response.json();
        bitcoinPrice = isGBP ? data.bitcoin.gbp : data.bitcoin.usd;
        document.getElementById('bitcoin-price').innerText = `Bitcoin Price: ${isGBP ? '£' : '$'}${formatValue(bitcoinPrice)}`;
        calculateValue(); // Update calculations immediately
    } catch (error) {
        document.getElementById('bitcoin-price').innerText = "Error fetching price.";
        console.error("Error fetching Bitcoin price:", error);
    }
}

function toggleCurrency() {
    isGBP = !isGBP;
    document.getElementById('currency-switch').innerText = isGBP ? '🇬🇧 GBP' : '🇺🇸 USD';
    fetchBitcoinPrice();
}

function calculateValue() {
    const userInput = document.getElementById('user-input').value;
    if (userInput === "") {
        document.getElementById('calculated-value').innerText = "";
        clearCalculatedValues();
        return;
    }

    const result = bitcoinPrice * parseFloat(userInput);
    document.getElementById('calculated-value').innerText = `Stack Value: ${isGBP ? '£' : '$'}${formatValue(result)}`;
    setCalculatedValues(result);
}

function setCalculatedValues(value) {
    const symbol = isGBP ? '£' : '$';
    document.getElementById('minus-5').innerText = `-5%: ${symbol}${formatValue(value * 0.95)}`;
    document.getElementById('minus-10').innerText = `-10%: ${symbol}${formatValue(value * 0.90)}`;
    document.getElementById('minus-20').innerText = `-20%: ${symbol}${formatValue(value * 0.80)}`;
    document.getElementById('minus-40').innerText = `-40%: ${symbol}${formatValue(value * 0.60)}`;
    document.getElementById('minus-60').innerText = `-60%: ${symbol}${formatValue(value * 0.40)}`;
    document.getElementById('minus-80').innerText = `-80%: ${symbol}${formatValue(value * 0.20)}`;

    document.getElementById('plus-5').innerText = `+5%: ${symbol}${formatValue(value * 1.05)}`;
    document.getElementById('plus-10').innerText = `+10%: ${symbol}${formatValue(value * 1.10)}`;
    document.getElementById('plus-20').innerText = `+20%: ${symbol}${formatValue(value * 1.20)}`;
    document.getElementById('plus-40').innerText = `+40%: ${symbol}${formatValue(value * 1.40)}`;
    document.getElementById('plus-60').innerText = `+60%: ${symbol}${formatValue(value * 1.60)}`;
    document.getElementById('plus-80').innerText = `+80%: ${symbol}${formatValue(value * 1.80)}`;
}

function clearCalculatedValues() {
    const elements = document.querySelectorAll('.negative, .positive');
    elements.forEach(element => element.innerText = "");
}

function formatValue(value) {
    return value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

fetchBitcoinPrice();
setInterval(fetchBitcoinPrice, 60000);