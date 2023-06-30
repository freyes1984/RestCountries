import React from "react";

const ItemCountries = ({labelCountry, showOnlyCountry}) => {
    return(
            <li>
              {labelCountry} 
              <button onClick={()=>showOnlyCountry(labelCountry)}>show</button>
            </li>
    )
}

export default ItemCountries