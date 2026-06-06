import { createContext, useEffect, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import { useLocation } from "react-router-dom";

type NavBarContextType = [boolean, Dispatch<SetStateAction<boolean>>];
type NavbarColourContextType = [string, Dispatch<SetStateAction<string>>];

export const NavBarContext=createContext<NavBarContextType | null>(null)
export const NavbarColourContext=createContext<NavbarColourContextType | null>(null)
const NavContext = ({children}: {children: ReactNode}) => {
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
