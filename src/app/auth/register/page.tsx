"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginUserMutation } from '@/api/apiSlice';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [createUser] = useLoginUserMutation();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [message, setMessage] = useState<string>('');

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createUser(formData).unwrap();
      console.log(response)
      setMessage('Please check your email to activate your account!');
      router.push("/auth/activate-user")
    } catch (err) {
      setMessage('Failed to create user',err);
    }
  };

  return (
    <div className="flex flex-col text-center items-center justify-center space-y-6">
      <h2>Create Your </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
