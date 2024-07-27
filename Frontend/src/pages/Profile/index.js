import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProfileContainer, ProfileAvatar, ProfilePaper, ProfileInfoItem } from './style';
import { logout } from '../../store/AuthSlice/authSlice';

const Profile = () => {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    if (loading) {
        return (
            <ProfileContainer>
                <Typography variant="h4">Loading...</Typography>
            </ProfileContainer>
        );
    }

    return (
        <ProfileContainer>
            <ProfileAvatar alt={user.userName} />
            <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
            <ProfilePaper elevation={3}>
                <ProfileInfoItem variant="h6">
                    Kullanıcı Adı: {user.username}
                </ProfileInfoItem>
                <ProfileInfoItem variant="h6">
                    E-posta: {user.email}
                </ProfileInfoItem>
                <ProfileInfoItem variant="h6">
                    Adı: {user.name}
                </ProfileInfoItem>
                <ProfileInfoItem variant="h6">
                    Soyadı: {user.surname}
                </ProfileInfoItem>
                <Button variant="contained" color="primary" onClick={handleLogout}>
                    Çıkış Yap
                </Button>
                <Button variant="contained" color="secondary" onClick={handleEditProfile} style={{ marginLeft: '10px' }}>
                    Bilgileri Güncelle
                </Button>
            </ProfilePaper>
        </ProfileContainer>
    );
};

export default Profile;
