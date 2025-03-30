// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Динамическое создание карточек услуг
    const servicesSection = document.querySelector('.services');
    
    if (servicesSection) {
        const servicesList = servicesSection.querySelector('.services__list');
        
        // Данные для карточек услуг
        const servicesData = {
            service1: {
                image: 'images/services_1.jpg',
                name: 'Лечение зубов',
                description: 'Мы предлагаем комплексное лечение кариеса, пульпита и периодонтита с использованием современных материалов и технологий.'
            },
            service2: {
                image: 'images/services_3.jpg',
                name: 'Профилактическая гигиена полости рта',
                description: 'Регулярная профессиональная чистка зубов, удаление зубного камня и налета.'
            },
            service3: {
                image: 'images/services_2.jpg',
                name: 'Ортодонтия (брекеты)',
                description: 'Выравнивание зубов и коррекция прикуса с помощью брекет-систем различных типов.'
            },
            service4: {
                image: 'images/services_7.jpg',
                name: 'Детская стоматология',
                description: 'Безболезненное и комфортное лечение для детей всех возрастов.'
            },
            service5: {
                image: 'images/services_5.jpg',
                name: 'Имплантация зубов',
                description: 'Восстановление утраченных зубов с помощью современных имплантатов.'
            },
            service6: {
                image: 'images/services_8.jpg',
                name: 'Изготовление и установка виниров',
                description: 'Тонкие керамические накладки для коррекции формы, цвета и положения зубов.'
            },
            service7: {
                image: 'images/services_6.jpg',
                name: 'Протезирование зубов',
                description: 'Восстановление утраченных или поврежденных зубов с помощью съемных и несъемных протезов.'
            },
            service8: {
                image: 'images/services_4.jpg',
                name: 'Хирургические вмешательства',
                description: 'Современные методы удаления зубов, операции по восстановлению десен и другие хирургические процедуры.'
            }
        };

        // Функция для создания карточки услуги
        const createServiceCard = (image, name, description) => {
            return `
                <div class="services__card">
                    <div class="services__image-container">
                        <img class="services__card-image" src="${image}" alt="${name}" />
                    </div>
                    <p class="services__card-name">${name}</p>
                    <div class="services__text" hidden>${description}</div>
                </div>
            `;
        };

        // Добавляем карточки в список
        for (const serviceKey in servicesData) {
            const service = servicesData[serviceKey];
            const cardElement = createServiceCard(service.image, service.name, service.description);
            servicesList.insertAdjacentHTML('beforeend', cardElement);
        }

        // Добавляем обработчики кликов для карточек
        const serviceCards = document.querySelectorAll('.services__card');
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const hiddenText = this.querySelector('.services__text');
                if (hiddenText) {
                    hiddenText.hidden = !hiddenText.hidden;
                }
            });
        });
    }

    // 2. Реализация слайдера для карточек услуг
    const servicesList = document.querySelector('.services__list');
    const controlsContainer = document.querySelector('.services__controls');
    
    if (servicesList && controlsContainer) {
        let currentIndex = 0;
        const cards = document.querySelectorAll('.services__card');
        const cardCount = cards.length;
        const visibleCards = 3; // Количество одновременно отображаемых карточек
        
        // Создаем круглые кнопки управления
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&larr;';
        prevButton.classList.add('services__nav-button', 'services__prev-button');
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&rarr;';
        nextButton.classList.add('services__nav-button', 'services__next-button');
        
        controlsContainer.innerHTML = '';
        controlsContainer.appendChild(prevButton);
        controlsContainer.appendChild(nextButton);
        
        // Функция обновления отображения карточек
        function updateSlider() {
            cards.forEach((card, index) => {
                if (index >= currentIndex && index < currentIndex + visibleCards) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Блокировка кнопок, если достигнуты границы
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= cardCount - visibleCards;
        }
        
        // Инициализация слайдера
        updateSlider();
        
        // Обработчики кнопок
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = cardCount - visibleCards;
            }
            updateSlider();
        });
        
        nextButton.addEventListener('click', () => {
            if (currentIndex < cardCount - visibleCards) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        });
    }

 // 3. Всплывающая форма записи (обновленная версия)
const consultationButton = document.querySelector('.header__consultation-button');
const recordingButton = document.querySelector('.consultation__button');
const recordingPopup = document.getElementById('recording-popup');
const closeRecordingForm = document.getElementById('close-recording-form');

function openRecordingForm() {
    recordingPopup.style.display = 'flex'; // Используем flex для центрирования
}

function closeRecordingPopup() {
    recordingPopup.style.display = 'none';
}

if (consultationButton) {
    consultationButton.addEventListener('click', openRecordingForm);
}

if (recordingButton) {
    recordingButton.addEventListener('click', openRecordingForm);
}

if (closeRecordingForm) {
    closeRecordingForm.addEventListener('click', closeRecordingPopup);
}

window.addEventListener('click', function(event) {
    if (event.target === recordingPopup) {
        closeRecordingPopup();
    }
});

    // 4. Кнопка скролла вверх
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑ Наверх';
    scrollToTopButton.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 5. Обработка формы консультации
    const consultationForm = document.querySelector('.consultation__form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const phoneInput = document.getElementById('phone');
            const feedbackMessage = document.querySelector('.feedback-message');
            
            if (phoneInput.value) {
                feedbackMessage.textContent = 'Спасибо! Мы скоро с вами свяжемся.';
                feedbackMessage.style.color = 'green';
                feedbackMessage.style.display = 'block';
                phoneInput.value = '';
                
                setTimeout(function() {
                    feedbackMessage.style.display = 'none';
                }, 3000);
            } else {
                feedbackMessage.textContent = 'Пожалуйста, введите номер телефона.';
                feedbackMessage.style.color = 'red';
                feedbackMessage.style.display = 'block';
            }
        });
    }
});