import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { ProfileContainer, ProfileAvatar, ProfilePaper, ProfileInfoItem } from './style';

const Profile = () => {
    const {user} = useSelector((state) => state.auth);

    return (
        <ProfileContainer>
            <ProfileAvatar alt={user.userName} src="/static/images/avatar/1.jpg" />
            <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
            <ProfilePaper elevation={3}>
                <ProfileInfoItem variant="h6">
                    Kullanıcı Adı: {user.userName}
                </ProfileInfoItem>
                <ProfileInfoItem variant="h6">
                    E-posta: {user.email}
                </ProfileInfoItem>
                <ProfileInfoItem variant="h6">
                    Adı: {user.firstName}
                </ProfileInfoItem>
                <ProfileInfoItem variant="h6">
                    Soyadı: {user.lastName}
                </ProfileInfoItem>
            </ProfilePaper>
        </ProfileContainer>
    );
};

export default Profile;
