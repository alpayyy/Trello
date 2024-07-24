import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../../store/AuthSlice/authSlice"; // Doğru dosya yolunu kullanın
import registerSchema from '../Register/validations';
import { Link } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

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
        onSubmit: (values, {resetForm}) => {
            const { confirmPassword, ...userValues } = values; // confirmPassword'ü ayıklıyoruz
            dispatch(registerUser(userValues));
            resetForm()
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
                    {error && <Typography color="error" variant="body2" style={{ marginTop: '16px' }}>{error}</Typography>}
                </form>
                <Typography variant="body2" style={{ marginTop: '16px' }}>
                    Zaten bir hesabınız var mı?{' '}
                    <Link to="/login">
                        Giriş yap
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;
