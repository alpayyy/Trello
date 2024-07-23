import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Ad en az 2 karakter olmalıdır')
        .required('Ad gerekli'),
    surname: Yup.string()
        .min(2, 'Soyad en az 2 karakter olmalıdır')
        .required('Soyad gerekli'),
    userName: Yup.string()
        .min(4, 'Kullanıcı adı en az 4 karakter olmalıdır')
        .required('Kullanıcı adı gerekli'),
    email: Yup.string()
        .email('Geçerli bir e-posta adresi girin')
        .required('E-posta gerekli'),
    password: Yup.string()
        .min(8, 'Parola en az 8 karakter olmalıdır')
        .required('Parola gerekli'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Parolalar eşleşmiyor')
        .required('Parola tekrarı gerekli'),
});

export default validationSchema;
