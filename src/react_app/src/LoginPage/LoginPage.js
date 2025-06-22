import { useState } from 'react';
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

    const handleNext = () => {
        //basic mail template
        const emailValid = /^[A-Za-z0-9.]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(emailInfo.value);

        setEmailInfo(prev => ({
            ...prev,
            isValid: emailValid,
            feedback: emailValid ? '' : 'Invalid email'
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordValid = passwordInfo.value.length >= 6;

        setPasswordInfo(prev => ({
            ...prev,
            isValid: passwordValid,
            feedback: passwordValid ? '' : 'Password must be at least 6 characters'
        }));

        if (!passwordValid) return;

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
            navigate('/mail?folder=inbox');
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
            emailInfo={emailInfo}
            passwordInfo={passwordInfo}
            setEmailInfo={setEmailInfo}
            setPassInfo={setPasswordInfo}
            onNext={handleNext}
        />
    );
}

export default LoginPage;
