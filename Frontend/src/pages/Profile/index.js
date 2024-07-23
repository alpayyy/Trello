import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProfileContainer, ProfileAvatar, ProfilePaper, ProfileInfoItem } from './style';

const Profile = () => {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

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
                    Kullanıcı Adı: {user.userName}
                </ProfileInfoItem>
                <ProfileInfoItem variant="h6">
                    E-posta: {user.email}
                </ProfileInfoItem>
                <ProfileInfoItem variant="h6">
                    Adı: {user.firstName}
                </ProfileInfoItem>
                <ProfileInfoItem variant="h6">
                    Soyadı: {user.lastName}
                </ProfileInfoItem>
            </ProfilePaper>
        </ProfileContainer>
    );
};

export default Profile;
