import type { AppProps } from "next/app" ;

// App
function App({ Component, pageProps }: AppProps): JSX.Element
{
  return (
  <>
    <Component { ...pageProps } />
  </>
  )
}

// Export App
export default App ;