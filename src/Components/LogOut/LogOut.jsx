
async function logout() {
    const token = localStorage.getItem("userToken");
    if (!token) {
        alert("User is not logged in.");
        return;
    }
    try {
        const response = await fetch("/api/User/logout", {
            method: "POST",
            headers: {"Authorization": token,},
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);  // Display success message
            console.log(result.message);

            localStorage.removeItem("userToken"); 
            window.location.replace("/login");
        } else {
            const error = await response.json();
            alert(error.message || "Logout failed. Please try again.");
            console.error("Logout failed", error);
        }
    } catch (err) {
        console.error("Logout failed", err);
        alert("An unexpected error occurred. Please try again.");
    }
}