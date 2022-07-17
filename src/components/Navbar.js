import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

import SearchBar from './SearchBar'

//styles
import './Navbar.css'

export default function Navbar() {
  const { color } = useTheme()

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">Recipes</Link>
        <SearchBar />
        <Link to="/create">Create</Link>
      </nav>
    </div>
  )
}
