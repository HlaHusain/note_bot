import { NavLink } from "react-router-dom";
import Responsivelogo from "../pages/Responsivelogo";
const Navbar = () => {
    return (
        <nav className='navbar'>
            <NavLink to="/" className={({isActive})=>{
                return isActive ? 'link active' : 'link';
            }} >Home</NavLink>
            <NavLink to="/Courses" className={({isActive})=>{
                return isActive ? 'link active' : 'link';
            }}>Courses</NavLink>
            <NavLink to="/Archive" className={({isActive})=>{
                return isActive ? 'link active' : 'link';
            }}>Archive</NavLink>
              <NavLink to="/Signup" className={({isActive})=>{
                return isActive ? 'link active' : 'link';
            }}>Sign up</NavLink>

            <div className="logo-container">
                <Responsivelogo/>
                </div>
                
        </nav> 
    );
    }
    export default Navbar;