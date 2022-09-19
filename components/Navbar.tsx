import Link from "next/link" ;

// Navbar
function Navbar(): JSX.Element
{
  return (
  <>
    <nav className="navbar navbar-light navbar-expand-xxl navLine">
      <div className="container-fluid">
        <div className="navbar-brand">
          <img src="/images/logo.webp" alt="JES Logo" title="Jakson Education System" loading="eager" draggable="false" className="navImg scaler" />
        </div>

        <button className="navbar-toggler blueColor scaler" data-bs-toggle="collapse" data-bs-target="#navCol">
          <span className="visually-hidden"> Toggle Navigation </span>
          <i className="fas fa-bars blueColor"></i>
        </button>

        <div className="collapse navbar-collapse" id="navCol">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item navLink hoverBold">
              <Link href="/print"> Print Challan </Link>
            </li>

            <li className="nav-item navLink hoverBold">
              <Link href="/add"> Add Student </Link>
            </li>

            <li className="nav-item navLink hoverBold">
              <Link href="/remove"> Remove Student </Link>
            </li>

            <li className="nav-item navLink hoverBold">
              <Link href="/edit"> Edit Student </Link>
            </li>

            <li className="nav-item navLink hoverBold lastLink">
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