import firebase from 'firebase/app';
import 'firebase/messaging';
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.requestPermission()
    .then(() => messaging.getToken())
    .then((token) => {
        console.log('Token received:', token);
        // ارسال توکن به سرور برای ذخیره
        // استفاده از API برای ذخیره توکن در پایگاه داده
    })
    .catch((err) => {
        console.error('Error getting permission or token:', err);
    });

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const createGroupForm = document.getElementById('createGroupForm');
    const sendMessageButton = document.getElementById('sendMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // ارسال داده‌های فرم ورود به سرور
            const phoneNumber = document.getElementById('phoneNumber').value;
            const password = document.getElementById('password').value;
            // ارسال درخواست AJAX
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // ارسال داده‌های فرم ثبت‌نام به سرور
            const phoneNumber = document.getElementById('phoneNumber').value;
            const password = document.getElementById('password').value;
            // ارسال درخواست AJAX
        });
    }

    if (createGroupForm) {
        createGroupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // ارسال داده‌های فرم ایجاد گروه به سرور
            const groupName = document.getElementById('groupName').value;
            // ارسال درخواست AJAX
        });
    }

    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', () => {
            // ارسال پیام به سرور
            const messageInput = document.getElementById('messageInput').value;
            // ارسال درخواست AJAX
        });
    }
});