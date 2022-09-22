// Loading
function Loading(): JSX.Element
{
  return (
  <>
    <div className="container-fluid d-flex justify-content-center align-items-center animationHeight">
      <svg width="500" height="500" viewBox="0 0 100 100" fill="none" className="scaler" xmlns="http://www.w3.org/2000/svg">
        <g id="frame">
          <rect id="blueHorizontal" x="25" y="35" width="30" height="10" fill="#282D3C" />
          <rect id="blueVertical" x="35" y="45" width="10" height="30" fill="#282D3C" />
          <rect id="yellowHorizontal" x="45" y="55" width="30" height="10" fill="#FA961E" />
          <rect id="yellowVertical" x="55" y="25" width="10" height="30" fill="#FA961E" />
          <rect id="red" x="45" y="45" width="10" height="10" fill="#BE1E2D" />
        </g>
      </svg>
    </div>
  </>
  )
}

// Export Loading
export default Loading ;