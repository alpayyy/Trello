import * as Yup from 'yup';

const validationSchema = Yup.object({
    username: Yup.string()
        .min(4, 'Kullanıcı adı en az 4 karakter olmalıdır')
        .required('Kullanıcı adı gerekli'),
    password: Yup.string()
        .required('Şifre gerekli'),
});

export default validationSchema;
