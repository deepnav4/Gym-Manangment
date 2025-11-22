import './styles/main.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import MemberDashboard from './pages/MemberDashboard';
import TrainerDashboard from './pages/TrainerDashboard';

function App() {
  const path = window.location.pathname;
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (path === '/' || path === '/landing') {
    return <LandingPage />;
  }

  if (path === '/login' || path === '/signup') {
    return <LoginPage />;
  }

  if (path === '/member/dashboard' && token && role === 'member') {
    return <MemberDashboard />;
  }

  if (path === '/trainer/dashboard' && token && role === 'trainer') {
    return <TrainerDashboard />;
  }

  return <LandingPage />;
}

export default App;
