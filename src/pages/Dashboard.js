
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.log('No hay usuario autenticado');
      navigate('/login');
    }
  }

  if (!user) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <p>Bienvenido, {user.username}</p>
        </div>

        <div className="dashboard-cards">
          <div className="card">
            <div className="card-icon">📊</div>
            <h3>Estadísticas</h3>
            <p>Ver tus métricas y análisis</p>
          </div>

          <div className="card">
            <div className="card-icon">📁</div>
            <h3>Proyectos</h3>
            <p>Administra tus proyectos</p>
          </div>

          <div className="card">
            <div className="card-icon">⚙️</div>
            <h3>Configuración</h3>
            <p>Ajusta tu perfil y preferencias</p>
          </div>

          <div className="card">
            <div className="card-icon">📈</div>
            <h3>Reportes</h3>
            <p>Genera y descarga reportes</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Actividad Reciente</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-dot"></span>
              <div>
                <p className="activity-title">Bienvenido a tu dashboard</p>
                <p className="activity-time">Hace un momento</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
