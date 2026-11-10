import CoinCard from "../components/CoinCard"
import FilterInput from "../components/FilterInput"

const HomePage = ({
    coins,
    filter,
    setFilter,
    limit,
    setLimit,
    loading,
    error
}) => {
    const filterCoins = coins.filter((coin) => {
        return coin.name.toLowerCase().includes(filter.toLowerCase()) || coin.symbol.toLowerCase().includes(filter.toLowerCase())
    })
    return (
        <div>
            <h1>Crypto App</h1>
            { loading && <p>Loading...</p>}
            { error && <div className="error">{error}</div>}
            <div className="top-controls">
                <FilterInput filter={filter} onFilterChange={setFilter}/>
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
                    { filterCoins.map((coin) => (
                        <CoinCard coin={coin} key={coin.id}/>
                    ))}
                </main>
            )}
        </div>
    );
}

export default HomePage;