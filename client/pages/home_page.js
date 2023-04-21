import Navigation from './Navigation';

function Box() {
  return (
    <div className="box">
      <h2>My Box Title</h2>
      <p>This is my box content.</p>
    </div>
  );
}

function HomePage() {
  return (
    <div className="page-container">
      <Navigation />
      <div className="middle-container">
        <Box />
      </div>
    </div>
  );
}

export default HomePage;
