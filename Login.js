document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');
    const loginForm = document.querySelector('.login form');
    const registerForm = document.querySelector('.register form');
    const body = document.body; 

    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
    });

    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
    });

    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
    });

    function showAlert(message, type = 'info', callback) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('custom-alert');
        alertDiv.classList.add(type);
        alertDiv.innerHTML = `
            <span class="alert-message">${message}</span>
            <span class="alert-close-btn">&times;</span>
        `;
        body.appendChild(alertDiv);

        const closeButton = alertDiv.querySelector('.alert-close-btn');
        closeButton.addEventListener('click', () => {
            alertDiv.remove();
            if (callback) {
                callback();
            }
        });

        setTimeout(() => {
            if (alertDiv && alertDiv.parentNode) {
                alertDiv.remove();
                if (callback) {
                    callback();
                }
            }
        }, 1500); 
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const usernameInput = this.querySelector('#username');
        const passwordInput = this.querySelector('#password');

        const storedAccounts = localStorage.getItem('accounts');
        const accounts = storedAccounts ? JSON.parse(storedAccounts) : [];

        const user = accounts.find(acc => acc.username === usernameInput.value || acc.email === usernameInput.value);

        if (user && user.password === passwordInput.value) {
            showAlert('Login successful!', 'success', () => {
                window.location.href = "Website.html";
            }); 
        } else {
            showAlert('Invalid username/email or password.', 'error');
        }
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const usernameInput = this.querySelector('#username');
        const emailInput = this.querySelector('#email');
        const passwordInput = this.querySelector('#password');

        const storedAccounts = localStorage.getItem('accounts');
        const accounts = storedAccounts ? JSON.parse(storedAccounts) : [];

        if (accounts.some(acc => acc.username === usernameInput.value)) {
            showAlert('Username already exists.', 'error');
            return;
        }
        if (accounts.some(acc => acc.email === emailInput.value)) {
            showAlert('Email already exists.', 'error');
            return;
        }

        const newAccount = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        accounts.push(newAccount);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        showAlert('Registration successful! You can now log in.', 'success', () => {
            wrapper.classList.remove('active'); 
        });
    });
});