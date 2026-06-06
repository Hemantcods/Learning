import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const NavBarContext=createContext(null)
export const NavbarColourContext=createContext(null)
const NavContext = ({children}) => {
    const [navColour, setnavColour] = useState('white')
    const [navOpen,setnavOpen]=useState(false)
    const locate=useLocation().pathname
    useEffect(()=>{
      if(locate==='/agence'){
        setnavColour('black')
      }else{
        setnavColour('white')
      }
    },[locate])
  return (
    <div>
        <NavBarContext.Provider value={[navOpen,setnavOpen]}>
          <NavbarColourContext.Provider value={[navColour,setnavColour]}>
            {children}
          </NavbarColourContext.Provider>
        </NavBarContext.Provider>
    </div>
  )
};

export default NavContext;
