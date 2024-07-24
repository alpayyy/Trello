import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from "../../../store/AuthSlice/authSlice"; // Doğru dosya yolunu kullanın
import validationSchema from '../Login/validations';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
            dispatch(fetchUser(values));
            resetForm()
        },
    });

    // Giriş başarılı olduğunda ana sayfaya yönlendir
    React.useEffect(() => {
        if (isAuthenticated) {
            
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

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
                    {error && <Typography color="error" variant="body2" style={{ marginTop: '16px' }}>{error}</Typography>}
                </form>
                <Typography variant="body2" style={{ marginTop: '16px' }}>
                    Hesabınız yok mu?{' '}
                    <Link to="/register">
                        Kayıt ol
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
