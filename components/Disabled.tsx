// Name
function Name(): JSX.Element
{
  return (
  <>
  <div className="form-floating mb-3 mt-3">
    <select name="name" value="NULL" disabled className="form-select textInput">
      <option value="NULL" className="bold displayNone"> Select The Student </option>
    </select>
    <label htmlFor="name" className="textInput"> Student* </label>
  </div>
  </>
  )
}

// Father
function Father(): JSX.Element
{
  return (
  <>
    <div className="form-floating mb-3 mt-3">
      <input 
        name="father" 
        type="text"
        value=""
        disabled
        maxLength={ 50 }
        pattern="^[a-zA-Z].*[\s\.]*$"
        placeholder="Father's Name*" 
        className="form-control textInput" 
      />
      <label htmlFor="father" className="textInput"> Father's Name* </label>
    </div>
  </>
  )
}

// Reg
function Reg(): JSX.Element
{
  return (
  <>
    <div className="form-floating mb-3 mt-3">
      <input 
        name="reg" 
        type="text"
        value=""
        disabled
        maxLength={ 50 }
        pattern="[A-Z\d]"
        placeholder="Reg No.*" 
        className="form-control textInput" 
      />
      <label htmlFor="reg" className="textInput"> Reg No.* </label>
    </div>
  </>
  )
}

// Fees
function Fees(): JSX.Element
{
  return (
  <>
    <div className="form-floating mb-3 mt-3">
      <input 
        name="fees" 
        type="number"
        value=""
        disabled
        min={ 0 }
        max={ 99999 }
        pattern="^[0-9]+$"
        placeholder="Fees*" 
        className="form-control textInput" 
      />
      <label htmlFor="fees" className="textInput"> Fees* </label>
    </div>
  </>
  )
}

// Arrears
function Arrears(): JSX.Element
{
  return (
  <>
    <div className="form-floating mb-3 mt-3">
      <input 
        name="arrears" 
        type="number"
        value=""
        disabled
        min={ 0 }
        max={ 99999 }
        pattern="^[0-9]+$"
        placeholder="Arrears*" 
        className="form-control textInput" 
      />
      <label htmlFor="arrears" className="textInput"> Arrears* </label>
    </div>
  </>
  )
}

// Exports
export { Name, Father, Reg, Fees, Arrears } ;