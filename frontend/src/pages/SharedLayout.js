import {Outlet} from 'react-router-dom';
import StyledNavBar from '../Navbar/StyledNavBar';
const SharedLayout = () => {
    return(
<>
<StyledNavBar/>
  <Outlet /> {/*it will render the child nested routes*/}
</>
    );
};
export default SharedLayout;