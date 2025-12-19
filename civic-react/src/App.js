import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import ReportIssue from './pages/ReportIssue';
import ViewIssues from './pages/ViewIssues';
import AdminViewIssues from './pages/AdminViewIssues';
import ManageIssues from './pages/ManageIssues';
import Contact from './pages/Contact';
import Login from './components/Login';

import './App.css';

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          {user?.role === 'admin' ? <Navigate to="/admin/issues" replace /> : <Home />}
        </ProtectedRoute>
      } />
            <Route path="/about" element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } />
            <Route path="/gallery" element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            } />
            <Route path="/report" element={
              <ProtectedRoute>
                <ReportIssue />
              </ProtectedRoute>
            } />
            <Route path="/issues" element={
              <ProtectedRoute>
                <ViewIssues />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            } />
            <Route path="/admin/issues" element={
              <ProtectedRoute adminOnly={true}>
                <AdminViewIssues />
              </ProtectedRoute>
            } />
            <Route path="/admin/manage" element={
              <ProtectedRoute adminOnly={true}>
                <ManageIssues />
              </ProtectedRoute>
            } />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;