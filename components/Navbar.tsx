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
          <Link href="/">
            <a className="d-flex justify-content-center align-items-center">
              <Image
                src={ logo }
                alt="JES Logo"
                title="Jakson Education System"
                layout="intrinsic"
                placeholder="empty"
                priority
                draggable="false"
              />
            </a>
          </Link>
        </div>

        <button className="navbar-toggler blueColor scaler" data-bs-toggle="collapse" data-bs-target="#navCol">
          <span className="visually-hidden"> Toggle Navigation </span>
          <i className="fas fa-bars blueColor"></i>
        </button>

        <div className="collapse navbar-collapse" id="navCol">
          <ul className="navbar-nav ms-auto">

            <Link href="/">
              <a className="nav-item navLink"> Home </a>
            </Link>

            <Link href="/print">
              <a className="nav-item navLink"> Print Challan </a>
            </Link>

            <Link href="/add">
              <a className="nav-item navLink"> Add Student </a>
            </Link>

            <Link href="/remove">
              <a className="nav-item navLink"> Remove Student </a>
            </Link>

            <Link href="/edit">
              <a className="nav-item navLink"> Edit Student </a>
            </Link>

            <Link href="/logout">
              <a className="nav-item navLink lastLink"> Log Out </a>
            </Link>

          </ul>
        </div>
      </div>
    </nav>
  </>
  )
}

// Export Navbar
export default Navbar ;