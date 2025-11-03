import React from 'react'

function Results({accuracy, speed} : {accuracy: string, speed: number }) {
  return (
    <div>
        <p>Accuracy: {accuracy}</p>
        <p>Speed: {speed}</p>
    </div>
  )
}

export default Results