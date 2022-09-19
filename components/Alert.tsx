// Props
interface Props
{
  message: string ;
  warn: boolean ;
}

// Alert
function Alert({ message, warn }: Props): JSX.Element
{
  return (
  <>
  { message &&
    <div role="alert" className={ "alert text-center scaler" + (warn ? " alert-danger" : " alert-success") }>
      <span className="alertP"> { message } </span>
    </div>
  }
  { !message &&
    <div role="alert" className="alert text-center scaler alert-danger invisible">
      <span className="alertP"> <br /> </span>
    </div>
  }
  </>
  )
}

// Export Alert
export default Alert ;