
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Products from './components/Products';
import PostProduct from './components/PostProduct';
import UpdateProduct from './components/UpdateProduct';
import store from "./components/store/store"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
let persister = persistStore(store);
function App() {
  return (
    <div className="App">
<Provider store={store}>
        <PersistGate persistor={persister}>
  <BrowserRouter>
         
            <Routes>
            <Route path="/" element={<Products />}/>

<Route path="/postproduct" element={<PostProduct />}/>
<Route path="/updateproduct/:id" element={<UpdateProduct />}/>
            </Routes>
        
          </BrowserRouter>
          </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
