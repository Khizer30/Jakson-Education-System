// Loading
function Loading(): JSX.Element
{
  return (
  <>
    <div className="container-fluid d-flex justify-content-center align-items-center animationHeight">
      <svg width="300" height="300" viewBox="0 0 100 100" fill="none" className="scaler" xmlns="http://www.w3.org/2000/svg">
        <g id="Frame">
          <rect id="Blue" x="10" y="12" width="20" height="75" rx="3" fill="#282D3C" />
          <rect id="Yellow" x="40" y="12" width="20" height="75" rx="3" fill="#FA961E" />
          <rect id="Red" x="70" y="12" width="20" height="75" rx="3" fill="#BE1E2D" />
        </g>
      </svg>
    </div>
  </>
  )
}

// Export Loading
export default Loading ;