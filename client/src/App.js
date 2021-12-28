import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddProduct from './components/AddProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/addproduct" element={<AddProduct/>} />
      <Route exact path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>  } />
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
