
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Products from './components/Products';
import PostProduct from './components/PostProduct';
import UpdateProduct from './components/UpdateProduct';


function App() {
  return (
    <div className="App">

  <BrowserRouter>
         
            <Routes>
            <Route path="/" element={<Products />}/>

<Route path="/postproduct" element={<PostProduct />}/>
<Route path="/updateproduct/:id" element={<UpdateProduct />}/>
            </Routes>
        
          </BrowserRouter>
    </div>
  );
}

export default App;
