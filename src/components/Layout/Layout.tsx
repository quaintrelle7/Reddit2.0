import React from 'react';
import Navbar from '../Navbar/Navbar';


export const Layout: React.FC = ({ children }) => {

    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};
