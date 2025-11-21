
export const handleUpdateUserName = async (newName) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/updateUserName`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ newName }),
        });
        const data = await res.json();
        } catch {
        console.log("Error al actualizar nombre");
    }
};

export const handleUpdatePassword = async ({ oldPassword, newPassword, newPasswordCheck }) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/updatePassword`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ oldPassword, newPassword, newPasswordCheck }),
        });
        const data = await res.json();
        return data;
    } catch {
        return data.message;
    }
};

export const handleUpdateProfilePicture = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/updateProfilePicture`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });
        const data = await res.json();
    } catch {
        console.log("Error al actualizar foto");
    }
};