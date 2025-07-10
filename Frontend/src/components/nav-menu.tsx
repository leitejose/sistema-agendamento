import { NavLink } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { FaCalendarCheck } from "react-icons/fa";
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";







export function MenuComponent() {
  return (
    <div className="flex justify-end">
      <nav className="flex space-x-4 p-2 rounded-sm">
        <NavLink
          to="/home-screen"
          className={({ isActive }) =>
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }`
          }
        >
          <TiHome 
          size={25} />
        </NavLink>
        <NavLink
          to="/markings-screen"
          className={({ isActive }) =>
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }`
          }
        >
          <FaCalendarCheck 
          size={25} />
        </NavLink>
        <NavLink
          to="/statistics-screen"
          className={({ isActive }) =>
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }`
          }
        >
          <BsFileEarmarkBarGraphFill 
          size={25} />
        </NavLink>
        <NavLink
          to="/vacance-screen"
          className={({ isActive }) =>
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
              isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }`
          }
        >
          <IoMdSettings 
          size={25} />

        </NavLink>
      </nav>
    </div>
  );
}
