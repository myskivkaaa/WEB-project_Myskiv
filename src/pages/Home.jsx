import TrainList from '../components/TrainList';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '40px' }}>
      <header style={{ 
        backgroundColor: '#005ebb', 
        color: 'white', 
        padding: '20px', 
        textAlign: 'center',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Укрзалізниця: Пошук квитків</h1>
      </header>
      
      <main>
        <TrainList />
      </main>
    </div>
  );
};

export default Home;