let firstVal = document.querySelector('#firstVal');
let currentPrice = document.querySelector('#currentPrice')

let coinArea = document.getElementById("nameOfCoin")
let posOfCoin = document.getElementById("posOfCoin")
let smolcoinName = document.getElementById("smolcoinName")
let currentCoinPrice = document.getElementById("currentCoinPrice");
let picOfCoin = document.getElementById("picOfCoin")



// This shows us the top 100 coins
let newGeckoApi = () => {
    let num = 0;
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        data.map(coin => {
            console.log(coin)
            console.log(num++)
            let trNode = document.createElement("TR")
            let coinId = document.createTextNode(coin.name)
            trNode.appendChild(coinId);
            coinArea.appendChild(trNode)

            let pictrNode = document.createElement("TR");
            let picCoin = document.createElement("IMG");
            picCoin.setAttribute("src", coin.image)
            picCoin.setAttribute("width", "24")
            pictrNode.appendChild(picCoin);
            picOfCoin.appendChild(pictrNode)


            let numtrNode = document.createElement("TR");
            let coinPos = document.createTextNode(num);
            numtrNode.appendChild(coinPos);
            posOfCoin.appendChild(numtrNode);

            let smoltrNode = document.createElement("TR");
            let coinsmolName = document.createTextNode((coin.symbol).toUpperCase())
            smoltrNode.appendChild(coinsmolName);
            smolcoinName.appendChild(smoltrNode)

            let pricetrNode = document.createElement("TR");
            let currentGeckoPrice = document.createTextNode("$"+coin.current_price);
            pricetrNode.appendChild(currentGeckoPrice);
            currentCoinPrice.appendChild(pricetrNode);
        })
    })
}
newGeckoApi();

// Use next function to get more details and live refresh

let userAction = async () => {
    fetch("https://api.coin360.com/coin/latest?coin=BTC&convert=USD")
        .then(response => response.json())
        .then(data => {
            firstVal.innerText = data.BTC.change_1h;
            currentPrice.innerText = data.BTC.quotes.USD.price;
            // console.log(data);
        });
}
userAction()
// setInterval ((userAction), 2000 ) reload the function every 2 secs