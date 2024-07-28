import React, { useState, useEffect } from 'react';

const Popup = ({ message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 right-1 transform  px-4 py-2 rounded ">
            {message}
        </div>
    );
};

export default Popup;
