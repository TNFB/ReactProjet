import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Cart from '../components/Cart'
import ShoppingList from '../components/ShoppingList'
import { useState } from 'react'
function Home() {
  const [cart, updateCart] = useState([])
  return (
    <div>
      <Banner />
      <Cart cart={cart} updateCart={updateCart} />
      <ShoppingList cart={cart} updateCart={updateCart} />
      <Footer />
    </div>
  )
}
export default Home;


