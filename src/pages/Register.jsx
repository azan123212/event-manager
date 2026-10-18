import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../features/auth/authSlice';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) navigate('/events', { replace: true });
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      dispatch(register({ name: form.name, email: form.email, password: form.password }));
    }
  };

  const field = (name, type, placeholder) => (
    <div>
      <input name={name} type={type} placeholder={placeholder} value={form[name]} onChange={handleChange} style={{ width: '100%' }} />
      {errors[name] && <small style={{ color: 'crimson' }}>{errors[name]}</small>}
    </div>
  );

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} noValidate style={{ display: 'grid', gap: '0.75rem' }}>
        {field('name', 'text', 'Name')}
        {field('email', 'email', 'Email')}
        {field('password', 'password', 'Password')}
        {field('confirm', 'password', 'Confirm password')}
        {error && <p style={{ color: 'crimson', margin: 0 }}>{error}</p>}
        <button type="submit">Create account</button>
      </form>
      <p>Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
}