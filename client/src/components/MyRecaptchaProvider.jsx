import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const MyReCaptchaProvider = ({ children }) => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LfZIdcqAAAAAE-uN01rjUBN2TrBpNr7r3EKEl_a">
            {children}
        </GoogleReCaptchaProvider>
    );
};

export default MyReCaptchaProvider;
