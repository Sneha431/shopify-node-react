import axios from "axios";
import { createSlice } from '@reduxjs/toolkit';


const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    singledata: {},
    title: "",
    position:""
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
 
    },
    setsingleProducts(state, action) {
      state.singledata = action.payload;
    
    },
    settitle(state, action) {
      state.title = action.payload;
   
    },
    setposition(state, action) {
      state.position = action.payload;
    
    },
    removeProducts(state, action) {
      state.data=state.data.filter(item => item.id !== action.payload)
      return state;
    },
  },
});
export const {
  setProducts,
  removeProducts,
  setsingleProducts,
  settitle,
  setposition
} = productSlice.actions;
export default productSlice.reducer;

  export function getProducts() {
 
  return async function fetchproductsthunk(dispatch, getstate) {
      try {
        axios
          .get('http://localhost:5000/api/getProducts')
  
          .then((response) => {
            dispatch(setProducts(response.data.data.products));
          
          });
      } catch (err) {
        console.log(err);
       
      }
      }
    }
  
    export function deleteproduct(id){
        return async function fetchproductsthunk(dispatch, getstate) {
        await axios({
          method: 'post',
          url: `http://localhost:5000/api/deleteProducts/${id}`,
     headers: {'Content-Type' : 'application/json'},
        
      })
        
           .then((res) => {
            dispatch(removeProducts(id));
          console.log()
          dispatch(getProducts());
           })
           .catch((err) => {
              console.log(err);
           });
      }
    }
    export function postproducts(data){
      return async function fetchproductsthunk(dispatch, getstate) {
      await axios({
        method: 'post',
        url: 'http://localhost:5000/api/postProducts',
        headers: {'Content-Type' : 'application/json'},
        data: JSON.stringify(data)
      
    })
      
         .then((response) => {
         
        

         })
         .catch((err) => {
            console.log(err);
         });
    }
  }

  export function getproductbyid (id){
    return async function fetchproductsthunk(dispatch, getstate) {
    await axios({
        method: 'get',
        url: `http://localhost:5000/api/getProducts/${id}`,
   headers: {'Content-Type' : 'application/json'},
      
    })
      
         .then((res) => {
       console.log(res.data.data)
       dispatch(setsingleProducts(res.data.data.product));
     
       dispatch(settitle(res.data.data.product.title));
       dispatch(setposition(res.data.data.product.images.length));
         })
         .catch((err) => {
            console.log(err);
         });
  }
}


export function putproducts(data,id){
 
  return async function fetchproductsthunk(dispatch, getstate) {
    await axios({
      method: 'put',
      url: `http://localhost:5000/api/putProducts/${id}`,
    headers: {'Content-Type' : 'application/json'},
      data: JSON.stringify({data})
    })
  
    .then((res) => {
      // dispatch(getProducts());
 
        })
        .catch((err) => {
     
        });
}
}