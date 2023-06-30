import React from "react";

const AlertFilter = (props) => {

    if(props.allInput === ''){
      return(
        <div>
          <p>Please write...</p>
        </div>
      )
    }
  
    if(props.allRows.length > 10){
      return (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    }
}

export default AlertFilter