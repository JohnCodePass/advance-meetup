let firstVal = document.querySelector('#firstVal');
let currentPrice = document.querySelector('#currentPrice')

let areaOfCoins = document.getElementById("areaOfCoins");



// This shows us the top 100 coins
let newGeckoApi = () => {
    let num = 1;
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        data.map(coin => {
            // console.log(coin)
            // console.log(num++)
            let newTrNode = document.createElement("TR")
            newTrNode.setAttribute("onclick", "userAction()")

            let numtrNode = document.createElement("TD");
            let coinPos = document.createTextNode(num++);
            numtrNode.appendChild(coinPos);
            newTrNode.appendChild(numtrNode);

            let pictrNode = document.createElement("TD");
            let picCoin = document.createElement("IMG");
            picCoin.setAttribute("src", coin.image)
            picCoin.setAttribute("width", "40")
            pictrNode.appendChild(picCoin);
            newTrNode.appendChild(pictrNode)

            let trNode = document.createElement("TD")
            let coinId = document.createTextNode(coin.name)
            trNode.appendChild(coinId);
            newTrNode.appendChild(trNode)


            let smoltrNode = document.createElement("TD");
            let coinsmolName = document.createTextNode((coin.symbol).toUpperCase())
            smoltrNode.appendChild(coinsmolName);
            newTrNode.appendChild(smoltrNode)

            let pricetrNode = document.createElement("TD");
            let currentGeckoPrice = document.createTextNode("$"+coin.current_price);
            pricetrNode.appendChild(currentGeckoPrice);
            newTrNode.appendChild(pricetrNode);

            let precentTRChange = document.createElement("TD");
            (coin.price_change_percentage_24h >= 0 ? precentTRChange.setAttribute("style", "color:green") : precentTRChange.setAttribute("style", "color:red"))
            let preChange = document.createTextNode((coin.price_change_percentage_24h).toFixed(2) + "%")
            precentTRChange.appendChild(preChange);
            newTrNode.appendChild(precentTRChange);

            areaOfCoins.appendChild(newTrNode);
        })
    })
}
newGeckoApi();

// Use next function to get more details and live refresh
let userAction = (idGot) => {
    // fetch("https://api.coin360.com/coin/latest?coin=BTC&convert=USD")
    //     .then(response => response.json())
    //     .then(data => {
    //         firstVal.innerText = data.BTC.change_1h;
    //         currentPrice.innerText = data.BTC.quotes.USD.price;
    //         // console.log(data);
    //     });
    console.log(idGot)
}
// userAction()
// setInterval ((userAction), 2000 ) reload the function every 2 secs