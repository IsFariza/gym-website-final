document.addEventListener("DOMContentLoaded", async () => {
    // Проверка, залогинен ли пользователь (через auth.js)
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();

        if (response.ok) {
            // Заполняем пустые места со скриншота
            document.querySelector('.profile-info p:nth-child(1)').innerHTML = `<strong>Email:</strong> ${data.email}`;
            document.querySelector('.profile-info p:nth-child(2)').innerHTML = `<strong>Телефон:</strong> ${data.phoneNumber || 'Не указан'}`;
            // Если есть имя пользователя
            document.querySelector('h2').innerText = data.username;
        }
    } catch (error) {
        console.error("Ошибка загрузки данных профиля", error);
    }
});