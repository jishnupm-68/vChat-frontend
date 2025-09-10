import  { useEffect, useState } from 'react'
import { CgDarkMode } from "react-icons/cg";

//function for toggleing the theme
const ThemeToggle = () => {
    const root = document.documentElement;
    const [dark, setDark] = useState(false);
    useEffect(()=>{
       root.setAttribute("data-theme", 
            root.getAttribute("data-theme") === "dark" ?
             "light" : "dark");
    },
    [dark])
  return (
    <div className=' flex  items-center' onClick={()=>{
            setDark(!dark)}}>{dark?"Light":"Dark"}
        <button  className='pl-2 '
        ><CgDarkMode size={20}/> </button>
    </div>
  )
}

export default ThemeToggle
