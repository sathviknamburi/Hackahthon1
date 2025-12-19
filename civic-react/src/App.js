import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import ReportIssue from './pages/ReportIssue';
import ViewIssues from './pages/ViewIssues';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyIssues from './pages/MyIssues';
import AdminViewIssues from './pages/AdminViewIssues';
import AdminManageIssues from './pages/AdminManageIssues';

import './App.css';

const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
  const { user, token } = useAuth();
  
  if (!token) return <Navigate to="/login" />;
  if (adminOnly && user?.role !== 'ADMIN') return <Navigate to="/unauthorized" />;
  if (userOnly && user?.role !== 'USER') return <Navigate to="/admin/view-issues" />;
  
  return children;
};

const PublicRoute = ({ children }) => {
  const { token, user } = useAuth();
  if (token) {
    return user?.role === 'ADMIN' ? <Navigate to="/admin/view-issues" /> : <Navigate to="/home" />;
  }
  return children;
};

function AppContent() {
  const { user, token } = useAuth();
  
  return (
    <div className="App">
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/" element={
          token ? (
            user?.role === 'ADMIN' ? <Navigate to="/admin/view-issues" /> : <Navigate to="/home" />
          ) : <Navigate to="/login" />
        } />
        <Route path="/unauthorized" element={<div style={{padding: '20px', textAlign: 'center'}}><h2>Unauthorized Access</h2><p>You don't have permission to access this page.</p></div>} />
        <Route path="/my-issues" element={
          <ProtectedRoute userOnly>
            <MyIssues />
          </ProtectedRoute>
        } />
        <Route path="/admin/view-issues" element={
          <ProtectedRoute adminOnly>
            <AdminViewIssues />
          </ProtectedRoute>
        } />
        <Route path="/admin/manage-issues" element={
          <ProtectedRoute adminOnly>
            <AdminManageIssues />
          </ProtectedRoute>
        } />
        <Route path="/home" element={
          <ProtectedRoute userOnly>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/about" element={
          <ProtectedRoute userOnly>
            <About />
          </ProtectedRoute>
        } />
        <Route path="/gallery" element={
          <ProtectedRoute userOnly>
            <Gallery />
          </ProtectedRoute>
        } />
        <Route path="/report" element={
          <ProtectedRoute userOnly>
            <ReportIssue />
          </ProtectedRoute>
        } />
        <Route path="/issues" element={
          <ProtectedRoute userOnly>
            <ViewIssues />
          </ProtectedRoute>
        } />
        <Route path="/contact" element={
          <ProtectedRoute userOnly>
            <Contact />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;