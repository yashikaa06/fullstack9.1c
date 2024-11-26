import React, { useState } from 'react';
import { Form, Input, Header } from 'semantic-ui-react';
import { auth, googleProvider } from './utils/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import './Login.css'; // Make sure to import the CSS

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onLogin();
        } catch (error) {
            alert(`Login failed: ${error.message}`);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            onLogin();
        } catch (error) {
            alert(`Google login failed: ${error.message}`);
        }
    };

    return (
        <div className="login-container">
            <Header as="h2">Welcome Back!</Header>
            <Form>
                <Form.Field>
                    <label>Email</label>
                    <Input
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Field>
                <button className="login-button" onClick={handleEmailLogin}>
                    Login
                </button>
                <button className="google-login-button" onClick={handleGoogleLogin}>
                    Login with Google
                </button>
            </Form>
            <a href="/signup" className="sign-up-link">
                Don't have an account? Sign Up
            </a>
        </div>
    );
};

export default Login;
