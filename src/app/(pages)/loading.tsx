'use client'

import PacmanLoader from 'react-spinners/PacmanLoader'

function App() {
  return (
    <div style={{ height: '100vh', display: 'grid' }}>
      <div style={{ placeSelf: 'center' }}>
        <PacmanLoader color="#fdd51d" margin={0} size={40} />
      </div>
    </div>
  )
}

export default App
