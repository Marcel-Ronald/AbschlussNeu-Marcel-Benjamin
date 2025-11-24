import React, { useState, useEffect } from "react";

const SharkQuiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const allQuestions = [
    {
      question: "Welcher Hai ist der größte Fisch der Welt?",
      options: ["Weißer Hai", "Walhai", "Tigerhai", "Grönlandhai"],
      correct: "Walhai",
    },
    {
      question: "Wie alt kann ein Grönlandhai werden?",
      options: ["50 Jahre", "100 Jahre", "250 Jahre", "Über 500 Jahre"],
      correct: "Über 500 Jahre",
    },
    {
      question: "Welcher Hai ist der schnellste?",
      options: ["Weißer Hai", "Kurzflossen-Mako", "Tigerhai", "Hammerhai"],
      correct: "Kurzflossen-Mako",
    },
    {
      question: "Was fressen Walhaie hauptsächlich?",
      options: ["Robben", "Plankton", "Andere Haie", "Delfine"],
      correct: "Plankton",
    },
    {
      question: "Welcher Hai hat einen hammerförmigen Kopf?",
      options: ["Tigerhai", "Hammerhai", "Blauhai", "Bullenhai"],
      correct: "Hammerhai",
    },
    {
      question: "Welcher Hai gilt als einer der gefährlichsten für Menschen?",
      options: ["Walhai", "Riesenhai", "Weißer Hai", "Katzenhai"],
      correct: "Weißer Hai",
    },
    {
      question: "Aus was besteht das Skelett eines Hais?",
      options: ["Knochen", "Knorpel", "Muskeln", "Chitin"],
      correct: "Knorpel",
    },
    {
      question: "Wie viele Zähne verliert ein Hai in seinem Leben ungefähr?",
      options: ["100", "1.000", "10.000", "30.000"],
      correct: "30.000",
    },
    {
      question: "Welcher Hai kann in Süßwasser leben?",
      options: ["Weißer Hai", "Bullenhai", "Tigerhai", "Hammerhai"],
      correct: "Bullenhai",
    },
    {
      question: "Seit wie vielen Jahren gibt es Haie?",
      options: [
        "50 Millionen Jahre",
        "150 Millionen Jahre",
        "300 Millionen Jahre",
        "450 Millionen Jahre",
      ],
      correct: "450 Millionen Jahre",
    },
    {
      question: "Welcher Hai lebt in der Tiefsee?",
      options: ["Koboldhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: "Koboldhai",
    },
    {
      question: "Was macht der Fuchshai mit seinem langen Schwanz?",
      options: ["Schwimmen", "Beute betäuben", "Kommunizieren", "Verteidigung"],
      correct: "Beute betäuben",
    },
    {
      question: "Welcher Hai filtert seine Nahrung aus dem Wasser?",
      options: ["Tigerhai", "Riesenhai", "Bullenhai", "Blauhai"],
      correct: "Riesenhai",
    },
    {
      question: "Wie schnell kann der Kurzflossen-Mako schwimmen?",
      options: ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
      correct: "60 km/h",
    },
    {
      question: "Welcher Hai wird auch 'Mülleimer des Meeres' genannt?",
      options: ["Weißer Hai", "Tigerhai", "Walhai", "Hammerhai"],
      correct: "Tigerhai",
    },
    {
      question: "Wie viele Kiemenspalten hat ein typischer Hai?",
      options: ["3", "5", "7", "10"],
      correct: "5",
    },
    {
      question: "Welcher Hai kann über 400 Jahre alt werden?",
      options: ["Weißer Hai", "Grönlandhai", "Walhai", "Riesenhai"],
      correct: "Grönlandhai",
    },
    {
      question: "Was nutzt der Hammerhai seinen speziellen Kopf hauptsächlich?",
      options: ["Zum Kämpfen", "Als Sensor", "Zum Graben", "Zur Kommunikation"],
      correct: "Als Sensor",
    },
    {
      question: "Welcher Hai ist nachtaktiv und ruht tagsüber in Höhlen?",
      options: ["Weißer Hai", "Weißspitzen-Riffhai", "Walhai", "Blauhai"],
      correct: "Weißspitzen-Riffhai",
    },
    {
      question: "Wie lang kann ein Walhai werden?",
      options: ["6 Meter", "12 Meter", "18 Meter", "24 Meter"],
      correct: "18 Meter",
    },
    {
      question: "Welcher Hai hat biolumineszente (leuchtende) Eigenschaften?",
      options: ["Laternhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: "Laternhai",
    },
    {
      question: "Was ist die Hauptnahrung des Riesenhais?",
      options: ["Robben", "Plankton", "Fische", "Tintenfische"],
      correct: "Plankton",
    },
    {
      question: "Welcher Hai gilt als 'lebendes Fossil'?",
      options: ["Kragenhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: "Kragenhai",
    },
    {
      question: "Wie viele Haiarten gibt es weltweit ungefähr?",
      options: ["100", "250", "500", "1000"],
      correct: "500",
    },
    {
      question: "Welcher Hai springt am häufigsten aus dem Wasser?",
      options: ["Spinner-Hai", "Walhai", "Riesenhai", "Grönlandhai"],
      correct: "Spinner-Hai",
    },
    {
      question: "Was ist besonders am Zebrahai?",
      options: [
        "Er ist giftig",
        "Wunderschöne Musterung",
        "Er kann fliegen",
        "Er ist der kleinste Hai",
      ],
      correct: "Wunderschöne Musterung",
    },
    {
      question: "Welcher Hai kann an Land überleben?",
      options: ["Bambushai", "Weißer Hai", "Tigerhai", "Walhai"],
      correct: "Bambushai",
    },
    {
      question: "Wie nennt man die Bewegungsart der Haie?",
      options: ["Galoppieren", "Schlängeln", "Wellenförmig", "Paddeln"],
      correct: "Wellenförmig",
    },
    {
      question: "Welcher Hai hat die längste Lebenserwartung?",
      options: ["Grönlandhai", "Weißer Hai", "Walhai", "Tigerhai"],
      correct: "Grönlandhai",
    },
    {
      question: "Was macht den Sägerochen besonders?",
      options: ["Sägenartige Schnauze", "Runde Form", "Flügel", "Gift"],
      correct: "Sägenartige Schnauze",
    },
  ];

  // Fisher-Yates Shuffle Algorithmus
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = () => {
    // Wähle 20 zufällige Fragen aus
    const randomQuestions = shuffleArray(allQuestions).slice(0, 20);
    setShuffledQuestions(randomQuestions);

    // Shuffle die Antworten für jede Frage
    const questionsWithShuffledOptions = randomQuestions.map((q) => {
      const shuffled = shuffleArray(q.options);
      return {
        ...q,
        shuffledOptions: shuffled,
        correctAnswer: q.correct,
      };
    });

    setShuffledOptions(questionsWithShuffledOptions);
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
    const currentQ = shuffledOptions[currentQuestion];
    const selectedOption = currentQ.shuffledOptions[selectedAnswer];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    setUserAnswers([
      ...userAnswers,
      {
        question: currentQ.question,
        userAnswer: selectedOption,
        correctAnswer: currentQ.correctAnswer,
        isCorrect: isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < shuffledOptions.length - 1) {
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
    setShuffledQuestions([]);
    setShuffledOptions([]);
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-start">
          <h1 className="quiz-start-title">🎯 Hai-Quiz</h1>
          <p className="quiz-start-description">
            Teste dein Wissen über Haie! Beantworte 20 zufällige Fragen und
            zeige, wie gut du dich auskennst.
          </p>
          <div className="quiz-info">
            <div className="quiz-info-item">
              <span className="quiz-info-icon">📝</span>
              <span>20 zufällige Fragen</span>
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
    const percentage = Math.round((score / shuffledOptions.length) * 100);
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
              <div className="score-total">von {shuffledOptions.length}</div>
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
                      Deine Antwort: {answer.userAnswer}
                    </span>
                    <span className="correct-answer">
                      Richtig: {answer.correctAnswer}
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

  const progress = ((currentQuestion + 1) / shuffledOptions.length) * 100;

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
            Frage {currentQuestion + 1} von {shuffledOptions.length}
          </span>
          <span className="quiz-current-score">Score: {score}</span>
        </div>

        <h2 className="quiz-question">
          {shuffledOptions[currentQuestion].question}
        </h2>

        <div className="quiz-options">
          {shuffledOptions[currentQuestion].shuffledOptions.map(
            (option, index) => (
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
            )
          )}
        </div>

        <button
          className="btn-quiz-next"
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          {currentQuestion < shuffledOptions.length - 1
            ? "Nächste Frage"
            : "Quiz beenden"}
        </button>
      </div>
    </div>
  );
};

export default SharkQuiz;
