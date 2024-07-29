import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert, Slide } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from "../../../store/AuthSlice/authSlice"; // Doğru dosya yolunu kullanın
import validationSchema from '../Login/validations';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
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
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(fetchUser(values));
        },
    });

    useEffect(() => {
        if (isAuthenticated) {
            setSnackbarMessage('Başarıyla giriş yapıldı. Ana sayfaya yönlendiriliyorsunuz!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } else if (error) {
            setSnackbarMessage('Giriş başarısız oldu. Lütfen bilgilerinizi kontrol edin.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    }, [isAuthenticated, error, navigate]);

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4">
                    Giriş Yap
                </Typography>
                <form onSubmit={formik.handleSubmit}>
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
                    <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                        style={{ marginTop: '16px' }}
                        disabled={loading}
                    >
                        {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                    </Button>
                </form>
                <Typography variant="body2" style={{ marginTop: '16px' }}>
                    Hesabınız yok mu?{' '}
                    <Link to="/register">
                        Kayıt ol
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

export default Login;
