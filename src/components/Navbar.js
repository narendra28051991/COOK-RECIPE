import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

import SearchBar from './SearchBar'

import './Navbar.css'

export default function Navbar() {
  const { color } = useTheme()

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="home-link">Home</Link>
        <SearchBar />
        <Link to="/create">Create</Link>
      </nav>
    </div>
  )
}
