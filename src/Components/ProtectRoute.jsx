import {Navigate, Outlet} from "react-router-dom"


const ProtectRoute = () => {
    const token = document.cookie    
    return token ? <Outlet />:<Navigate to ="/login" replace /> ;
}

export default ProtectRoute
