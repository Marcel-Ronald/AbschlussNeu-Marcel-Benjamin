import React, { useState } from "react";

const SharkQuiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
    {
      question: "Welcher Hai ist der größte Fisch der Welt?",
      options: ["Weißer Hai", "Walhai", "Tigerhai", "Grönlandhai"],
      correct: 1,
    },
    {
      question: "Wie alt kann ein Grönlandhai werden?",
      options: ["50 Jahre", "100 Jahre", "250 Jahre", "Über 500 Jahre"],
      correct: 3,
    },
    {
      question: "Welcher Hai ist der schnellste?",
      options: ["Weißer Hai", "Kurzflossen-Mako", "Tigerhai", "Hammerhai"],
      correct: 1,
    },
    {
      question: "Was fressen Walhaie hauptsächlich?",
      options: ["Robben", "Plankton", "Andere Haie", "Delfine"],
      correct: 1,
    },
    {
      question: "Welcher Hai hat einen hammerförmigen Kopf?",
      options: ["Tigerhai", "Hammerhai", "Blauhai", "Bullenhai"],
      correct: 1,
    },
    {
      question: "Welcher Hai gilt als einer der gefährlichsten für Menschen?",
      options: ["Walhai", "Riesenhai", "Weißer Hai", "Katzenhai"],
      correct: 2,
    },
    {
      question: "Aus was besteht das Skelett eines Hais?",
      options: ["Knochen", "Knorpel", "Muskeln", "Chitin"],
      correct: 1,
    },
    {
      question: "Wie viele Zähne verliert ein Hai in seinem Leben ungefähr?",
      options: ["100", "1.000", "10.000", "30.000"],
      correct: 3,
    },
    {
      question: "Welcher Hai kann in Süßwasser leben?",
      options: ["Weißer Hai", "Bullenhai", "Tigerhai", "Hammerhai"],
      correct: 1,
    },
    {
      question: "Seit wie vielen Jahren gibt es Haie?",
      options: [
        "50 Millionen Jahre",
        "150 Millionen Jahre",
        "300 Millionen Jahre",
        "450 Millionen Jahre",
      ],
      correct: 3,
    },
    {
      question: "Welcher Hai lebt in der Tiefsee?",
      options: ["Koboldhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Was macht der Fuchshai mit seinem langen Schwanz?",
      options: ["Schwimmen", "Beute betäuben", "Kommunizieren", "Verteidigung"],
      correct: 1,
    },
    {
      question: "Welcher Hai filtert seine Nahrung aus dem Wasser?",
      options: ["Tigerhai", "Riesenhai", "Bullenhai", "Blauhai"],
      correct: 1,
    },
    {
      question: "Wie schnell kann der Kurzflossen-Mako schwimmen?",
      options: ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
      correct: 2,
    },
    {
      question: "Welcher Hai wird auch 'Mülleimer des Meeres' genannt?",
      options: ["Weißer Hai", "Tigerhai", "Walhai", "Hammerhai"],
      correct: 1,
    },
  ];

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers([]);
  };

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;

    setUserAnswers([
      ...userAnswers,
      {
        question: questions[currentQuestion].question,
        userAnswer: selectedAnswer,
        correctAnswer: questions[currentQuestion].correct,
        isCorrect: isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers([]);
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-start">
          <h1 className="quiz-start-title">🎯 Hai-Quiz</h1>
          <p className="quiz-start-description">
            Teste dein Wissen über Haie! Beantworte 15 Fragen und zeige, wie gut
            du dich auskennst.
          </p>
          <div className="quiz-info">
            <div className="quiz-info-item">
              <span className="quiz-info-icon">📝</span>
              <span>15 Fragen</span>
            </div>
            <div className="quiz-info-item">
              <span className="quiz-info-icon">⏱️</span>
              <span>Keine Zeitbegrenzung</span>
            </div>
            <div className="quiz-info-item">
              <span className="quiz-info-icon">🏆</span>
              <span>Sofortiges Feedback</span>
            </div>
          </div>
          <button className="btn-quiz-start" onClick={startQuiz}>
            Quiz starten
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let resultMessage = "";
    let resultEmoji = "";

    if (percentage >= 90) {
      resultMessage = "Ausgezeichnet! Du bist ein echter Hai-Experte! 🎓";
      resultEmoji = "🏆";
    } else if (percentage >= 70) {
      resultMessage = "Sehr gut! Du kennst dich super mit Haien aus! 👏";
      resultEmoji = "⭐";
    } else if (percentage >= 50) {
      resultMessage = "Gut gemacht! Du hast solides Hai-Wissen! 👍";
      resultEmoji = "✨";
    } else {
      resultMessage =
        "Nicht schlecht! Es gibt noch viel zu lernen über Haie! 📚";
      resultEmoji = "💪";
    }

    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <div className="result-emoji">{resultEmoji}</div>
          <h1 className="result-title">Quiz beendet!</h1>
          <div className="result-score">
            <div className="score-circle">
              <div className="score-number">{score}</div>
              <div className="score-total">von {questions.length}</div>
            </div>
            <div className="score-percentage">{percentage}%</div>
          </div>
          <p className="result-message">{resultMessage}</p>

          <div className="result-answers">
            <h2>Deine Antworten:</h2>
            {userAnswers.map((answer, index) => (
              <div
                key={index}
                className={`answer-review ${
                  answer.isCorrect ? "correct" : "incorrect"
                }`}
              >
                <div className="answer-review-header">
                  <span className="answer-number">Frage {index + 1}</span>
                  <span className="answer-status">
                    {answer.isCorrect ? "✓ Richtig" : "✗ Falsch"}
                  </span>
                </div>
                <div className="answer-question">{answer.question}</div>
                {!answer.isCorrect && (
                  <div className="answer-correction">
                    <span className="your-answer">
                      Deine Antwort:{" "}
                      {questions[index].options[answer.userAnswer]}
                    </span>
                    <span className="correct-answer">
                      Richtig: {questions[index].options[answer.correctAnswer]}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="btn-quiz-restart" onClick={restartQuiz}>
            Nochmal versuchen
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="quiz-content">
        <div className="quiz-header">
          <span className="quiz-question-number">
            Frage {currentQuestion + 1} von {questions.length}
          </span>
          <span className="quiz-current-score">Score: {score}</span>
        </div>

        <h2 className="quiz-question">{questions[currentQuestion].question}</h2>

        <div className="quiz-options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${
                selectedAnswer === index ? "selected" : ""
              }`}
              onClick={() => handleAnswerClick(index)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        <button
          className="btn-quiz-next"
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          {currentQuestion < questions.length - 1
            ? "Nächste Frage"
            : "Quiz beenden"}
        </button>
      </div>
    </div>
  );
};

export default SharkQuiz;
