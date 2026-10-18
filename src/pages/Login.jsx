import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../features/auth/authSlice';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, error } = useSelector((state) => state.auth);
  const redirectTo = location.state?.from || '/events';

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true });
  }, [user, navigate, redirectTo]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) dispatch(login(form));
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate style={{ display: 'grid', gap: '0.75rem' }}>
        <div>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ width: '100%' }} />
          {errors.email && <small style={{ color: 'crimson' }}>{errors.email}</small>}
        </div>
        <div>
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={{ width: '100%' }} />
          {errors.password && <small style={{ color: 'crimson' }}>{errors.password}</small>}
        </div>
        {error && <p style={{ color: 'crimson', margin: 0 }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  );
}