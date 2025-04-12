// script.js

// 1. Preloader с гарантированным минимальным временем показа
const preloader = document.querySelector('.preloader');
if (preloader) {
    const minLoaderTime = 800; // Минимум 0.8 секунды
    const startTime = Date.now();

    const hidePreloader = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minLoaderTime - elapsed);

        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, remaining);
    };

    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 3000); // Фолбэк на случай, если load не сработает
}

document.addEventListener('DOMContentLoaded', function() {
    // 2. Загрузка данных и создание карточек
    const loadAndRenderCards = async () => {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            
            const services = await response.json();
            console.log('Успешно загружено услуг:', services.length);

            // 2.1. Основные карточки услуг
            const cardList = document.querySelector('.card__list');
            if (cardList) {
                cardList.innerHTML = services.map(service => `
                    <a class="card__item" href="${service.link}">
                        <span class="card__icon">
                            <img src="${service.icon}" 
                                 alt="${service.iconAlt}" 
                                 width="${service.iconWidth}" 
                                 height="${service.iconHeight}">
                        </span>
                        <h3 class="card__title">${service.title}</h3>
                        <p class="card__description">${service.description}</p>
                    </a>
                `).join('');
            }

            // 2.2. Карточки в секции services
            const servicesList = document.querySelector('.services__list');
            if (servicesList) {
                servicesList.innerHTML = services.map(service => `
                    <div class="services__card">
                        <div class="services__image-container">
                            <img class="services__card-image" 
                                 src="${service.icon.replace('icon/', '')}" 
                                 alt="${service.title}">
                        </div>
                        <p class="services__card-name">${service.title}</p>
                        <div class="services__text" hidden>
                            ${service.description}
                        </div>
                    </div>
                `).join('');

                // Обработчики для раскрытия текста
                servicesList.querySelectorAll('.services__card').forEach(card => {
                    card.addEventListener('click', function() {
                        const text = this.querySelector('.services__text');
                        if (text) text.hidden = !text.hidden;
                    });
                });
            }

            return services;
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            return [];
        }
    };

    // 3. Слайдер для карточек услуг
    const initSlider = () => {
        const controlsContainer = document.querySelector('.services__controls');
        const cards = document.querySelectorAll('.services__card');
        
        if (!controlsContainer || cards.length === 0) return;

        let currentIndex = 0;
        const visibleCards = 3;

        // Создаем кнопки управления
        controlsContainer.innerHTML = `
            <button class="services__nav-button services__prev-button" disabled>&larr;</button>
            <button class="services__nav-button services__next-button">&rarr;</button>
        `;

        const [prevBtn, nextBtn] = controlsContainer.querySelectorAll('button');

        const updateSlider = () => {
            cards.forEach((card, index) => {
                card.style.display = 
                    (index >= currentIndex && index < currentIndex + visibleCards) 
                    ? 'block' : 'none';
            });

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= cards.length - visibleCards;
        };

        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(0, currentIndex - 1);
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = Math.min(cards.length - visibleCards, currentIndex + 1);
            updateSlider();
        });

        updateSlider();
    };

    // 4. Модальное окно записи
    const initModal = () => {
        const modal = document.getElementById('recording-popup');
        if (!modal) return;

        const openModal = () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        };

        // Все кнопки с атрибутом data-modal-open
        document.querySelectorAll('[data-modal-open]').forEach(btn => {
            btn.addEventListener('click', openModal);
        });

        // Кнопка закрытия
        document.getElementById('close-recording-form')?.addEventListener('click', closeModal);

        // Закрытие по клику вне окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    };

    // 5. Кнопка "Наверх"
    const initScrollToTop = () => {
        const btn = document.createElement('button');
        btn.className = 'scroll-to-top';
        btn.innerHTML = '↑ Наверх';
        btn.style.display = 'none';
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            btn.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // 6. Форма консультации
    const initConsultationForm = () => {
        const form = document.querySelector('.consultation__form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const phoneInput = this.querySelector('#phone');
            const feedback = this.querySelector('.feedback-message');

            if (!phoneInput.value.trim()) {
                feedback.textContent = 'Пожалуйста, введите номер телефона';
                feedback.style.color = '#ff4d4d';
                feedback.style.display = 'block';
                return;
            }

            // Здесь должна быть отправка данных
            console.log('Отправка номера:', phoneInput.value);

            feedback.textContent = 'Спасибо! Мы скоро вам перезвоним';
            feedback.style.color = '#4CAF50';
            feedback.style.display = 'block';
            phoneInput.value = '';

            setTimeout(() => {
                feedback.style.display = 'none';
            }, 3000);
        });
    };

    // 7. Динамическое меню
    const initMenu = () => {
        const headerList = document.querySelector('.header__list');
        if (!headerList) return;

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        const menuItems = [
            { link: 'index.html', title: 'Главная' },
            { link: 'service.html', title: 'Услуги' },
            { link: 'patient.html', title: 'Пациентам' },
            { link: 'record.html', title: 'Запись' }
        ];

        headerList.innerHTML = menuItems.map(item => `
            <li class="header__item">
                <a href="${item.link}" 
                   class="header__item-link ${currentPage === item.link ? 'header__item-link--active' : ''}">
                    ${item.title}
                </a>
            </li>
        `).join('') + `
            <li class="header__item">
                <button class="header__consultation-button button" data-modal-open>
                    Заказать звонок
                </button>
            </li>
        `;
    };

    // Главная функция инициализации
    const initApp = async () => {
        initMenu();
        initModal();
        initScrollToTop();
        initConsultationForm();
        
        await loadAndRenderCards();
        initSlider();
    };

    // Запуск приложения
    initApp().catch(error => {
        console.error('Ошибка инициализации:', error);
    });
});