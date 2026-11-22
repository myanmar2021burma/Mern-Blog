import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Dashboard from './pages/Dashboard';
import Authors from './pages/Authors';
import AuthorPosts from './pages/AuthorPosts';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:id" element={<AuthorPosts />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
