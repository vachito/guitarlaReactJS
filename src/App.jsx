import {useState} from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import {db} from "./data/db";

function App() {
  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  function addToCart(item){
    const ItemExists = cart.findIndex(guitar => guitar.id === item.id)

    if(ItemExists >= 0){
      if(cart[ItemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[ItemExists].quantity++
      setCart(updatedCart)      
    }else{
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function increaseQuantity(id){
    const updatedCart = cart.map(guitar => {
      if(guitar.id === id && guitar.quantity < MAX_ITEMS){
        return {...guitar, quantity: guitar.quantity + 1}
      }
      return guitar
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id){
    const updatedCart = cart.map(guitar => {
      if(guitar.id === id && guitar.quantity > MIN_ITEMS){
        return {...guitar, quantity: guitar.quantity - 1}
      }
      return guitar
    })
    setCart(updatedCart)
  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }


  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        setCart={setCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      /> 
    
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map(guitar=>(
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
