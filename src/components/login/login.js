import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.auth';

const SignIn = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h2>I already have an account</h2>
      <p>Sign in with your email and password</p>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          value={state.email}
          onChange={handleChange}
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
          required
        />
        <label htmlFor='password'>Password</label>
        <button type='submit'>Sign In</button>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      </form>
    </div>
  );
};

export default SignIn;
