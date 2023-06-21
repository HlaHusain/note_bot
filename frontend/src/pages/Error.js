import {Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
const Error = () => {
  return (
    <section className='section'>
      <h2>404 Error</h2>
      <p>Page not fount</p>
      <Button variant='contained' color='primary'><Link to='/'>Back Home</Link></Button>
    </section>
  );
};
export default Error;
