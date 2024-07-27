import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../../store/AuthSlice/authSlice';
import { ProfileContainer, ProfilePaper } from '../style';

const EditProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        name: user.name,
        surname: user.surname,
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({ ...formData, id: user.id }));
        navigate('/profile');
    };

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
        </ProfileContainer>
    );
};

export default EditProfile;
