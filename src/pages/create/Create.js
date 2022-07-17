import { useEffect, useRef, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

//styles
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const ingredientInput = useRef(null)
  const navigate = useNavigate()

  const { data, postData } = useFetch('http://localhost:3000/recipes', 'POST')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
  }

  const addEvent = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredient => [...prevIngredient, ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  // redirect the user when we get data response
  useEffect(() => {
    if (data) {
      navigate("/")
    }
  }, [data, navigate])

  return (
    <div className="create">
      <h2 className="page-title">Create a New Recipe</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Title: </span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={ title }
            required
          ></input>
        </label>
        
        <label>
          <span>Ingredients: </span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={ newIngredient }
              ref={ingredientInput}
            ></input>
            <button className="btn" onClick={addEvent}>Add</button>
          </div>
        </label>
        <p>Current Ingredients: { ingredients.map(i => (<em key={ i }>{ i }, </em> )) }</p>

        <label>
          <span>Method: </span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={ method }
            required
          ></textarea>
        </label>
        
        <label>
          <span>Cooking Time: </span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={ cookingTime }
            required
          ></input>
        </label>
        
        <button className="btn">Submit</button>
      </form>
    </div>
  )
}