import { useEffect, useState } from "react";
import React from "react";
import "./index.scss"

function Cards() {
  const [open, setOpen] = useState(false)
  const [basket, setBasket] = useState(
    localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket"))
      : []
  );
  const [product, setProduct] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  });
  useEffect(() => {
    getProductFetch();
  }, []);

  async function getProductFetch() {
    const data = await fetch("https://fakestoreapi.com/products");
    const res = await data.json();
    setProduct(res);
    setIsloading(false);
  }
  function handleAddBasket(item) {
    const elementIndex = basket.findIndex((x) => x.id === item.id);
    if (elementIndex !== -1) {
      const newBasket = [...basket];
      newBasket[elementIndex].count++;
      setBasket(newBasket);
    } else {
      setBasket([...basket, { ...item, count: 1 }]);
    }
  }

  function Toggle() {
    setOpen(!open)
  }

  function handleRemoveBasket(id) {
    setBasket(basket.filter((x) => x.id !== id));
  }
  // function ChanhgeCount(isAdd, item) {
  //   const elementIndex = basket.findIndex((x) => x.id === item.id);
  //   const newBasket = [...basket];
  //   if (isAdd) {
  //     newBasket[elementIndex].count++;
  //     setBasket(newBasket);
  //   } else {
  //     if (newBasket[elementIndex].count > 0) {
  //       newBasket[elementIndex].count--;
  //       setBasket(newBasket);
  //     }
  //   }
  // }
  return (
    <div className="app">
      <h2 onClick={Toggle}>Wishlist: </h2>
      <div className={Toggle ? 'wishlist' : ''}>
        
        {basket.map((x) => (
          <ul key={x.id}>
          <h5>Title : {x.title}</h5>
          <p>Price :{x.price} $</p>
          <p>Description : {x.description.slice(0, 40)}</p>
          <div className="img-box">
            <img src={x.image} alt="" />
          </div>
          <button onClick={() => handleRemoveBasket(x.id)}>
              Remove Basket
            </button>
        </ul>

            
          
        ))}
      </div >
      <div className="Basketwrap">
      <h2 onClick={Toggle}>Basket</h2>

<div className={Toggle ? 'wishlist' : ''}>
  {basket.map((x) => (
    <ul key={x.id}>
    <h5>Title : {x.title}</h5>
    <p>Price :{x.price} $</p>
    <p>Description : {x.description.slice(0, 40)}</p>
    <div className="img-box">
      <img src={x.image} alt="" />
    </div>
  
    <button onClick={() => handleRemoveBasket(x.id)}>
        Remove Basket
      </button>
  </ul>

      
    
  ))}
</div >
      </div>

      <div className="cards">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {product.map((x) => (
            <ul key={x.id}>
              <h5>Title : {x.title}</h5>
              <p>Price :{x.price} $</p>
              <p>Description : {x.description.slice(0, 40)}</p>
              <div className="img-box">
                <img src={x.image} alt="" />
              </div>
              <button onClick={() => handleAddBasket(x)}>Add Basket</button>
            </ul>
          ))}
        </>
      )}
      </div>
    </div>
  );
}

export default Cards;
