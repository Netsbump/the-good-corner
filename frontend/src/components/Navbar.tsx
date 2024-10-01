import { Link } from '@tanstack/react-router'

export function Navbar() {
  return (
    <nav className="categories-navigation">
      <Link to="/ameublement" className="category-navigation-link">Ameublement</Link>
      {' '}
      •
      <Link to="/electromenager" className="category-navigation-link">Électroménager</Link>
      {' '}
      •
      <Link to="/photographie" className="category-navigation-link">Photographie</Link>
      {' '}
      •
      <Link to="/informatique" className="category-navigation-link">Informatique</Link>
      {' '}
      •
      <Link to="/telephonie" className="category-navigation-link">Téléphonie</Link>
      {' '}
      •
      <Link to="/velos" className="category-navigation-link">Vélos</Link>
      {' '}
      •
      <Link to="/vehicules" className="category-navigation-link">Véhicules</Link>
      {' '}
      •
      <Link to="/sport" className="category-navigation-link">Sport</Link>
      {' '}
      •
      <Link to="/habillement" className="category-navigation-link">Habillement</Link>
      {' '}
      •
      <Link to="/bebe" className="category-navigation-link">Bébé</Link>
      {' '}
      •
      <Link to="/outillage" className="category-navigation-link">Outillage</Link>
      {' '}
      •
      <Link to="/services" className="category-navigation-link">Services</Link>
      {' '}
      •
      <Link to="/vacances" className="category-navigation-link">Vacances</Link>
    </nav>
  )
}
