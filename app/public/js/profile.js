document.addEventListener("DOMContentLoaded", async () => {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();

        if (response.ok) {
            document.querySelector('.profile-info p:nth-child(1)').innerHTML = `<strong>Email:</strong> ${data.email}`;
            document.querySelector('.profile-info p:nth-child(2)').innerHTML = `<strong>Телефон:</strong> ${data.phoneNumber || 'Не указан'}`;
            document.querySelector('h2').innerText = data.username;
        }
    } catch (error) {
        console.error("Ошибка загрузки данных профиля", error);
    }
});