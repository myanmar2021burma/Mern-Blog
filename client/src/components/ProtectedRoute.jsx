import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../store/authStore';

// Login မဝင်ရသေးရင် /login ကို ပို့မယ်
export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
