import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../LoginCard/LoginCard';

function LoginPage({ theme, setToken }) {
    const navigate = useNavigate();

    const [emailInfo, setEmailInfo] = useState({
        value: '',
        feedback: 'Email is required'
    });

    const [passwordInfo, setPasswordInfo] = useState({
        value: '',
        feedback: 'Password is required'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailValid = emailInfo.value.includes('@');
        const passwordValid = passwordInfo.value.length >= 6;

        setEmailInfo(prev => ({
            ...prev,
            isValid: emailValid,
            feedback: emailValid ? '' : 'Invalid email'
        }));

        setPasswordInfo(prev => ({
            ...prev,
            isValid: passwordValid,
            feedback: passwordValid ? '' : 'Password must be at least 6 characters'
        }));

        if (!emailValid || !passwordValid) return;

        try {
            const res = await fetch('http://localhost:9090/api/tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: emailInfo.value,
                    password: passwordInfo.value
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setPasswordInfo(prev => ({
                    ...prev,
                    isValid: false,
                    feedback: data.error || 'Login failed'
                }));
                return;
            }

            localStorage.setItem('token', data.token);
            setToken(data.token); //Update token in App.js
            navigate('/mail?folder=inbox'); //todo check path
        } catch (error) {
            console.error('Login error:', error);
            setPasswordInfo(prev => ({
                ...prev,
                isValid: false,
                feedback: 'Server error'
            }));
        }
    };

    return (
        <LoginCard
            theme={theme}
            onSubmit={handleSubmit}
            emailInfo={{
                ...emailInfo,
                onChange: (value) => {
                    const isValid = value.includes('@');
                    setEmailInfo({
                        value,
                        isValid,
                        feedback: isValid ? '' : 'Invalid email'
                    });
                }
            }}
            passwordInfo={{
                ...passwordInfo,
                onChange: (value) => {
                    const isValid = value.length >= 6;
                    setPasswordInfo({
                        value,
                        isValid,
                        feedback: isValid ? '' : 'Password must be at least 6 characters'
                    });
                }
            }}
        />
    );
}

export default LoginPage;