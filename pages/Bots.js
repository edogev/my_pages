// src/pages/Bots.js
import { useState } from 'react';
import BotSelector from '../components/BotSelector';
import BotCarousel from '../components/BotCarousel';
import { botsData } from '../data/botsData';

export default function Bots({ onNavigate }) {
  const [selectedBot, setSelectedBot] = useState(null);

  return (
    <div className="page-container">
      <div className="container">
        <div className="bots-page fade-in">
          {/* Hero Section */}
          <section className="hero-section">
            <h1 className="hero-title">Мои Проекты</h1>
            <p className="hero-subtitle">Telegram боты и автоматизированные системы</p>
            
            <div className="experience-badge">
              <span>🚀</span>
              <span>{botsData.length} проектов завершено</span>
            </div>
          </section>

          {/* Projects Section */}
          <section className="projects-section">
            <div className="section-title">
              <h2>Выберите проект</h2>
            </div>
            
            <BotSelector 
              bots={botsData} 
              onSelect={setSelectedBot}
              selectedBot={selectedBot}
            />
          </section>

          {/* Carousel Section */}
          {selectedBot && (
            <section className="carousel-section">
              <div className="section-title">
                <h2>{selectedBot.name}</h2>
                <p className="project-description">{selectedBot.description}</p>
              </div>
              
              <div className="carousel-container">
                <BotCarousel slides={selectedBot.slides} />
              </div>
            </section>
          )}

          {/* Back to Home */}
          <div className="cta-container">
            <button 
              className="cta-button secondary"
              onClick={() => onNavigate('home')}
            >
              <span>← Вернуться на главную</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}