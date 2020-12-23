const convert = async (curr) => {
    const api = `https://api.exchangeratesapi.io/latest?base=${curr}`;
    const response = await fetch(api);
    const data = await response.json();
    return data.rates;
}

export default convert;