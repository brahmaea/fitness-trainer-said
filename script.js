// ФУНКЦИЯ ДЛЯ ГЕНЕРАЦИИ ПЕРСОНАЛИЗИРОВАННЫХ РЕКОМЕНДАЦИЙ
function generatePersonalizedRecommendations(name, gender, age, height, weight, activity, goal, targetCalories, proteinGrams, fatGrams, carbGrams) {
    let recommendations = `
        <div class="personal-greeting">
            <h3>Привет, ${name}! 👋</h3>
        </div>
        
        <div class="goal-section">
            <h4>🎯 ТВОЯ ЦЕЛЬ</h4>
    `;
    
    // Базовые рекомендации по цели
    switch (goal) {
        case 'lose':
            recommendations += `<p><strong>ПОХУДЕНИЕ</strong></p>`;
            recommendations += `<p>Для достижения цели похудения тебе нужно создать дефицит калорий в 500 ккал в день. Это позволит терять около 0.5 кг в неделю безопасно и эффективно.</p>`;
            break;
        case 'gain':
            recommendations += `<p><strong>НАБОР МЫШЕЧНОЙ МАССЫ</strong></p>`;
            recommendations += `<p>Для набора мышечной массы создай профицит калорий в 300 ккал в день. Это обеспечит рост мышц без лишнего жира.</p>`;
            break;
        default:
            recommendations += `<p><strong>ПОДДЕРЖАНИЕ ВЕСА</strong></p>`;
            recommendations += `<p>Для поддержания текущего веса придерживайся рассчитанной нормы калорий.</p>`;
    }
    
    recommendations += `</div>
        
        <div class="nutrition-norm-section">
            <h4>📊 ТВОЯ НОРМА КБЖУ</h4>
            <div class="nutrition-cards">
                <div class="nutrition-card calories">
                    <div class="nutrition-icon">🔥</div>
                    <div class="nutrition-value">${Math.round(targetCalories)}</div>
                    <div class="nutrition-label">ккал/день</div>
                </div>
                <div class="nutrition-card protein">
                    <div class="nutrition-icon">🥩</div>
                    <div class="nutrition-value">${proteinGrams}</div>
                    <div class="nutrition-label">г белка/день</div>
                </div>
                <div class="nutrition-card fats">
                    <div class="nutrition-icon">🥑</div>
                    <div class="nutrition-value">${fatGrams}</div>
                    <div class="nutrition-label">г жиров/день</div>
                </div>
                <div class="nutrition-card carbs">
                    <div class="nutrition-icon">🍞</div>
                    <div class="nutrition-value">${carbGrams}</div>
                    <div class="nutrition-label">г углеводов/день</div>
                </div>
            </div>
        </div>
        
        <div class="consultation-section">
            <h4>💬 ХОЧЕШЬ ПОДРОБНЕЕ РАЗОБРАТЬСЯ В ПИТАНИИ?</h4>
            <p>Получи персональный план питания и тренировок от эксперта!</p>
            <div class="telegram-link">
                <a href="https://t.me/pringyyyy" target="_blank" class="telegram-button">
                    <span class="telegram-icon">📱</span>
                    <span class="telegram-text">Написать в Telegram</span>
                    <span class="telegram-username">@pringyyyy</span>
                </a>
            </div>
        </div>
    `;
    
    return recommendations;
}

