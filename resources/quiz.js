// Quiz questions data
const quizData = {
    beginner: {
        title: "RTI Basics Quiz",
        questions: [
            {
                question: "What does RTI stand for?",
                options: [
                    "Right to Information",
                    "Right to Internet",
                    "Right to Investigation",
                    "Right to Interpretation"
                ],
                correct: 0
            },
            {
                question: "In which year was the RTI Act enacted in India?",
                options: [
                    "2000",
                    "2003",
                    "2005",
                    "2007"
                ],
                correct: 2
            },
            {
                question: "What is the time limit for providing information under RTI?",
                options: [
                    "10 days",
                    "20 days",
                    "30 days",
                    "45 days"
                ],
                correct: 2
            }
        ]
    },
    intermediate: {
        title: "Education RTI Quiz",
        questions: [
            {
                question: "Which section of the RTI Act deals with exemptions from disclosure?",
                options: [
                    "Section 4",
                    "Section 7",
                    "Section 8",
                    "Section 10"
                ],
                correct: 2
            },
            {
                question: "What is the fee for filing an RTI application?",
                options: [
                    "₹5",
                    "₹10",
                    "₹20",
                    "₹50"
                ],
                correct: 1
            },
            {
                question: "Who can file an RTI application?",
                options: [
                    "Only Indian citizens",
                    "Any person residing in India",
                    "Only government employees",
                    "Only adults above 18"
                ],
                correct: 0
            }
        ]
    },
    advanced: {
        title: "RTI Expert Quiz",
        questions: [
            {
                question: "What is the penalty for delay in providing information under RTI?",
                options: [
                    "₹100 per day",
                    "₹250 per day",
                    "₹500 per day",
                    "₹1000 per day"
                ],
                correct: 1
            },
            {
                question: "Which of these is NOT a valid reason for rejection of RTI application?",
                options: [
                    "National security",
                    "Personal information",
                    "Cabinet papers",
                    "Administrative inconvenience"
                ],
                correct: 3
            },
            {
                question: "What is the time limit for filing first appeal under RTI?",
                options: [
                    "15 days",
                    "30 days",
                    "45 days",
                    "60 days"
                ],
                correct: 1
            }
        ]
    }
};

class Quiz {
    constructor(level) {
        this.level = level;
        this.quizData = quizData[level];
        this.currentQuestion = 0;
        this.score = 0;
        this.container = document.createElement('div');
        this.container.className = 'quiz-container';
    }

    start() {
        // Clear existing content
        const contentSection = document.querySelector('.content-section .container');
        contentSection.innerHTML = '';
        contentSection.appendChild(this.container);
        
        // Show first question
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestion >= this.quizData.questions.length) {
            this.showResults();
            return;
        }

        const question = this.quizData.questions[this.currentQuestion];
        
        this.container.innerHTML = `
            <div class="quiz-header">
                <h2>${this.quizData.title}</h2>
                <div class="quiz-progress">
                    Question ${this.currentQuestion + 1} of ${this.quizData.questions.length}
                </div>
            </div>
            <div class="quiz-content">
                <div class="question">
                    <h3>${question.question}</h3>
                    <div class="options">
                        ${question.options.map((option, index) => `
                            <button class="option-btn" data-index="${index}">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Add event listeners to options
        const options = this.container.querySelectorAll('.option-btn');
        options.forEach(option => {
            option.addEventListener('click', () => {
                this.checkAnswer(parseInt(option.dataset.index));
            });
        });
    }

    checkAnswer(selectedIndex) {
        const question = this.quizData.questions[this.currentQuestion];
        const options = this.container.querySelectorAll('.option-btn');
        
        // Disable all options
        options.forEach(option => {
            option.disabled = true;
            option.classList.add('disabled');
        });

        // Show correct/incorrect
        options[selectedIndex].classList.add(
            selectedIndex === question.correct ? 'correct' : 'incorrect'
        );
        options[question.correct].classList.add('correct');

        // Update score
        if (selectedIndex === question.correct) {
            this.score++;
        }

        // Show next question after delay
        setTimeout(() => {
            this.currentQuestion++;
            this.showQuestion();
        }, 1500);
    }

    showResults() {
        const percentage = (this.score / this.quizData.questions.length) * 100;
        const passed = percentage >= 60;

        this.container.innerHTML = `
            <div class="quiz-results">
                <h2>Quiz Complete!</h2>
                <div class="score-display">
                    <div class="score-circle ${passed ? 'passed' : 'failed'}">
                        ${percentage}%
                    </div>
                    <p>You got ${this.score} out of ${this.quizData.questions.length} questions correct</p>
                </div>
                <div class="result-message">
                    ${passed 
                        ? `<p>Congratulations! You've passed the ${this.level} level quiz!</p>`
                        : `<p>Keep practicing! Try the quiz again to improve your score.</p>`
                    }
                </div>
                <div class="result-actions">
                    <button class="retry-btn" onclick="new Quiz('${this.level}').start()">
                        Try Again
                    </button>
                    <a href="quizzes.html" class="back-btn">
                        Back to Quizzes
                    </a>
                </div>
            </div>
        `;

        // Update achievements if passed
        if (passed) {
            this.updateAchievements();
        }
    }

    updateAchievements() {
        const badges = document.querySelectorAll('.badge-card');
        badges.forEach(badge => {
            if (badge.querySelector('h4').textContent.toLowerCase().includes(this.level)) {
                badge.classList.remove('locked');
            }
        });
    }
} 