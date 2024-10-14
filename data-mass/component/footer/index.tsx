import React from 'react';
import { AppBar, Typography, Container } from '@mui/material';


const Footer = () => {
    return (
        <AppBar position="static" elevation={0}
        style={{marginTop: '20px', padding: '20px', backgroundColor: 'transparent'}}>
        <Container maxWidth="lg">
            
            <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} Magic Board
            </Typography>
        </Container>
        </AppBar>
    );
};

export default Footer;
