class AuthManager {
    constructor() {
        this.signupForm = document.querySelector('#signupForm');
        this.loginForm = document.querySelector('#loginForm');

        // if (this.signupForm) this.signupForm.setAttribute('novalidate', '');
        // if (this.loginForm) this.loginForm.setAttribute('novalidate', '');

        this.init();
    }

    init() {
    if (this.signupForm) {
        this.signupForm.addEventListener('submit', (e) => this.handleSignup(e));
    }

    if (this.loginForm) {
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));

        const pendingEmail = sessionStorage.getItem('pendingEmail');
        if (pendingEmail) {
            document.getElementById('email').value = pendingEmail;
            sessionStorage.removeItem('pendingEmail');
        } else {
            
           document.getElementById('email').value = "";
            if(document.getElementById('password')) {
                document.getElementById('password').value = "";
            }
        }
    }
}

    getFieldError(fieldId, value, allValues = {}) {
        const val = value.trim();

        switch (fieldId) {
            case 'username':
                if (val.length === 0) return "Full Name is required.";
                if (val.length < 3) return "Name should be at least 3 letters.";
                if (/[0-9]/.test(val)) return "Name should not contain numbers.";
                return "";

            case 'email':
                if (val.length === 0) return "Email address is required.";
                if (!val.includes('@')) return "Missing '@' symbol (e.g., name@gmail.com).";
                const parts = val.split('@');
                if (parts[1] === "" || !parts[1].includes('.')) {
                    return "Include a domain after '@' (e.g., gmail.com).";
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(val) ? "" : "Invalid format. Example: name@example.com";

            case 'password':
                if (val.length === 0) return "Password is required.";
                if (val.length < 8) return "Password must be at least 8 characters.";
                if (!/[A-Z]/.test(val)) return "Include at least one uppercase letter (A-Z).";
                if (!/[a-z]/.test(val)) return "Include at least one lowercase letter (a-z).";
                if (!/[0-9]/.test(val)) return "Include at least one number (0-9).";
                if (!/[@$!%*?&]/.test(val)) return "Include at least one special character (@$!%).";
                return "";

            case 'confirmPassword':
                if (val.length === 0) return "Please confirm your password.";
                return val === allValues.password?.trim()
                    ? ""
                    : "Passwords do not match!";

            default:
                return "";
        }
    }

    handleSignup(e) {
        e.preventDefault();
        let isFormValid = true;

        const fields = ['username', 'email', 'password', 'confirmPassword'];
        const values = {};

        fields.forEach(id => values[id] = document.getElementById(id).value);

        fields.forEach(fieldId => {
            const errorElement = document.getElementById(
                fieldId === 'confirmPassword' ? 'confirm-error' : `${fieldId}-error`
            );
            const inputElement = document.getElementById(fieldId);
            const errorMsg = this.getFieldError(fieldId, values[fieldId], values);

            if (errorMsg) {
                errorElement.textContent = errorMsg;
                inputElement.classList.add('is-invalid');
                isFormValid = false;
            } else {
                errorElement.textContent = "";
                inputElement.classList.remove('is-invalid');
            }
        });

        if (isFormValid) {
            Object.keys(values).forEach(
                key => values[key] = values[key].trim()
            );

            localStorage.setItem('userAccount', JSON.stringify(values));

            sessionStorage.setItem('pendingEmail', values.email);

            this.transitionPage('login.html');
        } else {
            this.shakeCard('.card');
        }
    }

    handleLogin(e) {
        e.preventDefault();
        let isFormValid = true;

        const fields = ['email', 'password'];
        const values = {};

        fields.forEach(id => values[id] = document.getElementById(id).value);

        fields.forEach(fieldId => {
            const errorElement = document.getElementById(`${fieldId}-error`);
            const inputElement = document.getElementById(fieldId);
            const errorMsg = this.getFieldError(fieldId, values[fieldId], values);

            if (errorMsg) {
                errorElement.textContent = errorMsg;
                inputElement.classList.add('is-invalid');
                isFormValid = false;
            } else {
                errorElement.textContent = "";
                inputElement.classList.remove('is-invalid');
            }
        });

        if (isFormValid) {
            const storedUser = localStorage.getItem('userAccount')
                ? JSON.parse(localStorage.getItem('userAccount'))
                : null;

            if (
                storedUser &&
                storedUser.email === values.email &&
                storedUser.password === values.password
            ) {
                this.transitionPage('home.html');
            } else {
                const pwError = document.getElementById('password-error');
                const pwInput = document.getElementById('password');
                pwError.textContent = "Invalid email or password.";
                pwInput.classList.add('is-invalid');
                this.shakeCard('.card');
            }
        } else {
            this.shakeCard('.card');
        }
    }

    shakeCard(selector) {
        const card = document.querySelector(selector);
        if (card) {
            card.classList.remove('animate-shake');
            void card.offsetWidth;
            card.classList.add('animate-shake');
        }
    }

    transitionPage(target) {
        document.body.style.opacity = '0';
        document.body.style.transition = '0.5s';
        setTimeout(() => {
            window.location.href = target;
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => new AuthManager());
