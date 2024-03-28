import  { clearAllCookies } from '@/utils';
export default {
    403() {
        clearAllCookies();
        localStorage.clear();
        setTimeout(() => {
          location.href = `${import.meta.env.VITE_APP_Base}/login`;  
        },200)
    },
    402() {
        location.href = `${import.meta.env.VITE_APP_Base}/login?id=2`;
    },
    405() {
        location.href = `${import.meta.env.VITE_APP_Base}/login?id=2`;
    },
    401() {
        location.href = `${import.meta.env.VITE_APP_Base}/401`;
    },
    404() {
        location.href = `${import.meta.env.VITE_APP_Base}/404`;
    },
    500() {
        location.href = `${import.meta.env.VITE_APP_Base}/500`;
    }
};
