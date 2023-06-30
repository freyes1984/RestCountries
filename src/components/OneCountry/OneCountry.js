import React from "react";

const OneCountry = ({ country }) => {
  return (
    <div className="card" style={{ "width": "25rem" }}>
      {
        country.map((country, key) =>
          <div className="card-body" key={key}>
            <img key={country.flags.svg} src={country.flags.svg} className="card-img-top" alt={country.name.common}></img>
            <h3 className="card-title">{country.name.common}</h3>
            <p className="card-text">Official Name: {country.name.official}</p>
            <p className="card-text">Capital: {country.capital}</p>
            <p className="card-text">Population: {country.population}</p>
            <p className="card-text">Region: {country.region}</p>
            <p className="card-text">Subregion: {country.subregion}</p>
            <h5 className="card-title">Spoken Lenguages</h5>
            <ul>
              {
                Object.keys(country.languages)
                  .map(
                    key => <li key={country.languages[key]}>{key} - {country.languages[key]}</li>
                  )
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}

export default OneCountry