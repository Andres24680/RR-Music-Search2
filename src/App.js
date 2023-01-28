import {useEffect, useState, useRef } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import {SearchContext} from './context/SearchContext'


function App() {
	let [searchTerm, setSearchTerm] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])
	let searchInput = useRef('')

	//const API_URL = 'https://itunes.apple.com/search?term='

	useEffect(() => {
		if(search) {
			const fetchData = async () => {
				document.title = `${search} Music`
				const response = await fetch('https://itunes.apple.com/search?term=the%20grateful%20dead')
				const resData = await response.json()
				if (resData.results.length > 0) {
					setData(resData.results)
				} else {
					setMessage('Not Found')
				}
			}
			fetchData()
		}
	}, [search])
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}

	return (
		<div className="App">
			<SearchContext.Provider value={{
				term: searchInput,
				handleSearch:handlesearch
			}}>
				<SearchBar />
				</SearchContext.Provider>
				{message}
				<DataContext.Provider value={data}>
					<Gallery />
				</DataContext.Provider>
		</div>
  	);
}

export default App;
