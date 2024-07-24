import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Search, SearchIconWrapper, StyledInputBase } from '../Navbar/style';
import { useSelector } from 'react-redux';

export default function PrimarySearchAppBar() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='secondary' sx={{ paddingInline: 5 }} position="sticky">
        <Toolbar>
          <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TASKFLOW
            </Typography>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ mr: 5 }}>
            {!isAuthenticated ? (
              <>
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button color="inherit">Login</Button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button color="inherit">Register</Button>
                </Link>
              </>
            ) : null}
          </Box>
          <Box sx={{ display: { md: 'flex', } }}>
            {isAuthenticated ? (
              <Tooltip title="Profile">
                <IconButton
                  size="large"
                  edge="end"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <Link to={"/profile"} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <AccountCircle />
                  </Link>
                </IconButton>
              </Tooltip>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
