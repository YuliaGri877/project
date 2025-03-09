// Файл: scripts/consultation.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    /* 
    * Форма онлайн-консультации
    * 
    * Алгоритм:
    * 1. Получить элементы формы.
    * 2. Навесить обработчик на кнопку "Заказать звонок".
    * 3. При клике:
    *    3.1. Проверить валидность телефона.
    *    3.2. Если валидно — отправить данные и показать сообщение.
    *    3.3. Иначе — показать ошибку.
    * 4. Очистить форму после отправки.
    */
    
    const phoneInput = document.getElementById('phone');
    const submitButton = document.querySelector('.consultation__button');
    const feedback = document.querySelector('.feedback-message');

    // Проверка валидности телефона
    function validatePhone(phone) {
        const phonePattern = /^(\+7|8)\s?\(?[0-9]{3}\)?\s?-?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$/;
        return phonePattern.test(phone);
    }

    // Отправка данных (мок-функция)
    function sendConsultation(phone) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (phone) {
                    resolve({ success: true });
                } else {
                    reject('Ошибка: Пустой телефон!');
                }
            }, 1000);
        });
    }

    // Обработчик клика по кнопке
    submitButton.addEventListener('click', async () => {
        const phone = phoneInput.value.trim();

        // Проверка обязательного поля
        if (!phone) {
            feedback.textContent = 'Пожалуйста, введите телефон!';
            feedback.style.color = 'red';
            feedback.style.display = 'block';
            return;
        }

        // Валидация телефона
        if (!validatePhone(phone)) {
            feedback.textContent = 'Некорректный формат телефона!';
            feedback.style.color = 'red';
            feedback.style.display = 'block';
            return;
        }

        // Отправка данных
        try {
            const response = await sendConsultation(phone);
            if (response.success) {
                feedback.textContent = 'Заявка отправлена! Скоро с вами свяжутся.';
                feedback.style.color = 'green';
                phoneInput.value = ''; // Очистка формы
            }
        } catch (error) {
            feedback.textContent = error.message;
            feedback.style.color = 'red';
        }

        // Скрыть сообщение через 3 секунды
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 3000);
    });
});