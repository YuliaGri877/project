'use strict'

document.addEventListener('DOMContentLoaded', () => {

    /* 
    * 2. Плавная прокрутка к секциям при клике на меню
    */

    // 1. Получаем все ссылки в меню
    const menuLinks = document.querySelectorAll('.header__item-link');
    if (!menuLinks.length) {
        console.error('Ссылки в меню не найдены!');
        return;
    }
    
    /* 
    *   Алгоритм
    *   1. Начало.
    *   2. Найти все ссылки меню.
    *   3. Для каждой ссылки:
    *       3.1. Навесить обработчик события клик.
    *       3.2. При клике:
    *           3.2.1. Предотвратить стандартный переход по ссылке.
    *           3.2.2. Получить целевую секцию по href (например, #services).
    *           3.2.3. Проверить, существует ли секция.
    *               3.2.3.1. Да: выполнить плавную прокрутку.
    *               3.2.3.2. Нет: вывести ошибку.
    *   4. Конец.
    * 
    *   Блок-схема: https://prnt.sc/123456 (пример ссылки)
    */

    // 4. Навешиваем обработчик на каждую ссылку
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // 3.2.1. Предотвращаем переход по ссылке
            const targetId = e.target.getAttribute('href'); // Получаем ID секции
            const targetSection = document.querySelector(targetId); // 3.2.2. Находим секцию
            
            // 3.2.3. Проверяем существование секции
            if (targetSection) {
                // 3.2.3.1. Выполняем плавную прокрутку
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Плавная анимация
                    block: 'start' // Прокручиваем к верхней части секции
                });
                console.log(`Прокрутка к секции ${targetId}`);
            } else {
                console.error(`Секция ${targetId} не найдена!`);
            }
        });
    });
});
