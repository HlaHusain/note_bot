import { Link } from "react-router-dom";
import Archives from "../data";
const Archive = () => {
  return (
    <>
      <section className='section'>
        <div className='archives'>
          <h4>Archived Note</h4>
          {Archives.map((archive) => {
            return (
              <article key={archive.id}>
                <h5>{archive.name}</h5>
                <Link to={`/Archive/${archive.id}`} className='btn'>more info </Link> {/* need to match wt in
                App.js */}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Archive;
