import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Authenticator({setAuthToken}) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = (event) => {
        setShowPassword(!showPassword);
    };

    const handleTokenSubmit = (event) => {
        event.preventDefault();
        setAuthToken(event.target.elements.token.value);
    };

    return (
        <div className="m-3">
            <form onSubmit={handleTokenSubmit} className="mb-4">
                <div className="input-group mb-3">
                    <button type="button" onClick={togglePasswordVisibility} className="btn btn-outline-secondary">
                        <FontAwesomeIcon icon={showPassword ? "fa-eye-slash" : "fa-eye"} size="2x" />
                    </button>
                    <input type={showPassword ? "text" : "password"} className="form-control" name="token" placeholder="Enter API Token" />
                    <button className="btn btn-outline-secondary" type="submit">Set Token</button>
                </div>
            </form>
        </div>
    )
}

export default Authenticator;