'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Theme from '@/app/lib/Theme';
import Logo_Black from '../../public/Logo_Black.png';
import Image from 'next/image';
import Link from 'next/link';
import LogInOutButton from '@/app/lib/Maps/LogInOutButton';

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" theme={Theme}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2, mr: 1, flexGrow: 1 }}>
                        <Link href="/">
                            <Image src={Logo_Black} alt="Logo" style={{ 'height': '100px', 'width': '100px' }} />
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem
                                key="info"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block' }}
                                style={{ 'fontSize': '1rem' }}
                            >
                                <Link href={"/about"} style={{ textDecoration: 'none' }}>
                                    About us
                                </Link>
                            </MenuItem>
                            {/* <MenuItem
                                key="info"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: 'block' }}
                                style={{ 'fontSize': '1rem' }}
                            >
                                <Link href={"/shops"} style={{ textDecoration: 'none' }}>
                                    合作店家
                                </Link>
                            </MenuItem> */}
                        </Menu>
                    </Box>
                    <Box sx={{
                        display: { xs: 'flex', md: 'none' }, mr: 1, flexGrow: 1
                    }}>
                        <Link href="/">
                            <Image src={Logo_Black} alt="Logo" style={{ 'height': '100px', 'width': '100px' }} />
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key="info"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            style={{ 'fontSize': '1rem' }}
                            href="/about"
                        >
                            About us
                        </Button>
                        {/* <Button
                            key="info"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            style={{ 'fontSize': '1rem' }}
                            href="/shops"
                        >
                            Cooperation restaurants
                        </Button> */}

                    </Box>
                    <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row' }}>
                        <LogInOutButton />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default NavBar;
