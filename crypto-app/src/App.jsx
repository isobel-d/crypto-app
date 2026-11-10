import {useState, useEffect} from "react"
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'

import HomePage from "./pages/home"
import {Routes, Route} from 'react-router'


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


    return(
      <Routes>
        <Route path='/' element={ <HomePage
          coins={coins}
          filter={filter}
          setFilter={setFilter}
          limit={limit}
          setLimit={setLimit}
          loading={loading}
          error={error}
          />
        }/>
      </Routes>
    )


}

export default App