import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Parser } from 'html-to-react'

import "./css/product.css"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {deleteproduct,getProducts} from "./store/ProductSlice";
function Products() {
const dispatch = useDispatch();
const [products,setproduct] = useState([])
const { data } = useSelector(
  (state) => state.product
);

useEffect(() => {
  dispatch(getProducts());
  setproduct(data)
}, [data]);
    
 
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

                 <item><img src={image?image.src:""} alt={image?image.alt:""} className="img-responsive" key={p.id} height="50px"/></item>
                 
               
                
                   
                    ))}
                    </Carousel> :<img className="img-responsive" src={p.image?p.image.src:""} alt={p.image?p.image.alt:""} height="50px"/>}
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
  <button type="button" class="btn btn-secondary"><Link to={`updateproduct/${p.id}`}>Edit</Link></button>
  <button type="button" class="btn btn-secondary"><span onClick={() => dispatch(deleteproduct(p.id))}>Delete</span></button>
  <button type="button" class="btn btn-secondary">Add to Cart</button>
 
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