// ФУНКЦИЯ ДЛЯ ПОКАЗА УВЕДОМЛЕНИЙ
function showNotification(message) {
    // Создаем простое уведомление
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(notification);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// МАКСИМАЛЬНО ПРОСТЫЕ ФУНКЦИИ ОТПРАВКИ
function sendForm1() {
    const name = document.getElementById('name')?.value;
    const telegram = document.getElementById('telegram')?.value;
    const phone = document.getElementById('phone')?.value;
    
    if (!name || !telegram || !phone) {
        alert('Заполните все поля');
        return false;
    }
    
    const message = `🔥 ЗАЯВКА!\n👤 ${name}\n📱 ${phone}\n🤡 ${telegram}`;
    
    fetch(`https://api.telegram.org/bot8027169258:AAEiLJ-kLoQeuwgEu2CXpsw87iYJ0x5XX0U/sendMessage?chat_id=820483570&text=${encodeURIComponent(message)}`);
    
    alert('Заявка отправлена!');
    
    // Очищаем поля
    document.getElementById('name').value = '';
    document.getElementById('telegram').value = '';  
    document.getElementById('phone').value = '';
    
    return false;
}

function sendForm2() {
    try {
        console.log('Начинаем расчет КБЖУ...');
        
        const name = document.getElementById('calc-name').value;
        const telegram = document.getElementById('calc-telegram').value;
        const phone = document.getElementById('calc-phone').value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const age = document.getElementById('age').value;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        const activity = document.getElementById('activity').value;
        const goal = document.querySelector('input[name="goal"]:checked')?.value;
        
        console.log('Данные формы:', { name, telegram, phone, gender, age, height, weight, activity, goal });
        
        if (!name || !telegram || !phone || !gender || !age || !height || !weight || !activity || !goal) {
            alert('Заполните все поля');
            return;
        }
        
        // Проверяем наличие элементов для результатов
        console.log('Проверяем элементы результатов...');
        const resultsContainerCheck = document.getElementById('resultsContainer');
        const caloriesElCheck = document.getElementById('calories');
        const proteinsElCheck = document.getElementById('proteins');
        
        console.log('Элементы найдены:', {
            resultsContainer: !!resultsContainerCheck,
            caloriesEl: !!caloriesElCheck,
            proteinsEl: !!proteinsElCheck
        });
        
        // РАСЧЕТ КБЖУ
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        
        let tdee = bmr * activity;
        
        let targetCalories;
        switch (goal) {
            case 'lose':
                targetCalories = tdee - 500;
                break;
            case 'gain':
                targetCalories = tdee + 300;
                break;
            default:
                targetCalories = tdee;
        }
        
        let proteinRatio, fatRatio, carbRatio;
        switch (goal) {
            case 'lose':
                proteinRatio = 0.35;
                fatRatio = 0.25;
                carbRatio = 0.40;
                break;
            case 'gain':
                proteinRatio = 0.25;
                fatRatio = 0.20;
                carbRatio = 0.55;
                break;
            default:
                proteinRatio = 0.30;
                fatRatio = 0.25;
                carbRatio = 0.45;
        }
        
        const proteinCalories = targetCalories * proteinRatio;
        const fatCalories = targetCalories * fatRatio;
        const carbCalories = targetCalories * carbRatio;
        
        const proteinGrams = Math.round(proteinCalories / 4);
        const fatGrams = Math.round(fatCalories / 9);
        const carbGrams = Math.round(carbCalories / 4);
        
        // ПОКАЗЫВАЕМ РЕЗУЛЬТАТЫ
        console.log('Обновляем результаты на странице...');
        
        const caloriesEl = document.getElementById('calories');
        const proteinsEl = document.getElementById('proteins');
        const proteinsCaloriesEl = document.getElementById('proteinsCalories');
        const fatsEl = document.getElementById('fats');
        const fatsCaloriesEl = document.getElementById('fatsCalories');
        const carbsEl = document.getElementById('carbs');
        const carbsCaloriesEl = document.getElementById('carbsCalories');
        
        if (caloriesEl) caloriesEl.textContent = Math.round(targetCalories) + ' ккал/день';
        if (proteinsEl) proteinsEl.textContent = proteinGrams + ' г/день';
        if (proteinsCaloriesEl) proteinsCaloriesEl.textContent = Math.round(proteinCalories) + ' ккал';
        if (fatsEl) fatsEl.textContent = fatGrams + ' г/день';
        if (fatsCaloriesEl) fatsCaloriesEl.textContent = Math.round(fatCalories) + ' ккал';
        if (carbsEl) carbsEl.textContent = carbGrams + ' г/день';
        if (carbsCaloriesEl) carbsCaloriesEl.textContent = Math.round(carbCalories) + ' ккал';
        
        console.log('Результаты обновлены:', {
            calories: Math.round(targetCalories),
            proteins: proteinGrams,
            fats: fatGrams,
            carbs: carbGrams
        });
        
        // ПРОСТЫЕ РЕКОМЕНДАЦИИ
        const recommendationsEl = document.getElementById('recommendationsText');
        if (recommendationsEl) {
            let recommendations = `Привет, ${name}! 👋\n\n`;
            switch (goal) {
                case 'lose':
                    recommendations += `🎯 ПОХУДЕНИЕ\nТвоя норма: ${Math.round(targetCalories)} ккал/день\n💪 Б: ${proteinGrams}г | Ж: ${fatGrams}г | У: ${carbGrams}г\n\n📱 Нужен план питания? @pringyyyy`;
                    break;
                case 'gain':
                    recommendations += `🎯 НАБОР МАССЫ\nТвоя норма: ${Math.round(targetCalories)} ккал/день\n💪 Б: ${proteinGrams}г | Ж: ${fatGrams}г | У: ${carbGrams}г\n\n📱 Нужна программа тренировок? @pringyyyy`;
                    break;
                default:
                    recommendations += `🎯 ПОДДЕРЖАНИЕ\nТвоя норма: ${Math.round(targetCalories)} ккал/день\n💪 Б: ${proteinGrams}г | Ж: ${fatGrams}г | У: ${carbGrams}г\n\n📱 Нужна консультация? @pringyyyy`;
            }
            recommendationsEl.textContent = recommendations;
        }
        
        // ПОКАЗЫВАЕМ РЕЗУЛЬТАТЫ
        console.log('Показываем контейнер с результатами...');
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
            console.log('Контейнер показан, прокручиваем к нему...');
            setTimeout(() => {
                resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else {
            console.error('Контейнер результатов не найден!');
        }
        
        // ОТПРАВЛЯЕМ В TELEGRAM
        const genderText = gender === 'male' ? 'Мужской' : 'Женский';
        const goalText = goal === 'lose' ? 'Похудение' : goal === 'maintain' ? 'Поддержание' : 'Набор массы';
        const activityText = document.querySelector('#activity option:checked').textContent;
        
        // Рассчитываем ИМТ
        const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
        let bmiStatus = '';
        if (bmi < 18.5) bmiStatus = 'Недостаточный вес';
        else if (bmi < 25) bmiStatus = 'Нормальный вес';
        else if (bmi < 30) bmiStatus = 'Избыточный вес';
        else bmiStatus = 'Ожирение';
        
        const message = `📊 НОВЫЙ КЛИЕНТ - КБЖУ!\n\n👤 Имя: ${name}\n🤡 Телеграм: ${telegram}\n📱 Телефон: ${phone}\n⚖️ Пол: ${genderText}\n📏 Рост: ${height} см\n⚖️ Вес: ${weight} кг\n📊 ИМТ: ${bmi} (${bmiStatus})\n🎯 Цель: ${goalText}\n🏃 Активность: ${activityText}\n🕒 ${new Date().toLocaleString('ru-RU')}\n\n📊 РАСЧЕТ КБЖУ:\n🔥 Калории: ${Math.round(targetCalories)} ккал/день\n🥩 Белки: ${proteinGrams}г/день (${Math.round(targetCalories * 0.3)} ккал)\n🥑 Жиры: ${fatGrams}г/день (${Math.round(targetCalories * 0.25)} ккал)\n🍞 Углеводы: ${carbGrams}г/день (${Math.round(targetCalories * 0.45)} ккал)\n\n💧 Рекомендуемая норма воды: ${Math.round(weight * 30 + (activity - 1) * 500)}мл/день`;
        
        // НЕБЛОКИРУЮЩАЯ ОТПРАВКА
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.telegram.org/bot8027169258:AAEiLJ-kLoQeuwgEu2CXpsw87iYJ0x5XX0U/sendMessage?chat_id=820483570&text=${encodeURIComponent(message)}`, true);
        xhr.send();
        
        // Показываем уведомление
        showNotification('Расчет выполнен! Результаты отправлены в Telegram.');
        
    } catch (error) {
        console.error('Ошибка в функции sendForm2:', error);
        alert('Ошибка. Позвоните: +7 961 664-31-41');
    }
}

function sendForm3() {
    const name = document.querySelector('#consultationModal input[type="text"]')?.value;
    const telegram = document.querySelector('#consultationModal input[placeholder="Ваш телеграм"]')?.value;
    const phone = document.querySelector('#consultationModal input[placeholder="Ваш телефон"]')?.value;
    
    if (!name || !telegram || !phone) {
        alert('Заполните все поля');
        return false;
    }
    
    const message = `🔥 МОДАЛЬНАЯ ЗАЯВКА!\n👤 ${name}\n📱 ${phone}\n🤡 ${telegram}`;
    
    fetch(`https://api.telegram.org/bot8027169258:AAEiLJ-kLoQeuwgEu2CXpsw87iYJ0x5XX0U/sendMessage?chat_id=820483570&text=${encodeURIComponent(message)}`);
    
    alert('Заявка отправлена!');
    
    // Очищаем поля
    document.querySelector('#consultationModal input[type="text"]').value = '';
    document.querySelector('#consultationModal input[placeholder="Ваш телеграм"]').value = '';
    document.querySelector('#consultationModal input[placeholder="Ваш телефон"]').value = '';
    
    return false;
}

function sendForm4() {
    const name = document.querySelector('#questionModal input[type="text"]')?.value;
    const telegram = document.querySelector('#questionModal input[placeholder="Ваш телеграм"]')?.value;
    const question = document.querySelector('#questionModal textarea')?.value;
    
    if (!name || !telegram || !question) {
        alert('Заполните все поля');
        return false;
    }
    
    const message = `❓ ВОПРОС!\n👤 ${name}\n🤡 ${telegram}\n💬 ${question}`;
    
    fetch(`https://api.telegram.org/bot8027169258:AAEiLJ-kLoQeuwgEu2CXpsw87iYJ0x5XX0U/sendMessage?chat_id=820483570&text=${encodeURIComponent(message)}`);
    
    alert('Заявка отправлена!');
    
    // Очищаем поля
    document.querySelector('#questionModal input[type="text"]').value = '';
    document.querySelector('#questionModal input[placeholder="Ваш телеграм"]').value = '';
    document.querySelector('#questionModal textarea').value = '';
    
    return false;
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });

    // Video placeholder click handler
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            alert('Видео будет добавлено позже');
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero-content, .statistics-content, .advantage-card, .review-card, .result-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Initialize counters when they come into view
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                if (target) {
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            }
        });
    }, { threshold: 0.5 });
});

