<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Signup</title>
    <style>
        :root {
            --primary-color: #d97706;
            --primary-hover: #b45309;
            --secondary-color: #92400e;
            --accent-color: #f59e0b;
            --light-accent: #fef3c7;
            --text-color: #1f2937;
            --text-light: #6b7280;
            --border-color: #e5e7eb;
            --background-color: #fffaf5;
            --card-background: #ffffff;
            --sidebar-width: 250px;
            --header-height: 70px;
            --success-color: #10b981;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --info-color: #3b82f6;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: var(--background-color);
        }

        .container {
            background-color: var(--card-background);
            border-radius: 10px;
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
            width: 100%;
            max-width: 400px;
            min-height: 700px;
            border: 1px solid var(--border-color);
        }

        .form-container {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
        }

        .login-container {
            left: 0;
            width: 100%;
            z-index: 2;
        }

        .container.right-panel-active .login-container {
            transform: translateX(-100%);
            opacity: 0;
        }

        .signup-container {
            left: 0;
            width: 100%;
            opacity: 0;
            z-index: 1;
            transform: translateX(100%);
        }

        .container.right-panel-active .signup-container {
            transform: translateX(0);
            opacity: 1;
            z-index: 5;
        }

        .toggle-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 60px;
            display: flex;
            z-index: 10;
            border-bottom: 1px solid var(--border-color);
            background-color: var(--card-background);
        }

        .toggle-btn {
            flex: 1;
            background: transparent;
            border: none;
            padding: 20px 0;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            color: var(--text-light);
            transition: all 0.3s ease;
        }

        .toggle-btn.active {
            color: var(--primary-color);
            border-bottom: 2px solid var(--primary-color);
        }

        form {
            background-color: var(--card-background);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 50px;
            height: 100%;
            text-align: center;
            padding-top: 60px;
        }

        h1 {
            margin-bottom: 30px;
            color: var(--text-color);
        }

        .form-group {
            position: relative;
            width: 100%;
            margin-bottom: 20px;
        }

        input {
            background-color: var(--background-color);
            border: 1px solid var(--border-color);
            padding: 15px;
            width: 100%;
            border-radius: 5px;
            font-size: 14px;
            outline: none;
            transition: all 0.3s ease;
            color: var(--text-color);
        }

        input:focus {
            background-color: var(--card-background);
            box-shadow: 0 0 0 2px var(--accent-color);
            border-color: var(--accent-color);
        }

        .error-message {
            color: var(--danger-color);
            font-size: 12px;
            margin-top: 5px;
            text-align: left;
            display: none;
        }

        button {
            border-radius: 5px;
            border: 1px solid var(--primary-color);
            background-color: var(--primary-color);
            color: white;
            font-size: 14px;
            font-weight: bold;
            padding: 12px 45px;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            cursor: pointer;
            margin-top: 10px;
        }

        button:active {
            transform: scale(0.95);
        }

        button:focus {
            outline: none;
        }

        button:hover {
            background-color: var(--primary-hover);
            border-color: var(--primary-hover);
        }

        .social-container {
            margin: 20px 0;
        }

        .social-container a {
            border: 1px solid var(--border-color);
            border-radius: 50%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 0 5px;
            height: 40px;
            width: 40px;
            text-decoration: none;
            color: var(--text-color);
            transition: all 0.3s ease;
        }

        .social-container a:hover {
            background-color: var(--light-accent);
            border-color: var(--accent-color);
            color: var(--primary-color);
        }

        span {
            color: var(--text-light);
            margin: 10px 0;
        }

        a {
            color: var(--accent-color);
            text-decoration: none;
            margin: 10px 0;
            transition: all 0.3s ease;
        }

        a:hover {
            color: var(--primary-color);
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container" id="container">
        <div class="toggle-container">
            <button class="toggle-btn active" id="loginToggle">Login</button>
            <button class="toggle-btn" id="signupToggle">Sign Up</button>
        </div>
        <div class="form-container login-container">
            <form method="post" action="{{ route('login') }}">
                @csrf
                @if(session('mess'))
                    <div class="alert alert-danger">{{ session('mess')}}</div>
                @endif
                <h1>Login</h1>
                <div class="social-container">
                    <a href="#" class="social"><i>f</i></a>
                    <a href="#" class="social"><i>g</i></a>
                    <a href="#" class="social"><i>in</i></a>
                </div>
                <span>or use your account</span>
                <div class="form-group">
                    <input type="email" id="loginEmail" name="email" placeholder="Email" required />
                    <div class="error-message" id="loginEmailError">Please enter a valid email address</div>
                </div>
                <div class="form-group">
                    <input type="password" id="loginPassword" name="password" placeholder="Password" required />
                    <div class="error-message" id="loginPasswordError">Password must be at least 6 characters</div>
                </div>
                <a href="#">Forgot your password?</a>
                <button type="submit">Login</button>
            </form>
        </div>
        <div class="form-container signup-container">
            <form  method="POST" action="{{ route('signup') }}">
                @csrf
                
                <h1>Create Account</h1>
                <div class="social-container">
                    <a href="#" class="social"><i>f</i></a>
                    <a href="#" class="social"><i>g</i></a>
                    <a href="#" class="social"><i>in</i></a>
                </div>
                <span>or use your email for registration</span>
                <div class="form-group">
                    <input type="text" name="name" id="signupName" placeholder="Name" required />
                    <div class="error-message" id="signupNameError">Please enter your name</div>
                </div>
                <div class="form-group">
                    <input type="email" id="signupEmail" name="email" placeholder="Email" required />
                    <div class="error-message" id="signupEmailError">Please enter a valid email address</div>
                </div>
                <div class="form-group">
                    <input type="password" id="signupPassword" name="password" placeholder="Password" required />
                    <div class="error-message" id="signupPasswordError">Password must be at least 6 characters</div>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('container');
            const loginToggle = document.getElementById('loginToggle');
            const signupToggle = document.getElementById('signupToggle');
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');

            // Toggle between login and signup forms
            loginToggle.addEventListener('click', () => {
                container.classList.remove('right-panel-active');
                loginToggle.classList.add('active');
                signupToggle.classList.remove('active');
            });

            signupToggle.addEventListener('click', () => {
                container.classList.add('right-panel-active');
                loginToggle.classList.remove('active');
                signupToggle.classList.add('active');
            });

            // Form validation for login
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail');
                const password = document.getElementById('loginPassword');
                const emailError = document.getElementById('loginEmailError');
                const passwordError = document.getElementById('loginPasswordError');
                
                let isValid = true;
                
                // Reset error messages
                emailError.style.display = 'none';
                passwordError.style.display = 'none';
                
                // Validate email
                if (!validateEmail(email.value)) {
                    emailError.style.display = 'block';
                    isValid = false;
                }
                
                // Validate password
                if (password.value.length < 6) {
                    passwordError.style.display = 'block';
                    isValid = false;
                }
                
                if (isValid) {
                    // Here you would typically send the data to your server
                    alert('Login successful! (This is a demo)');
                    loginForm.reset();
                }
            });

            // Form validation for signup
            
            // Email validation helper function
            function validateEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
        });
    </script>
</body>
</html>
