import type { AppProps } from "next/app" ;
// ...
import Navbar from "../components/Navbar" ;
import "../styles/global.css" ;

// App
function App({ Component, pageProps }: AppProps): JSX.Element
{
  return (
  <>
    <Navbar />
    <Component { ...pageProps } />
  </>
  )
}

// Export App
export default App ;