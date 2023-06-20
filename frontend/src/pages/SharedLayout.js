import {Outlet} from 'react-router-dom';
import StyledNavBar from '../component/StyledNavBar';
const SharedLayout = () => {
    return(
<>
<StyledNavBar/>
  <Outlet /> {/*it will render the child nested routes*/}
  {/*هيك الهوم بيج حتضل تطلع بكل صفحات النستد جواها*/}
</>
    );
};
export default SharedLayout;