// Global functions for modal handling
function openModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Add loading animation for images
function preloadImages() {
    const images = document.querySelectorAll('.placeholder-image');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Simulate image loading
        setTimeout(() => {
            img.style.opacity = '1';
        }, Math.random() * 1000);
    });
}

// Initialize image loading
document.addEventListener('DOMContentLoaded', preloadImages);

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.advantage-card, .review-card, .result-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .ask-question-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .cta-button, .ask-question-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--white);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 1rem;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Calculator functionality
document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('calculatorForm');
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Ensure results container is hidden on page load
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const gender = formData.get('gender');
            const age = parseInt(formData.get('age'));
            const height = parseInt(formData.get('height'));
            const weight = parseFloat(formData.get('weight'));
            const activity = parseFloat(formData.get('activity'));
            const goal = formData.get('goal');
            
            // Validate data
            if (!gender || !age || !height || !weight || !activity || !goal) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            // Calculate BMR using Mifflin-St Jeor formula
            let bmr;
            if (gender === 'male') {
                bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            }
            
            // Calculate TDEE (Total Daily Energy Expenditure)
            let tdee = bmr * activity;
            
            // Adjust calories based on goal
            let targetCalories;
            switch (goal) {
                case 'lose':
                    targetCalories = tdee - 500; // 500 calorie deficit for weight loss
                    break;
                case 'gain':
                    targetCalories = tdee + 300; // 300 calorie surplus for weight gain
                    break;
                default:
                    targetCalories = tdee; // maintain weight
            }
            
            // Calculate macronutrients
            let proteinRatio, fatRatio, carbRatio;
            
            switch (goal) {
                case 'lose':
                    proteinRatio = 0.35; // 35% protein for weight loss
                    fatRatio = 0.25;     // 25% fat
                    carbRatio = 0.40;    // 40% carbs
                    break;
                case 'gain':
                    proteinRatio = 0.25; // 25% protein for weight gain
                    fatRatio = 0.20;     // 20% fat
                    carbRatio = 0.55;    // 55% carbs
                    break;
                default:
                    proteinRatio = 0.30; // 30% protein for maintenance
                    fatRatio = 0.25;     // 25% fat
                    carbRatio = 0.45;    // 45% carbs
            }
            
            const proteinCalories = targetCalories * proteinRatio;
            const fatCalories = targetCalories * fatRatio;
            const carbCalories = targetCalories * carbRatio;
            
            const proteinGrams = Math.round(proteinCalories / 4);
            const fatGrams = Math.round(fatCalories / 9);
            const carbGrams = Math.round(carbCalories / 4);
            
            // Update results
            document.getElementById('calories').textContent = Math.round(targetCalories) + ' ккал/день';
            document.getElementById('proteins').textContent = proteinGrams + ' г/день';
            document.getElementById('proteinsCalories').textContent = Math.round(proteinCalories) + ' ккал';
            document.getElementById('fats').textContent = fatGrams + ' г/день';
            document.getElementById('fatsCalories').textContent = Math.round(fatCalories) + ' ккал';
            document.getElementById('carbs').textContent = carbGrams + ' г/день';
            document.getElementById('carbsCalories').textContent = Math.round(carbCalories) + ' ккал';
            
            // Generate recommendations
            let recommendations = '';
            switch (goal) {
                case 'lose':
                    recommendations = `Для достижения цели похудения рекомендуется создать дефицит калорий в 500 ккал в день. Это позволит терять около 0.5 кг в неделю. Увеличьте потребление белка до ${proteinGrams}г в день для сохранения мышечной массы. Включите в рацион больше овощей и сложных углеводов.`;
                    break;
                case 'gain':
                    recommendations = `Для набора мышечной массы создайте профицит калорий в 300 ккал в день. Увеличьте потребление белка до ${proteinGrams}г в день для роста мышц. Включите в рацион качественные источники углеводов и полезных жиров. Не забывайте о силовых тренировках.`;
                    break;
                default:
                    recommendations = `Для поддержания текущего веса придерживайтесь рассчитанной нормы калорий. Сбалансируйте рацион: ${proteinGrams}г белка, ${fatGrams}г жиров и ${carbGrams}г углеводов в день. Регулярно занимайтесь спортом и пейте достаточно воды.`;
            }
            
            document.getElementById('recommendationsText').textContent = recommendations;
            
            // Show results with animation
            resultsContainer.style.display = 'block';
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Save results to localStorage
            const results = {
                calories: Math.round(targetCalories),
                proteins: proteinGrams,
                fats: fatGrams,
                carbs: carbGrams,
                goal: goal,
                timestamp: Date.now()
            };
            localStorage.setItem('calculatorResults', JSON.stringify(results));
        });
    }
    
    // Load saved results if available (but don't show automatically)
    const savedResults = localStorage.getItem('calculatorResults');
    if (savedResults) {
        const results = JSON.parse(savedResults);
        const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
        
        // Only show if results are less than 1 day old, but don't display automatically
        if (results.timestamp > oneDayAgo) {
            // Store results for potential use, but don't show them
            console.log('Previous results available but not displayed');
        } else {
            // Clear old results
            localStorage.removeItem('calculatorResults');
        }
    }
    
    // Carousel functionality
    function initializeCarousel() {
        const slides = document.querySelectorAll('.result-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        let currentSlideIndex = 0;
        
        console.log('Carousel initialization - Slides found:', slides.length, 'Dots found:', dots.length);
        
        if (slides.length === 0) {
            console.log('No slides found, retrying...');
            setTimeout(initializeCarousel, 200);
            return;
        }
        
        function showSlide(index) {
            console.log('Showing slide:', index, 'Total slides:', slides.length);
            
            // Hide all slides first
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            });
            
            // Remove active class from all dots
            dots.forEach((dot, i) => {
                dot.classList.remove('active');
            });
            
            // Show only current slide
            if (slides[index]) {
                slides[index].classList.add('active');
                slides[index].style.opacity = '1';
                slides[index].style.zIndex = '2';
                console.log('Slide', index, 'shown with opacity 1 and z-index 2');
            }
            
            // Activate current dot
            if (dots[index]) {
                dots[index].classList.add('active');
                console.log('Dot', index, 'activated');
            }
        }
        
        function changeSlide(direction) {
            console.log('Changing slide by:', direction, 'Current index:', currentSlideIndex);
            currentSlideIndex += direction;
            
            if (currentSlideIndex >= slides.length) {
                currentSlideIndex = 0;
            }
            if (currentSlideIndex < 0) {
                currentSlideIndex = slides.length - 1;
            }
            
            console.log('New index:', currentSlideIndex);
            showSlide(currentSlideIndex);
        }
        
        function currentSlide(index) {
            console.log('Current slide called with index:', index);
            currentSlideIndex = index - 1;
            showSlide(currentSlideIndex);
        }
        
        // Initialize first slide
        showSlide(0);
        
        // Additional check to ensure only one slide is visible
        setTimeout(() => {
            slides.forEach((slide, i) => {
                if (i !== 0) {
                    slide.classList.remove('active');
                }
            });
        }, 100);
        
        // Add click event listeners to buttons
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                changeSlide(-1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                changeSlide(1);
            });
        }
        
        // Add click event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                currentSlide(index + 1);
            });
        });
    }
    
    // Initialize carousel with multiple attempts
    initializeCarousel();
    
    // Backup initialization
    setTimeout(initializeCarousel, 100);
    setTimeout(initializeCarousel, 500);
    setTimeout(initializeCarousel, 1000);
    
    // Force show first slide on page load
    document.addEventListener('DOMContentLoaded', function() {
        const firstSlide = document.querySelector('.result-slide');
        if (firstSlide) {
            firstSlide.classList.add('active');
            console.log('DOMContentLoaded: First slide forced to show');
        }
    });
    
    // Additional window load event
    window.addEventListener('load', function() {
        const firstSlide = document.querySelector('.result-slide');
        if (firstSlide) {
            firstSlide.classList.add('active');
            console.log('Window load: First slide forced to show');
        }
    });

    // Trainer Carousel Before
    function initializeTrainerCarouselBefore() {
        const trainerSlides = document.querySelectorAll('.trainer-carousel-before .trainer-slide');
        const trainerDots = document.querySelectorAll('.trainer-carousel-before .trainer-carousel-dot');
        let currentTrainerSlideIndex = 0;
        
        console.log('Trainer carousel initialization - Slides found:', trainerSlides.length, 'Dots found:', trainerDots.length);
        
        if (trainerSlides.length === 0) {
            console.log('No trainer slides found, retrying...');
            setTimeout(initializeTrainerCarousel, 200);
            return;
        }
        
        function showTrainerSlide(index) {
            console.log('Showing trainer slide:', index, 'Total slides:', trainerSlides.length);
            
            // Hide all slides first
            trainerSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            });
            
            // Remove active class from all dots
            trainerDots.forEach((dot, i) => {
                dot.classList.remove('active');
            });
            
            // Show only current slide
            if (trainerSlides[index]) {
                trainerSlides[index].classList.add('active');
                trainerSlides[index].style.opacity = '1';
                trainerSlides[index].style.zIndex = '2';
                console.log('Trainer slide', index, 'shown with opacity 1 and z-index 2');
            }
            
            // Activate current dot
            if (trainerDots[index]) {
                trainerDots[index].classList.add('active');
                console.log('Trainer dot', index, 'activated');
            }
        }
        
        function changeTrainerSlide(direction) {
            console.log('Changing trainer slide by:', direction, 'Current index:', currentTrainerSlideIndex);
            currentTrainerSlideIndex += direction;
            
            if (currentTrainerSlideIndex >= trainerSlides.length) {
                currentTrainerSlideIndex = 0;
            }
            if (currentTrainerSlideIndex < 0) {
                currentTrainerSlideIndex = trainerSlides.length - 1;
            }
            
            console.log('New trainer index:', currentTrainerSlideIndex);
            showTrainerSlide(currentTrainerSlideIndex);
        }
        
        function currentTrainerSlide(index) {
            console.log('Current trainer slide called with index:', index);
            currentTrainerSlideIndex = index - 1;
            showTrainerSlide(currentTrainerSlideIndex);
        }
        
        // Initialize first slide
        showTrainerSlide(0);
        
        // Add click event listeners to buttons
        const trainerPrevBtn = document.querySelector('.trainer-carousel-before .trainer-carousel-prev');
        const trainerNextBtn = document.querySelector('.trainer-carousel-before .trainer-carousel-next');
        
        if (trainerPrevBtn) {
            trainerPrevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                changeTrainerSlide(-1);
            });
        }
        
        if (trainerNextBtn) {
            trainerNextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                changeTrainerSlide(1);
            });
        }
        
        // Add click event listeners to dots
        trainerDots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                currentTrainerSlide(index + 1);
            });
        });
    }
    
    // Trainer Carousel After
    function initializeTrainerCarouselAfter() {
        const trainerSlides = document.querySelectorAll('.trainer-carousel-after .trainer-slide');
        const trainerDots = document.querySelectorAll('.trainer-carousel-after .trainer-carousel-dot');
        let currentTrainerSlideIndex = 0;
        
        console.log('Trainer carousel after initialization - Slides found:', trainerSlides.length, 'Dots found:', trainerDots.length);
        
        if (trainerSlides.length === 0) {
            console.log('No trainer after slides found, retrying...');
            setTimeout(initializeTrainerCarouselAfter, 200);
            return;
        }
        
        function showTrainerSlide(index) {
            console.log('Showing trainer after slide:', index, 'Total slides:', trainerSlides.length);
            
            // Hide all slides first
            trainerSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            });
            
            // Remove active class from all dots
            trainerDots.forEach((dot, i) => {
                dot.classList.remove('active');
            });
            
            // Show only current slide
            if (trainerSlides[index]) {
                trainerSlides[index].classList.add('active');
                trainerSlides[index].style.opacity = '1';
                trainerSlides[index].style.zIndex = '2';
                console.log('Trainer after slide', index, 'shown with opacity 1 and z-index 2');
            }
            
            // Activate current dot
            if (trainerDots[index]) {
                trainerDots[index].classList.add('active');
                console.log('Trainer after dot', index, 'activated');
            }
        }
        
        function changeTrainerSlide(direction) {
            console.log('Changing trainer after slide by:', direction, 'Current index:', currentTrainerSlideIndex);
            currentTrainerSlideIndex += direction;
            
            if (currentTrainerSlideIndex >= trainerSlides.length) {
                currentTrainerSlideIndex = 0;
            }
            if (currentTrainerSlideIndex < 0) {
                currentTrainerSlideIndex = trainerSlides.length - 1;
            }
            
            console.log('New trainer after index:', currentTrainerSlideIndex);
            showTrainerSlide(currentTrainerSlideIndex);
        }
        
        function currentTrainerSlide(index) {
            console.log('Current trainer after slide called with index:', index);
            currentTrainerSlideIndex = index - 1;
            showTrainerSlide(currentTrainerSlideIndex);
        }
        
        // Initialize first slide
        showTrainerSlide(0);
        
        // Add click event listeners to buttons
        const trainerPrevBtn = document.querySelector('.trainer-carousel-after .trainer-carousel-prev');
        const trainerNextBtn = document.querySelector('.trainer-carousel-after .trainer-carousel-next');
        
        if (trainerPrevBtn) {
            trainerPrevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                changeTrainerSlide(-1);
            });
        }
        
        if (trainerNextBtn) {
            trainerNextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                changeTrainerSlide(1);
            });
        }
        
        // Add click event listeners to dots
        trainerDots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                currentTrainerSlide(index + 1);
            });
        });
        
        // Auto-play functionality for trainer carousel after
        let trainerAfterAutoPlayInterval;
        
        function startTrainerAfterAutoPlay() {
            trainerAfterAutoPlayInterval = setInterval(() => {
                changeTrainerSlide(1);
            }, 6000); // Change slide every 6 seconds (longer for videos)
        }
        
        function stopTrainerAfterAutoPlay() {
            if (trainerAfterAutoPlayInterval) {
                clearInterval(trainerAfterAutoPlayInterval);
            }
        }
        
        // Start auto-play
        startTrainerAfterAutoPlay();
        
        // Pause auto-play on hover
        const trainerCarouselAfter = document.querySelector('.trainer-carousel-after');
        if (trainerCarouselAfter) {
            trainerCarouselAfter.addEventListener('mouseenter', stopTrainerAfterAutoPlay);
            trainerCarouselAfter.addEventListener('mouseleave', startTrainerAfterAutoPlay);
        }
    }
    
    // Initialize trainer carousels with multiple attempts
    initializeTrainerCarouselBefore();
    initializeTrainerCarouselAfter();
    
    // Backup initialization
    setTimeout(initializeTrainerCarouselBefore, 100);
    setTimeout(initializeTrainerCarouselAfter, 100);
    setTimeout(initializeTrainerCarouselBefore, 500);
    setTimeout(initializeTrainerCarouselAfter, 500);
    setTimeout(initializeTrainerCarouselBefore, 1000);
    setTimeout(initializeTrainerCarouselAfter, 1000);
    
    // Support Carousel functionality
    function initializeSupportCarousel() {
        const supportSlides = document.querySelectorAll('.support-slide');
        const supportDots = document.querySelectorAll('.support-carousel-dot');
        let currentSupportSlideIndex = 0;
        
        console.log('Support carousel initialization - Slides found:', supportSlides.length, 'Dots found:', supportDots.length);
        
        if (supportSlides.length === 0) {
            console.log('No support slides found, retrying...');
            setTimeout(initializeSupportCarousel, 200);
            return;
        }
        
        function showSupportSlide(index) {
            console.log('Showing support slide:', index, 'Total slides:', supportSlides.length);
            
            // Hide all slides first
            supportSlides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            });
            
            // Remove active class from all dots
            supportDots.forEach((dot, i) => {
                dot.classList.remove('active');
            });
            
            // Show only current slide
            if (supportSlides[index]) {
                supportSlides[index].classList.add('active');
                supportSlides[index].style.opacity = '1';
                supportSlides[index].style.zIndex = '2';
                console.log('Support slide', index, 'shown with opacity 1 and z-index 2');
            }
            
            // Activate current dot
            if (supportDots[index]) {
                supportDots[index].classList.add('active');
                console.log('Support dot', index, 'activated');
            }
        }
        
        function changeSupportSlide(direction) {
            console.log('Changing support slide by:', direction, 'Current index:', currentSupportSlideIndex);
            currentSupportSlideIndex += direction;
            
            if (currentSupportSlideIndex >= supportSlides.length) {
                currentSupportSlideIndex = 0;
            }
            if (currentSupportSlideIndex < 0) {
                currentSupportSlideIndex = supportSlides.length - 1;
            }
            
            console.log('New support index:', currentSupportSlideIndex);
            showSupportSlide(currentSupportSlideIndex);
        }
        
        function currentSupportSlide(index) {
            console.log('Current support slide called with index:', index);
            currentSupportSlideIndex = index - 1;
            showSupportSlide(currentSupportSlideIndex);
        }
        
        // Initialize first slide
        showSupportSlide(0);
        
        // Add click event listeners to buttons
        const supportPrevBtn = document.querySelector('.support-carousel-prev');
        const supportNextBtn = document.querySelector('.support-carousel-next');
        
        if (supportPrevBtn) {
            supportPrevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                changeSupportSlide(-1);
            });
        }
        
        if (supportNextBtn) {
            supportNextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                changeSupportSlide(1);
            });
        }
        
        // Add click event listeners to dots
        supportDots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                currentSupportSlide(index + 1);
            });
        });
        
        // Auto-play functionality
        let autoPlayInterval;
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                changeSupportSlide(1);
            }, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }
        
        // Start auto-play
        startAutoPlay();
        
        // Pause auto-play on hover
        const supportCarousel = document.querySelector('.support-carousel');
        if (supportCarousel) {
            supportCarousel.addEventListener('mouseenter', stopAutoPlay);
            supportCarousel.addEventListener('mouseleave', startAutoPlay);
        }
    }
    
    // Initialize support carousel
    initializeSupportCarousel();
    
    // Backup initialization for support carousel
    setTimeout(initializeSupportCarousel, 100);
    setTimeout(initializeSupportCarousel, 500);
    setTimeout(initializeSupportCarousel, 1000);
}); 