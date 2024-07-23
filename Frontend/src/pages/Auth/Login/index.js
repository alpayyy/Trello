import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import validationSchema from '../Login/validations';
import { Link } from 'react-router-dom';

const Login = () => {
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

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
                        id="userName"
                        name="userName"
                        label="Kullanıcı Adı"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.userName && Boolean(formik.errors.userName)}
                        helperText={formik.touched.userName && formik.errors.userName}
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
                    >
                        Giriş Yap
                    </Button>
                </form>
                <Typography variant="body2" style={{ marginTop: '16px' }}>
                    Hesabınız yok mu?{' '}

                    <Link to="/register" >
                        Kayıt ol
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
