import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Parser } from 'html-to-react'

import "./css/product.css"
import { Link } from 'react-router-dom';
function Products() {
const [products,setProducts]=useState([])
    useEffect(() => {
        getProducts();
    }, [])
    
    const getProducts = async() =>{
//  fetch("http://localhost:5000/api/getProducts").then((res) => res.json())
//  .then((json) => {
//     console.log(json)
//     setProducts(json.data.products)
//  }).catch((err)=>{
//         console.log(err);
//     })

    try {
      const response = await fetch("http://localhost:5000/api/getProducts");
      const data = await response.json();
      console.log(data);
      setProducts(data.data.products)
    } catch (error) {
      console.log(error);
    }
  
    }
  return (
    <div>
      
      <div className="container">
    <div className="row">
    {products && products.map((p) =>(
        <div className="col-md-6" style={{"padding":"15px"}}>
            <div style={{"display":"inline-block" ,"border":"solid 1px #808080" ,"padding":"15px"}}>
                <div  key={p.id}>
           
               {p.images.length > 1 ? <Carousel itemsToShow={1}>
                {p && p.images.map((image) =>(

                 <item><img src={image.src} alt={image.alt} className="img-responsive" key={p.id} height="50px"/></item>
                 
               
                
                   
                    ))}
                    </Carousel> :<img className="img-responsive" src={p.image.src} alt={p.image.alt} height="50px"/>}
                    <br />
                    <h2 className="float-xs-right">{p.price}</h2>
                    <h2>{p.title}</h2>
                    <br />
                    <p className="text-justify">{Parser().parse(p.body_html)}</p>
                </div>
                <br />
                <div className="ratings text-xs-center">
                  <p>{p.status === "active" ? "In Stock" : "Out of Stock"}</p>
                    
                </div>
                <br />
              
                <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary"><Link to={`edit/${p.id}`}>Edit</Link></button>
  <button type="button" class="btn btn-secondary">Delete</button>
 
</div>

            </div>
        </div>
         ))}
      
    </div>
</div>






    </div>
  )
}

export default Products
