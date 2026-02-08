document.addEventListener("DOMContentLoaded", async () => {
    const trainersContainer = document.getElementById('indexTrainersList');

    try {
        // Берем тренеров с твоего эндпоинта /api/trainers
        const res = await fetch("http://localhost:5000/api/trainers");
        const trainers = await res.json();

        if (res.ok && trainers.length > 0) {
            trainersContainer.innerHTML = trainers.slice(0, 3).map(t => `
                <div class="trainer-card-main">
                    <div class="trainer-img-wrapper">
                         <img src="https://via.placeholder.com/300x400/ff69b4/ffffff?text=${t.username}" alt="${t.username}">
                    </div>
                    <h3>${t.username}</h3>
                    <p class="specialty">${t.specialty || 'Персональный тренер'}</p>
                    <p class="exp">Опыт: ${t.experience || '3 года'}</p>
                </div>
            `).join('');
        } else {
            trainersContainer.innerHTML = "<p>Наши тренеры готовятся к занятиям!</p>";
        }
    } catch (err) {
        console.error("Не удалось загрузить тренеров для главной", err);
    }
});