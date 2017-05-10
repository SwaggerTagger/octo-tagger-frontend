<template>
    <video-dialog :title="title" :buttons="loginButtons">
        <login-component />
    </video-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import VideoDialog from './VideoDialog'
import LoginComponent from './LoginComponent'


export default {
    name: 'video-login-component',
    components: { VideoDialog, LoginComponent },
    data: () => ({
        title: 'Login',
        loginButtons: [
            {
                text: 'register',
                to: '/register',
            },
            {
                text: 'cancel',
                to: '/',
            },
        ]
    }),
}
</script>