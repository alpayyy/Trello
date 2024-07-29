import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../../store/AuthSlice/authSlice';
import { ProfileContainer, ProfilePaper } from '../style';

const EditProfile = () => {
    const { user, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        name: user.name,
        surname: user.surname,
        password: '',
    });

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const TransitionUp = (props) => {
        return <Slide {...props} direction="down" />;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };

    const handleConfirmUpdate = async () => {
        const result = await dispatch(updateUser({ ...formData, id: user.id }));
        setConfirmOpen(false);
        if (updateUser.fulfilled.match(result)) {
            setSnackbarMessage('Bilgiler başarıyla güncellendi!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/profile');
            }, 3000);
        } else {
            setSnackbarMessage(error || 'Bilgiler güncellenemedi. Lütfen tekrar deneyin.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        if (error) {
            setSnackbarMessage(error || 'Bilgiler güncellenemedi. Lütfen tekrar deneyin.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    }, [error]);

    return (
        <ProfileContainer>
            <Typography variant="h4">Bilgileri Güncelle</Typography>
            <ProfilePaper elevation={3}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Kullanıcı Adı"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="E-posta"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Adı"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Soyadı"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Şifre"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Güncelle
                    </Button>
                </form>
            </ProfilePaper>

            <Dialog
                open={confirmOpen}
                onClose={handleConfirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Bilgileri güncellemek istediğinize emin misiniz?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bu işlem kullanıcı profil bilgilerinizi güncelleyecektir. Devam etmek istediğinizden emin misiniz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="primary">
                        Hayır
                    </Button>
                    <Button onClick={handleConfirmUpdate} color="primary" autoFocus>
                        Evet
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                TransitionComponent={TransitionUp}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ProfileContainer>
    );
};

export default EditProfile;
