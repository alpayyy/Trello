import { styled, alpha } from '@mui/material/styles';
import { Container, Avatar, Paper, Typography } from '@mui/material';

export const ProfileContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: theme.spacing(1),
}));

export const ProfilePaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    width: '100%',
    maxWidth: '600px',
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
}));

export const ProfileInfoItem = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(1, 0),
}));
