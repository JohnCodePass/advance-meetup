let areaOfCoins = document.getElementById("areaOfCoins");
let modalTitle = document.getElementById("exampleModalLabel");
let currModalPrice = document.getElementById("currModalPrice");
let currModalPercent24 = document.getElementById("currModalPercent24");
let currImageThumb = document.getElementById("currImageThumb");
let currMarketCap = document.getElementById("currMarketCap");
let sevenDayMoneyChange = document.getElementById("7DayMoneyChange");
let fourteenDayMoneyChange = document.getElementById("14DayMoneyChange");
let thirtyDayMoneyChange = document.getElementById("30DayMoneyChange");

//     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

let idHolder;
let refreshData;


// This shows us the top 100 coins, but amount can be changed
let newGeckoApi = () => {
    // areaOfCoins.innerHTML = '';  is needed if they want to use a setInterval
    let num = 1;
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        .then(res => res.json())
        .then(data => {
            data.map(coin => {
                let newTrNode = document.createElement("TR")

                let numTDNode = document.createElement("TD");
                let coinPos = document.createTextNode(num++);
                numTDNode.appendChild(coinPos);
                newTrNode.appendChild(numTDNode);

                let picTDNode = document.createElement("TD");
                let picCoin = document.createElement("IMG");
                picCoin.setAttribute("src", coin.image)
                picCoin.setAttribute("width", "40")
                picTDNode.appendChild(picCoin);
                newTrNode.appendChild(picTDNode)

                let nameTDNode = document.createElement("TD")
                let coinId = document.createTextNode(coin.name)
                nameTDNode.appendChild(coinId);
                newTrNode.appendChild(nameTDNode)

                let smolTDNode = document.createElement("TD");
                let coinsmolName = document.createTextNode((coin.symbol).toUpperCase())
                smolTDNode.appendChild(coinsmolName);
                newTrNode.appendChild(smolTDNode)

                let priceTDNode = document.createElement("TD");
                let currentGeckoPrice = document.createTextNode("$" + coin.current_price);
                priceTDNode.appendChild(currentGeckoPrice);
                newTrNode.appendChild(priceTDNode);

                let precentTDChange = document.createElement("TD");
                (coin.price_change_percentage_24h >= 0 ? precentTDChange.setAttribute("style", "color:green") : precentTDChange.setAttribute("style", "color:red"))
                let preChange = document.createTextNode((coin.price_change_percentage_24h).toFixed(2) + "%")
                precentTDChange.appendChild(preChange);
                newTrNode.appendChild(precentTDChange);

                newTrNode.addEventListener('click', function () {
                    idHolder = coin.id
                    userAction((idHolder))
                })

                areaOfCoins.appendChild(newTrNode);
            })
        })
}
newGeckoApi();
// setInterval((newGeckoApi), 15000) 

// Use next function is to get more details and live refresh every 5 secs
let userAction = (idGot) => {
    $('#exampleModal').modal('show')

    fetch(`https://api.coingecko.com/api/v3/coins/${idGot.toLowerCase()}`)
        .then(response => response.json())
        .then(coin => {
            modalTitle.innerText = coin.name;
            currModalPrice.innerText = "Price $"+coin.market_data.current_price.usd;
            (coin.market_data.price_change_percentage_24h >= 0 ? currModalPercent24.setAttribute("style", "color:green") : currModalPercent24.setAttribute("style", "color:red"))
            currModalPercent24.innerText = coin.market_data.price_change_percentage_24h.toFixed(2) + "% 24H";
            currImageThumb.setAttribute("src", coin.image.small);
            currMarketCap.innerText = "Current Market Cap " + coin.market_data.market_cap.usd;

            (coin.market_data.price_change_percentage_7d_in_currency.usd >= 0 ? sevenDayMoneyChange.setAttribute("style", "color:green") : sevenDayMoneyChange.setAttribute("style", "color:red"))
            sevenDayMoneyChange.innerText = coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2) + "%";


            (coin.market_data.price_change_percentage_14d_in_currency.usd >= 0 ? fourteenDayMoneyChange.setAttribute("style", "color:green") : fourteenDayMoneyChange.setAttribute("style", "color:red"))
            fourteenDayMoneyChange.innerText = coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(2) + "%";

            (coin.market_data.price_change_percentage_30d_in_currency.usd >= 0 ? thirtyDayMoneyChange.setAttribute("style", "color:green") : thirtyDayMoneyChange.setAttribute("style", "color:red"))
            thirtyDayMoneyChange.innerText = coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(2) + "%";

        });

    refreshData = setInterval(() => fetch(`https://api.coingecko.com/api/v3/coins/${idGot.toLowerCase()}`)
        .then(response => response.json())
        .then(coin => {
            modalTitle.innerText = coin.name;
            currModalPrice.innerText = "Price $"+coin.market_data.current_price.usd;
            (coin.market_data.price_change_percentage_24h >= 0 ? currModalPercent24.setAttribute("style", "color:green") : currModalPercent24.setAttribute("style", "color:red"))
            currModalPercent24.innerText = coin.market_data.price_change_percentage_24h.toFixed(2) + "% 24H";
            currMarketCap.innerText = "Current Market Cap " + coin.market_data.market_cap.usd;

            (coin.market_data.price_change_percentage_7d_in_currency.usd >= 0 ? sevenDayMoneyChange.setAttribute("style", "color:green") : sevenDayMoneyChange.setAttribute("style", "color:red"))
            sevenDayMoneyChange.innerText = coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2) + "%";

            (coin.market_data.price_change_percentage_14d_in_currency.usd >= 0 ? fourteenDayMoneyChange.setAttribute("style", "color:green") : fourteenDayMoneyChange.setAttribute("style", "color:red"))
            fourteenDayMoneyChange.innerText = coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(2) + "%";

            (coin.market_data.price_change_percentage_30d_in_currency.usd >= 0 ? thirtyDayMoneyChange.setAttribute("style", "color:green") : thirtyDayMoneyChange.setAttribute("style", "color:red"))
            thirtyDayMoneyChange.innerText = coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(2) + "%";

        }), 5000)
}

$('#exampleModal').on('hidden.bs.modal', function () {
    clearInterval(refreshData)
})