document.addEventListener('DOMContentLoaded', () => {
    // === 1. Функціональність перемикача тем (без змін) ===
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // === 2. Функціональність галереї фактів (без змін) ===
    const facts = [
        "Хоча Людовик XVIII був королем, реальну владу обмежувала Конституційна хартія 1814 року.",
        "Під час Реставрації знову було введено у вжиток білий прапор Бурбонів замість триколору.",
        "Період 1815 року відомий як 'Білий терор' — це були репресії проти тих, хто підтримував Наполеона.",
        "Після Липневої революції 1830 року влада перейшла не до республіканців, а до поміркованого монарха Луї-Філіппа Орлеанського.",
        "Липнева революція в Парижі була такою стрімкою, що Карл X не встиг належним чином мобілізувати свої війська."
    ];
    let currentFactIndex = -1; 
    const factDisplay = document.getElementById('current-fact');
    const nextFactBtn = document.getElementById('next-fact-btn');

    nextFactBtn.addEventListener('click', () => {
        currentFactIndex = (currentFactIndex + 1) % facts.length; 
        factDisplay.textContent = facts[currentFactIndex];
    });

    // === 3. Функціональність Тест-Драйву (ОНОВЛЕНО) ===
    const quizForm = document.getElementById('history-quiz');
    const quizResult = document.getElementById('quiz-result');
    const scoreElement = document.getElementById('score');
    const gradeMessage = document.getElementById('grade-message');
    const resetQuizBtn = document.getElementById('reset-quiz');

    // Ключі правильних відповідей (Додано q5)
    const correctAnswers = {
        q1: 'c', // 1814
        q2: 'b', // Конституційна хартія 1814 року
        q3: 'd', // Карл X
        q4: 'b', // Липнева революція 1830 року
        q5: 'c'  // Білий прапор Бурбонів
    };

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Запобігаємо стандартній відправці форми
        
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length; // Тепер це 5

        // Перевіряємо кожне питання
        for (const question in correctAnswers) {
            const selected = quizForm.elements[question].value;
            if (selected === correctAnswers[question]) {
                score++;
            }
        }

        // Відображення результатів
        scoreElement.textContent = score;
        quizResult.style.display = 'block';

        // Визначаємо повідомлення (Тепер на основі 5 балів)
        let message = '';
        if (score === totalQuestions) {
            message = 'Відмінно! Ви справжній експерт з Реставрації Бурбонів. 🥇';
        } else if (score >= 3) {
            message = 'Добре! Більшість матеріалу засвоєна. Проте, варто повторити деякі моменти. 👍';
        } else {
            message = 'Потрібно більше попрацювати. Перегляньте розділи I та IV ще раз. 📚';
        }
        gradeMessage.textContent = message;

        // Блокуємо кнопку перевірки та позначаємо відповіді
        document.getElementById('submit-quiz').disabled = true;
        highlightAnswers();
    });

    // Функція для підсвічування правильних/неправильних відповідей
    function highlightAnswers() {
        for (const question in correctAnswers) {
            const correctAnswer = correctAnswers[question];
            const quizItem = quizForm.querySelector(`[name="${question}"]`).closest('.quiz-item');

            // Позначаємо всі правильні відповіді зеленим
            quizItem.querySelector(`input[value="${correctAnswer}"]`).parentElement.style.backgroundColor = '#d4edda';

            // Позначаємо вибрану, але неправильну відповідь червоним
            const selected = quizForm.elements[question].value;
            if (selected && selected !== correctAnswer) {
                quizItem.querySelector(`input[value="${selected}"]`).parentElement.style.backgroundColor = '#f8d7da';
            }

            // Блокуємо всі радіо-кнопки
            quizItem.querySelectorAll('input[type="radio"]').forEach(input => input.disabled = true);
        }
    }

    // Функціональність для скидання тесту
    resetQuizBtn.addEventListener('click', () => {
        quizForm.reset();
        quizResult.style.display = 'none';
        document.getElementById('submit-quiz').disabled = false;
        
        // Очищаємо підсвічування та розблоковуємо кнопки
        quizForm.querySelectorAll('.quiz-item label').forEach(label => {
            label.style.backgroundColor = 'transparent';
        });
        quizForm.querySelectorAll('input[type="radio"]').forEach(input => input.disabled = false);
    });
});