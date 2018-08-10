import React from 'react'

export default ({ joke: { setup, punchline } }) => {
  return (
    <div>
      <h3>{ setup }</h3>
      <p>{ punchline }</p>
    </div>
  )
}
