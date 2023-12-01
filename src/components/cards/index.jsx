import { useEffect, useState } from "react";
import React from "react";
import "./index.scss"

function Cards() {
  const [open, setOpen] = useState(false)
  const [wishlistitem, setWishlistitem] = useState(
    localStorage.getItem("wishlistitem")
      ? JSON.parse(localStorage.getItem("wishlistitem"))
      : []
  );
  const [product, setProduct] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    localStorage.setItem("wishlistitem", JSON.stringify(wishlistitem));
  });
  
  useEffect(() => {
    getProductFetch();
  }, []);

  function changeTheme() {
    document.body.classList.toggle("dark")
  }

  async function getProductFetch() {
    const data = await fetch("https://fakestoreapi.com/products");
    const res = await data.json();
    setProduct(res);
    setIsloading(false);
  }
  

  function handleAddWishlist(item) {
    const elementIndex = wishlistitem.findIndex((x) => x.id === item.id);
    if (elementIndex !== -1) {
      const newWishlist = [...wishlistitem];
      newWishlist[elementIndex].count++;
      setWishlistitem(newWishlist);
    } else {
      setWishlistitem([...wishlistitem, { ...item, count: 1 }]);
    }
  }

  function Toggle() {
    setOpen(!open)
  }

  function RemoveWishlist(id) {
    setWishlistitem(wishlistitem.filter((x) => x.id !== id));
  }

  return (
    <div className="app">
      <div className="fakenav">
      <h2 onClick={Toggle}>Wishlist: </h2>
      <button onClick={changeTheme}>Change Theme</button>
      </div>
      
      <div className={Toggle ? 'wishlist' : ''}>
      

<div className="wishlist">
  {wishlistitem.map((x) => (
    <ul key={x.id}>
    <h5>Title : {x.title}</h5>
    <p>Price :{x.price} $</p>
    <p>Description : {x.description.slice(0, 40)}</p>
    <div className="img-box">
      <img src={x.image} alt="" />
    </div>
  
    <div className="btn-add">
    <button onClick={() => RemoveWishlist(x.id)}>
        Remove item from Favorites
      </button>
    </div>
  </ul>

      
    
  ))}
</div >
      </div>
      <hr />

      <div className="cards">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {product.map((x) => (
            <ul key={x.id}>
              <h5>Title : {x.title}</h5>
              <p>Price :{x.price} $</p>
              <p>Description : {x.description}</p>
              <div className="img-box">
                <img src={x.image} alt="" />
              </div>
              <button onClick={() => handleAddWishlist(x)}>Add to Favorites</button>
            </ul>
          ))}
        </>
      )}
      </div>
    </div>
  );
}

export default Cards;
