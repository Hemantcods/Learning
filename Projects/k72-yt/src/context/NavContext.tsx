import { createContext, useState } from "react";

export const NavBarContext=createContext(null)
const NavContext = ({children}) => {
    const [navOpen,setnavOpen]=useState(false)
  return (
    <div>
        <NavBarContext.Provider value={[navOpen,setnavOpen]}>
            {children}
        </NavBarContext.Provider>
    </div>
  )
};

export default NavContext;
