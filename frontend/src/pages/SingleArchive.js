import {Link, useParams} from 'react-router-dom';
import Archives from '../data';
import Button from '@material-ui/core/Button';

/*URL Params*/
const SingleArchive = () => {
  const {archiveid}=useParams(); //same name is App.js, use params mean wt we send in link
  const archive = Archives.find((archive) => archive.id === archiveid); /*here productid suppose to have
  url name which we send from Products.js using useParams*/
  const {name}= archive;
  return (
    <section className='section product'>
      <h5>{name}</h5>
     <Button variant='contained' color='primary'><Link to="/Products">back to Product</Link></Button>
    </section>
  );
};

export default SingleArchive;
