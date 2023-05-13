import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AutContext"


function ProductedRoute({element}) {
    
    const {loggedIn} = useAuth()
  return (
    <div>
        {loggedIn ? <Outlet/> : <Navigate  to="/" />}
    </div>
  )
}

export default ProductedRoute