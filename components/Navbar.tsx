import Link from "next/link" ;
import Image from "next/image" ;
// ...
import logo from "../public/images/logo.webp" ;

// Navbar
function Navbar(): JSX.Element
{
  return (
  <>
    <nav className="navbar navbar-light navbar-expand-xxl navLine padTB">
      <div className="container-fluid">
        <div className="navbar-brand d-flex justify-content-center align-items-center navImg scaler">
          <Image
            src={ logo }
            alt="JES Logo"
            title="Jakson Education System"
            layout="intrinsic"
            placeholder="empty"
            priority
            draggable="false"
          />
        </div>

        <button className="navbar-toggler blueColor scaler" data-bs-toggle="collapse" data-bs-target="#navCol">
          <span className="visually-hidden"> Toggle Navigation </span>
          <i className="fas fa-bars blueColor"></i>
        </button>

        <div className="collapse navbar-collapse" id="navCol">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item navLink">
              <Link href="/"> Home </Link>
            </li>

            <li className="nav-item navLink">
              <Link href="/print"> Print Challan </Link>
            </li>

            <li className="nav-item navLink">
              <Link href="/add"> Add Student </Link>
            </li>

            <li className="nav-item navLink">
              <Link href="/remove"> Remove Student </Link>
            </li>

            <li className="nav-item navLink">
              <Link href="/edit"> Edit Student </Link>
            </li>

            <li className="nav-item navLink lastLink">
              <Link href="/logout"> Log Out </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  </>
  )
}

// Export Navbar
export default Navbar ;