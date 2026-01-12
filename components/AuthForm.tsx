
import React, { useState } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthFormProps {
  type: 'login' | 'register';
  onSuccess: (userData: Partial<User>) => void;
  onToggle: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onToggle }) => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    notifications: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (type === 'register') {
        // Enviar datos a Supabase Auth
        // Nota: El email se guarda en auth.users y nuestro trigger lo copiará a profiles
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              username: formData.username,
              full_name: formData.fullName,
              phone_number: formData.phoneNumber,
              notifications: formData.notifications
            }
          }
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          if (data.session) {
            // Si el correo automático está desactivado, entra directo
            alert('¡Cuenta creada con éxito!');
          } else {
            // Si requiere confirmación de email
            alert('¡Registro exitoso! Por favor, revisa tu correo electrónico para confirmar tu cuenta. Si no confirmas, no podrás iniciar sesión.');
            onToggle();
          }
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (signInError) throw signInError;
      }
    } catch (err: any) {
      console.error("Auth error details:", err);
      let message = err.message;
      
      // Traducir errores críticos para el usuario
      if (message.includes('Database error saving new user')) {
        message = 'Error crítico en la base de datos de Supabase. Por favor, asegúrate de haber ejecutado el último script SQL (el que incluye la columna "email") en tu panel de control.';
      } else if (message === 'User already registered') {
        message = 'Este correo electrónico ya está en uso.';
      } else if (message === 'Invalid login credentials') {
        message = 'Credenciales inválidas. Verifica tu correo y contraseña.';
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {type === 'login' ? 'Bienvenido de nuevo' : 'Únete a Koda Engine'}
          </h2>
          <p className="text-zinc-500 text-sm">
            {type === 'login' 
              ? 'Accede a tus proyectos de Pixel Art' 
              : 'La herramienta definitiva para creadores 2D'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-sm leading-relaxed border-l-4 border-l-rose-500">
            <p className="font-bold mb-1">Hubo un problema:</p>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Username</label>
                  <input 
                    type="text" 
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white transition-all"
                    placeholder="PixelDev"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Nombre Completo</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white transition-all"
                    placeholder="Tu Nombre"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">WhatsApp / Teléfono</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white transition-all"
                  placeholder="+54 9 11 ..."
                />
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white transition-all"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Contraseña</label>
            <input 
              type="password" 
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-white transition-all"
              placeholder="Min. 6 caracteres"
            />
          </div>

          {type === 'register' && (
            <div className="flex items-center gap-3 py-2">
              <input 
                type="checkbox" 
                id="notifications"
                checked={formData.notifications}
                onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
              />
              <label htmlFor="notifications" className="text-xs text-zinc-500 cursor-pointer select-none">
                Deseo recibir actualizaciones sobre el desarrollo de Koda Engine Beta.
              </label>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 mt-4 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sincronizando...
              </>
            ) : (
              type === 'login' ? 'Iniciar Sesión' : 'Crear mi Espacio de Trabajo'
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-zinc-800">
          <p className="text-zinc-500 text-sm">
            {type === 'login' ? "¿Aún no tienes acceso?" : "¿Ya eres parte de Koda?"}
            <button 
              onClick={onToggle}
              className="ml-2 text-indigo-400 hover:text-indigo-300 font-bold"
            >
              {type === 'login' ? 'Registrarme' : 'Entrar'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
