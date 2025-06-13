import UserInformation from '../UserInformation/UserInformation';
import "./LoginCard.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginCard({ theme, onSubmit, emailInfo, passwordInfo }) {
    const [step, setStep] = useState(1);

    const handleNext = (e) => {
        e.preventDefault();
        if (!emailInfo.isValid) return;
        setStep(2);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center full-height-center" data-bs-theme={theme}>
            <div className="login-card col-10 d-flex" data-bs-theme={theme}>
                {/* Left side: text */}
                <div className="login-left col-6 d-flex flex-column justify-content-center align-items-start">
                    <h3>Sign in</h3>
                    <p>with your Google Account. This account will be available to other Google apps in the browser.</p>
                </div>

                {/* Right side: login form */}
                <div className="login-right col-6">
                    {step === 1 ? (
                        <form onSubmit={handleNext}>
                        <UserInformation
                            requiredInfo="Email"
                            theme={theme}
                            type="email"
                            isValid={emailInfo.isValid}
                            feedback={emailInfo.feedback}
                            value={emailInfo.value}
                            onChange={emailInfo.onChange} 
                        />
                        <div className="d-flex gap-2 mt-3">
                            
                            {/*<Link to="/register" className="btn btn-secondary">
                                Create account
                            </Link>*/}

                            <Link to="/register" className="btn btn-light flex-grow-1 button-left-margin-white">
                            Create account
                            </Link>
                            <button type="submit" className="btn btn-primary flex-grow-1 button-left-margin-blue ">
                                Next
                            </button>
                        </div>
                    </form>
                    ) : (
                        <form onSubmit={onSubmit}>
                            <UserInformation.Password
                                requiredInfo="Password"
                                theme={theme}
                                isValid={passwordInfo.isValid}
                                feedback={passwordInfo.feedback}
                                value={passwordInfo.value}
                                onChange={passwordInfo.onChange}
                            />
                            <div className="d-flex justify-content-end mt-3">
                                <button type="submit" className="btn btn-primary button button-left-margin-blue " style={{width: "50%"}}>
                                    Login
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginCard;