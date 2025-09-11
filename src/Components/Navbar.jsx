import { useDispatch, useSelector } from "react-redux"
import ThemeToggle from "./ThemeToggle"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"

const Navbar = () => {
  const user = useSelector((store)=>store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async()=>{
    try {
      const result = await axios.post(BASE_URL+"/logout",{},{withCredentials:true} )
      console.log("result logout",result)
      dispatch(removeUser())
      return navigate('/login')
    } catch (error) {
      console.log("Error: ", error.message)
    }
  }
  return (
     <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link className="btn btn-ghost text-xl" to='/'>vChat</Link> 
    
  </div>
  <div className="flex gap-2">
    <ThemeToggle />
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    {user && <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user profile photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link className="justify-between" to='/profile/view'>
            Profile
            <span className="badge">{user?.firstName}</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
      </ul>
    </div>}
  </div>
</div>
  )
}

export default Navbar
