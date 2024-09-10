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