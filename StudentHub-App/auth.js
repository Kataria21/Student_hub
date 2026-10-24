
/* ========================================
   STUDENTHUB - SUPABASE AUTHENTICATION
======================================== */

const authClient = window.studentHubSupabase;


// Check that Supabase was loaded correctly
if (!authClient) {
    console.error(
        "Supabase is not initialized. Check supabase-config.js."
    );
}


// ========================================
// MESSAGE HELPER
// ========================================

function showMessage(id, message, type) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = message;
        element.className = "auth-message " + type;
    }
}


// ========================================
// VALIDATION HELPERS
// ========================================

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function isValidPassword(password) {
    return password.length >= 6 && /\d/.test(password);
}


// ========================================
// LOGIN / SIGNUP SWITCHING
// ========================================

const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");


if (showSignup) {
    showSignup.addEventListener("click", () => {
        loginBox.classList.add("hidden");
        signupBox.classList.remove("hidden");
    });
}


if (showLogin) {
    showLogin.addEventListener("click", () => {
        signupBox.classList.add("hidden");
        loginBox.classList.remove("hidden");
    });
}


// ========================================
// PASSWORD VISIBILITY
// ========================================

function setupPasswordToggle(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);

    if (!input || !button) {
        return;
    }

    button.addEventListener("click", () => {
        const showPassword = input.type === "password";

        input.type = showPassword ? "text" : "password";
        button.textContent = showPassword ? "🙈" : "👁️";
    });
}


setupPasswordToggle(
    "loginPassword",
    "toggleLoginPassword"
);

setupPasswordToggle(
    "signupPassword",
    "toggleSignupPassword"
);

setupPasswordToggle(
    "signupConfirm",
    "toggleSignupConfirm"
);


// ========================================
// SIGN UP
// ========================================

const signupBtn = document.getElementById("signupBtn");


if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
        if (!authClient) {
            showMessage(
                "signupMessage",
                "Authentication is not configured. Please check the Supabase setup.",
                "auth-error"
            );
            return;
        }

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;
        const confirm = document.getElementById("signupConfirm").value;

        if (!name || !email || !password || !confirm) {
            showMessage(
                "signupMessage",
                "Please fill in all details.",
                "auth-error"
            );
            return;
        }

        if (!isValidEmail(email)) {
            showMessage(
                "signupMessage",
                "Please enter a valid email address.",
                "auth-error"
            );
            return;
        }

        if (!isValidPassword(password)) {
            showMessage(
                "signupMessage",
                "Password must be at least 6 characters and include a number.",
                "auth-error"
            );
            return;
        }

        if (password !== confirm) {
            showMessage(
                "signupMessage",
                "Passwords do not match.",
                "auth-error"
            );
            return;
        }

        signupBtn.disabled = true;
        signupBtn.textContent = "Creating account...";

        try {
            const { data, error } = await authClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

            if (error) {
                throw error;
            }

            // Supabase may require email confirmation.
            if (!data.session) {
                showMessage(
                    "signupMessage",
                    "Account request received. Check your email for a confirmation link before logging in.",
                    "auth-success"
                );

                return;
            }

            // Used only for the existing dashboard greeting.
            // This value is NOT proof of authentication.
            localStorage.setItem("studentName", name);

            showMessage(
                "signupMessage",
                "Account created successfully.",
                "auth-success"
            );

            window.location.replace("index.html");

        } catch (error) {
            console.error("Signup error:", error);

            showMessage(
                "signupMessage",
                error.message || "Could not create your account. Please try again.",
                "auth-error"
            );

        } finally {
            signupBtn.disabled = false;
            signupBtn.textContent = "Sign Up";
        }
    });
}


// ========================================
// LOGIN
// ========================================

const loginBtn = document.getElementById("loginBtn");


if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
        if (!authClient) {
            showMessage(
                "loginMessage",
                "Authentication is not configured. Please check the Supabase setup.",
                "auth-error"
            );
            return;
        }

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            showMessage(
                "loginMessage",
                "Please enter your email and password.",
                "auth-error"
            );
            return;
        }

        if (!isValidEmail(email)) {
            showMessage(
                "loginMessage",
                "Please enter a valid email address.",
                "auth-error"
            );
            return;
        }

        loginBtn.disabled = true;
        loginBtn.textContent = "Logging in...";

        try {
            const { data, error } = await authClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                throw error;
            }

            const user = data.user;

            const studentName =
                user.user_metadata?.full_name ||
                user.email ||
                "Student";

            // Used only for the existing dashboard greeting.
            // The Supabase session is the authentication mechanism.
            localStorage.setItem("studentName", studentName);

            showMessage(
                "loginMessage",
                "Login successful.",
                "auth-success"
            );

            window.location.replace("index.html");

        } catch (error) {
            console.error("Login error:", error);

            showMessage(
                "loginMessage",
                error.message || "Login failed. Check your email and password.",
                "auth-error"
            );

        } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = "Login";
        }
    });
}
