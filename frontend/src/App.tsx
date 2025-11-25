import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HowItWorksPage from './pages/HowItWorksPage';
import MemberDashboard from './pages/MemberDashboard';
import MyPlansPage from './pages/MyPlansPage';
import MemberProfilePage from './pages/MemberProfilePage';
import TrainerDashboard from './pages/TrainerDashboard';
import UpdateMemberPage from './pages/UpdateMemberPage';
import MemberDetailsPage from './pages/MemberDetailsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* Member Protected Routes */}
            <Route
              path="/dashboard/member"
              element={
                <ProtectedRoute allowedRoles={['member']}>
                  <MemberDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-plans"
              element={
                <ProtectedRoute allowedRoles={['member']}>
                  <MyPlansPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['member']}>
                  <MemberProfilePage />
                </ProtectedRoute>
              }
            />
            
            {/* Trainer Protected Routes */}
            <Route
              path="/dashboard/trainer"
              element={
                <ProtectedRoute allowedRoles={['trainer']}>
                  <TrainerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-member/:memberId"
              element={
                <ProtectedRoute allowedRoles={['trainer']}>
                  <UpdateMemberPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/member-details/:memberId"
              element={
                <ProtectedRoute allowedRoles={['trainer']}>
                  <MemberDetailsPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
