import {useState, useEffect} from "react"
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'

import CoinCard from "./components/CoinCard"

function App() {
 const [coins, setCoins] = useState([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)

 //when app mounts
 useEffect(() => {
  fetch(API_URL)
  .then((res) => {
    if(!res.ok) throw new Error('Fail to fetch data!')
  })
   .then((data) => {
  console.log(data)
  setCoins(data)
  setLoading(false)
   })
   .catch((err) => {
    setError(err.message)
    setLoading(false)
 })
}, [])

  return (
    <div>
      <h1>Crypto App</h1>
    {loading && <p>Loading...</p>}
    {error && <div className="error">{error}</div>}
    {!loading && !error && (
      <main className="grif">
        {coins.map((coin) => (
          <CoinCard coin={coin} key={coin.id} />
        ))}
        </main>
    )}
    </div>
  )
}

export default App