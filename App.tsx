
import React, { useState, useEffect } from 'react';
import { View, User } from './types';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        mapSupabaseUserToKodaUser(session.user);
        setCurrentView(View.DASHBOARD);
      }
      setLoading(false);
    });

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        mapSupabaseUserToKodaUser(session.user);
        setCurrentView(View.DASHBOARD);
      } else {
        setUser(null);
        setCurrentView(View.LANDING);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const mapSupabaseUserToKodaUser = (sbUser: any) => {
    const newUser: User = {
      username: sbUser.user_metadata?.username || sbUser.email?.split('@')[0] || 'Usuario',
      fullName: sbUser.user_metadata?.full_name || sbUser.user_metadata?.fullName || 'Usuario Koda',
      email: sbUser.email || '',
      phoneNumber: sbUser.user_metadata?.phone_number || sbUser.user_metadata?.phoneNumber || '',
      notifications: !!sbUser.user_metadata?.notifications,
      isLoggedIn: true
    };
    setUser(newUser);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-500 font-medium animate-pulse">Cargando Koda Engine...</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case View.LANDING:
        return <Landing onGetStarted={() => setCurrentView(View.REGISTER)} />;
      case View.LOGIN:
        return <AuthForm type="login" onSuccess={() => {}} onToggle={() => setCurrentView(View.REGISTER)} />;
      case View.REGISTER:
        return <AuthForm type="register" onSuccess={() => {}} onToggle={() => setCurrentView(View.LOGIN)} />;
      case View.DASHBOARD:
        return user ? <Dashboard user={user} /> : <Landing onGetStarted={() => setCurrentView(View.REGISTER)} />;
      default:
        return <Landing onGetStarted={() => setCurrentView(View.REGISTER)} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar 
        currentView={currentView} 
        user={user} 
        onNavigate={setCurrentView} 
        onLogout={handleLogout} 
      />
      <main className="flex-grow">
        {renderView()}
      </main>
      <footer className="py-8 px-6 border-t border-zinc-800 text-center text-zinc-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Koda Engine. Creado para artistas de Pixel Art.</p>
      </footer>
    </div>
  );
};

export default App;
