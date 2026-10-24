
/* ========================================
   STUDENTHUB - AUTHENTICATION GUARD
======================================== */

(async function protectDashboard() {

    // Hide the dashboard until authentication is checked.
    document.documentElement.style.visibility = "hidden";

    const supabaseClient = window.studentHubSupabase;

    // Make sure the Supabase client has loaded.
    if (!supabaseClient) {
        console.error(
            "Supabase is not initialized. Check index.html."
        );

        window.location.replace("auth.html");
        return;
    }

    try {

        // Verify the signed-in user with Supabase.
        const { data, error } =
            await supabaseClient.auth.getUser();

        if (error || !data.user) {
            window.location.replace("auth.html");
            return;
        }

        // Make the verified user's information available
        // to the dashboard scripts.
        window.studentHubUser = data.user;
        window.studentHubUserId = data.user.id;

        const studentName =
            data.user.user_metadata?.full_name ||
            data.user.email ||
            "Student";

        // Used for the dashboard greeting only.
        // This is not the authentication check.
        localStorage.setItem(
            "studentName",
            studentName
        );

        // Load dashboard functionality only after
        // authentication succeeds.
        const appScript = document.createElement("script");

        appScript.src = "script.js";

        appScript.onload = function () {
            document.documentElement.style.visibility = "";
        };

        appScript.onerror = function () {
            console.error(
                "Could not load StudentHub script.js."
            );

            document.documentElement.style.visibility = "";
            alert(
                "StudentHub could not load. Please refresh the page."
            );
        };

        document.body.appendChild(appScript);

    } catch (error) {

        console.error(
            "Could not verify the Supabase session:",
            error
        );

        document.documentElement.style.visibility = "";

        alert(
            "Could not verify your login. Please check your internet connection and try again."
        );

        window.location.replace("auth.html");
    }

})();
