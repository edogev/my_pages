import { useState } from 'react';
import Home from './pages/Home';
import Bots from './pages/Bots';
import './styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">@edogev</div>
          <div className="nav-buttons">
            <button 
              className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              Главная
            </button>
            <button 
              className={`nav-btn ${currentPage === 'bots' ? 'active' : ''}`}
              onClick={() => setCurrentPage('bots')}
            >
              Мои работы
            </button>
          </div>
        </div>
      </nav>

      <main>
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'bots' && <Bots onNavigate={setCurrentPage} />}
      </main>
    </div>
  );
}

export default App;