const Dashboard = ({user}) => {
  return (
    <section className='section'>
      <h4>Hallo {user?.name}</h4>
    </section>
  );
};
export default Dashboard;
