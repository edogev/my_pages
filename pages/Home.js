// src/pages/Home.js
import { personalInfo, skillsData, workExperience } from '../data/data';

// Функция для расчета опыта работы в месяцах между двумя датами
const calculateExperience = (startDate, endDate = null) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += end.getMonth();
  
  return Math.max(0, months);
};

// Функция для форматирования опыта в читаемый вид
const formatExperience = (months) => {
  if (months < 12) {
    return `${months} ${getMonthsWord(months)}`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} ${getYearsWord(years)}`;
  }
  return `${years} ${getYearsWord(years)} ${remainingMonths} ${getMonthsWord(remainingMonths)}`;
};

// Функция для правильного склонения лет
const getYearsWord = (years) => {
  if (years % 10 === 1 && years % 100 !== 11) return 'год';
  if (years % 10 >= 2 && years % 10 <= 4 && (years % 100 < 10 || years % 100 >= 20)) return 'года';
  return 'лет';
};

// Функция для правильного склонения месяцев
const getMonthsWord = (months) => {
  if (months === 1) return 'месяц';
  if (months >= 2 && months <= 4) return 'месяца';
  return 'месяцев';
};

// Функция для форматирования периода работы
const formatPeriod = (startDate, endDate = null) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const formatDate = (date) => {
    const months = [
      'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
      'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  const startStr = formatDate(start);
  const endStr = endDate ? formatDate(end) : 'настоящее время';
  
  return `${startStr} — ${endStr}`;
};

// Расчет общего опыта работы от начала карьеры
const calculateTotalExperience = () => {
  const totalMonths = calculateExperience(personalInfo.careerStartDate);
  return formatExperience(totalMonths);
};

// Компонент для уровня навыка с анимацией
const SkillLevel = ({ level, experienceMonths }) => {
  const getPercentage = () => {
    const maxMonths = 60; // 5 лет как 100%
    return Math.min((experienceMonths / maxMonths) * 100, 100);
  };

  const getLevelText = () => {
    switch(level) {
      case 'advanced': return 'Продвинутый';
      case 'intermediate': return 'Средний';
      case 'beginner': return 'Начальный';
      default: return level;
    }
  };

  return (
    <div className="skill-level">
      <div className="level-info">
        <span className="level-text">{getLevelText()}</span>
        <span className="level-percentage">{Math.round(getPercentage())}%</span>
      </div>
      <div className="level-bar">
        <div 
          className="level-fill" 
          style={{ width: `${getPercentage()}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function Home({ onNavigate }) {
  const totalExperience = calculateTotalExperience();

  return (
    <div className="page-container">
      <div className="container">
        <div className="home-content fade-in">
          {/* Hero Section */}
          <section className="hero-section">
            <h1 className="hero-title">{personalInfo.name}</h1>
            <p className="hero-subtitle">{personalInfo.position}</p>
            
            <div className="experience-badge">
              <span>🎯</span>
              <span>Опыт работы: {totalExperience}</span>
            </div>

            <div className="contact-info">
              <div className="contact-item">
                <span>📱</span>
                <span>{personalInfo.contacts.phone}</span>
              </div>
              <div className="contact-item">
                <span>✉️</span>
                <span>{personalInfo.contacts.email}</span>
              </div>
              <div className="contact-item">
                <span>💬</span>
                <span>{personalInfo.contacts.telegram}</span>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="skills-section">
            <div className="section-title">
              <h2>Технологии и навыки</h2>
            </div>
            
            <div className="skills-grid">
              {skillsData.map((skill, index) => {
                const experienceMonths = calculateExperience(skill.startDate);
                const experienceFormatted = formatExperience(experienceMonths);
                
                return (
                  <div key={index} className="skill-card">
                    <div className="skill-header">
                      <h3>{skill.name}</h3>
                      <span className="experience-tag">{experienceFormatted}</span>
                    </div>
                    <p>{skill.description}</p>
                    <SkillLevel 
                      level={skill.level} 
                      experienceMonths={experienceMonths}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Experience Section */}
          <section className="experience-section">
            <div className="section-title">
              <h2>Карьерный путь</h2>
            </div>
            
            <div className="timeline">
              {workExperience.map((job, index) => {
                const experienceMonths = calculateExperience(job.startDate, job.endDate);
                const experienceFormatted = formatExperience(experienceMonths);
                const periodFormatted = formatPeriod(job.startDate, job.endDate);
                
                return (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="job-header">
                        <h3>{job.position}</h3>
                        <span className="job-duration">{experienceFormatted}</span>
                      </div>
                      <p className="company-name">{job.company}</p>
                      <p className="job-period">{periodFormatted}</p>
                      <ul className="responsibilities">
                        {job.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA Section */}
          <div className="cta-container">
            <button 
              className="cta-button"
              onClick={() => onNavigate('bots')}
            >
              <span>Посмотреть проекты</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}