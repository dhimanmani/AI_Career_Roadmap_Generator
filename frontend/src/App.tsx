import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';

// Import Pages
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Dashboard } from './pages/Dashboard';
import { CareerProfile } from './pages/CareerProfile';
import { GoalSelection } from './pages/GoalSelection';
import { SkillInventory } from './pages/SkillInventory';
import { GapAnalysis } from './pages/GapAnalysis';
import { RoadmapBuilder } from './pages/RoadmapBuilder';
import { ProgressTracking } from './pages/ProgressTracking';
import { ProjectRecommendations } from './pages/ProjectRecommendations';
import { MentorReview } from './pages/MentorReview';
import { Notifications } from './pages/Notifications';
import { ReportsAnalytics } from './pages/ReportsAnalytics';
import { AdminDashboard } from './pages/AdminDashboard';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Dashboard shell routing */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<CareerProfile />} />
              <Route path="/goals" element={<GoalSelection />} />
              <Route path="/skills" element={<SkillInventory />} />
              <Route path="/gap-analysis" element={<GapAnalysis />} />
              <Route path="/roadmap" element={<RoadmapBuilder />} />
              <Route path="/progress" element={<ProgressTracking />} />
              <Route path="/projects" element={<ProjectRecommendations />} />
              <Route path="/mentor" element={<MentorReview />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/reports" element={<ReportsAnalytics />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Fallback route */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
