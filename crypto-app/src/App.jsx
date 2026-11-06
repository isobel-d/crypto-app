import {useState, useEffect} from "react"
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'

import CoinCard from "./components/CoinCard"
import FilterInput from "./components/Filterinput"

const App = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [limit, setLimit] = useState(10)
    const [filter, setFilter] = useState('')
    
    // when app mounts
    useEffect(() => { 
        fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`)
          .then((res) => {
            if(!res.ok) throw new Error('Fail to fetch data!')
            return res.json()
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
    }, [limit])

    const filtercoins = coins.filter((coin) => {
      return coin.name.toLowerCase().includes(filter.toLowerCase()) || coin.symbol.toLowerCase().includes(filter.toLowerCase())
    })

    return(
        <div>
            <h1>Crypto App</h1>
            { loading && <p>Loading...</p>}
            { error && <div className="error">{error}</div>}
            <div className="top-control">
            <FilterInput filter={filter} onFilterChange={setFilter} />
            <div className="controls">
              <label htmlFor="limit">Show: </label>
              <select value={limit} id="limit"
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            </div>
            { !loading && !error && (
                <main className="grid">
                    { filtercoins.map((coin) => (
                        <CoinCard coin={coin} key={coin.id}/>  
                    ))}
                </main>
            )}
        </div>
    )


}

export default App