import { SpeedInsights } from '@vercel/speed-insights/react'
import Hero from './Pages/Hero'
import Introduction from './Pages/Introduction'
import Cart from './Pages/Cart'
function App() {

  return (
    <>
      <Hero />
      <Introduction />
      <Cart />
      <SpeedInsights />
    </>
  )
}

export default App
