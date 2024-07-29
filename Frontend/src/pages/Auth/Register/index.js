import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert, Slide } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../../store/AuthSlice/authSlice";
import registerSchema from '../Register/validations';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const TransitionUp = (props) => {
        return <Slide {...props} direction="down" />;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registerSchema,
        onSubmit: async (values, { resetForm }) => {
            const { confirmPassword, ...userValues } = values;
            const result = await dispatch(registerUser(userValues));
            if (registerUser.fulfilled.match(result)) {
                setSnackbarMessage('Başarıyla kayıt olundu. Giriş sayfasına yönlendiriliyorsunuz!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                resetForm();
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setSnackbarMessage(error || 'Kayıt başarısız oldu. Lütfen bilgilerinizi kontrol edin.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography variant="h4" gutterBottom>
                    Kayıt Ol
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Ad"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="surname"
                        name="surname"
                        label="Soyad"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.surname && Boolean(formik.errors.surname)}
                        helperText={formik.touched.surname && formik.errors.surname}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Kullanıcı Adı"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="E-posta"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Parola"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Parola Tekrarı"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        margin="normal"
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: '16px' }} disabled={loading}>
                        {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
                    </Button>
                </form>
                <Typography variant="body2" style={{ marginTop: '16px' }}>
                    Zaten bir hesabınız var mı?{' '}
                    <Link to="/login">
                        Giriş yap
                    </Link>
                </Typography>
            </Box>

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
        </Container>
    );
};

export default Register;
