import {BrowserRouter,Routes,Route} from "react-router-dom";
import Landing from "./pages/Landing"; import Login from "./pages/Login"; import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; import Applications from "./pages/Applications"; import ApplicationDetails from "./pages/ApplicationDetails";
import Interviews from "./pages/Interviews"; import Analytics from "./pages/Analytics"; import Settings from "./pages/Settings"; import NotFound from "./pages/NotFound";
export default function App(){return <BrowserRouter><Routes>
<Route path="/" element={<Landing/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
<Route path="/dashboard" element={<Dashboard/>}/><Route path="/applications" element={<Applications/>}/><Route path="/applications/:id" element={<ApplicationDetails/>}/>
<Route path="/interviews" element={<Interviews/>}/><Route path="/analytics" element={<Analytics/>}/><Route path="/settings" element={<Settings/>}/>
<Route path="*" element={<NotFound/>}/></Routes></BrowserRouter>}
