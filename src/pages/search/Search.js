import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

import RecipeList from '../../components/RecipeList'

import './Search.css'

export default function Search() {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q')

    const { data, isPending, error } = useFetch('http://localhost:3000/recipes?q=' + query)

    return (
        <div className="search">
            <h2>Recipes including { query }</h2>
            { error && <p className="error">{ error }</p> }
            { isPending && <p className="loading">Loading</p> }
            { data && <RecipeList recipes={ data } /> } 
        </div>
    )
}