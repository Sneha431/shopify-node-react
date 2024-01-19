
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Products from './components/Products';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">

  <BrowserRouter>
         
            <Routes>
            <Route path="/" element={<Products />}/>

<Route path="/edit/:id" element={<UpdateProduct />}/>
             
            </Routes>
        
          </BrowserRouter>
    </div>
  );
}

export default App;
