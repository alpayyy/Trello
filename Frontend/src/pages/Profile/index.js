import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProfileContainer, ProfileAvatar, ProfilePaper, ProfileInfoItem } from './style';
import { logout } from '../../store/AuthSlice/authSlice';

const Profile = () => {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };

    const handleConfirmLogout = () => {
        dispatch(logout());
        setConfirmOpen(false);
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

            <Dialog
                open={confirmOpen}
                onClose={handleConfirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Çıkış yapmak istediğinize emin misiniz?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Oturumunuzu kapatmak istediğinizden emin misiniz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="primary">
                        Hayır
                    </Button>
                    <Button onClick={handleConfirmLogout} color="primary" autoFocus>
                        Evet
                    </Button>
                </DialogActions>
            </Dialog>
        </ProfileContainer>
    );
};

export default Profile;
