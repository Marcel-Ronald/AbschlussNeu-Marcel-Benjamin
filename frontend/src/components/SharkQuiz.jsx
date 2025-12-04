import React, { useState, useEffect, useRef } from "react";

const SharkQuiz = () => {
  const [showNameInput, setShowNameInput] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const quizContentRef = useRef(null);

  // Load leaderboard from localStorage on component mount
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem("sharkQuizLeaderboard");
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (quizStarted && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isTimeUp) {
      setIsTimeUp(true);
      handleTimeUp();
    }
  }, [timeLeft, quizStarted, showResult]);

  // Reset timer when question changes
  useEffect(() => {
    if (quizStarted && !showResult) {
      setTimeLeft(15);
      setIsTimeUp(false);
      // Scroll to top of quiz content
      if (quizContentRef.current) {
        quizContentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [currentQuestion]);

  const handleTimeUp = () => {
    // Auto-proceed to next question when time is up
    const isCorrect = false; // Time up counts as wrong answer

    setUserAnswers([
      ...userAnswers,
      {
        question: shuffledQuestions[currentQuestion].question,
        userAnswer: null,
        correctAnswer: shuffledQuestions[currentQuestion].correct,
        isCorrect: false,
        timeUp: true,
      },
    ]);

    if (currentQuestion < shuffledQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      }, 500);
    } else {
      const percentage = Math.round((score / shuffledQuestions.length) * 100);
      saveScore(playerName, score, percentage);
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }
  };

  // Save score to leaderboard
  const saveScore = (name, finalScore, percentage) => {
    const newEntry = {
      name: name,
      score: finalScore,
      totalQuestions: shuffledQuestions.length,
      percentage: percentage,
      date: new Date().toISOString(),
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score || b.percentage - a.percentage)
      .slice(0, 10); // Keep top 10

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem(
      "sharkQuizLeaderboard",
      JSON.stringify(updatedLeaderboard)
    );
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setShowNameInput(false);
    }
  };

  const allQuestions = [
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
    {
      question: "Wie viele Haiarten gibt es weltweit ungefähr?",
      options: ["50", "150", "500", "1000"],
      correct: 2,
    },
    {
      question: "Welcher Hai hat die stärkste Beißkraft?",
      options: ["Weißer Hai", "Tigerhai", "Bullenhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Was nutzen Haie hauptsächlich zur Orientierung?",
      options: ["Sehsinn", "Gehör", "Elektrorezeption", "Geruchssinn"],
      correct: 2,
    },
    {
      question: "Welcher Hai kann seine Körpertemperatur regulieren?",
      options: ["Walhai", "Weißer Hai", "Riesenhai", "Katzenhai"],
      correct: 1,
    },
    {
      question: "Wie viele Kiemenspalten haben die meisten Haie?",
      options: ["3", "5", "7", "9"],
      correct: 1,
    },
    {
      question: "Welcher Hai leuchtet im Dunkeln?",
      options: ["Laternenhai", "Weißer Hai", "Walhai", "Tigerhai"],
      correct: 0,
    },
    {
      question: "Wie groß kann ein Weißer Hai werden?",
      options: ["3 Meter", "4 Meter", "6 Meter", "10 Meter"],
      correct: 2,
    },
    {
      question: "Welcher Hai hat die längste Schwangerschaft?",
      options: ["Weißer Hai", "Grönlandhai", "Dornhai", "Tigerhai"],
      correct: 2,
    },
    {
      question: "Wie viele Reihen Zähne hat ein Hai?",
      options: ["1-2", "3-5", "5-15", "20-30"],
      correct: 2,
    },
    {
      question: "Welcher Hai ist am kleinsten?",
      options: ["Zwerghai", "Laternenhai", "Katzenhai", "Engelhai"],
      correct: 0,
    },
    {
      question: "Können Haie Krebs bekommen?",
      options: [
        "Ja, sehr häufig",
        "Ja, aber sehr selten",
        "Nein, niemals",
        "Nur im Alter",
      ],
      correct: 1,
    },
    {
      question: "Welcher Hai springt aus dem Wasser beim Jagen?",
      options: ["Weißer Hai", "Walhai", "Riesenhai", "Grönlandhai"],
      correct: 0,
    },
    {
      question: "Wie weit kann ein Hai Blut im Wasser riechen?",
      options: ["10 Meter", "100 Meter", "500 Meter", "Mehrere Kilometer"],
      correct: 3,
    },
    {
      question: "Welcher Hai hat eine sägeförmige Schnauze?",
      options: ["Sägehai", "Hammerhai", "Tigerhai", "Koboldhai"],
      correct: 0,
    },
    {
      question: "Müssen Haie ständig schwimmen, um zu atmen?",
      options: [
        "Alle Haie müssen",
        "Kein Hai muss",
        "Nur einige Arten müssen",
        "Nur junge Haie müssen",
      ],
      correct: 2,
    },
    {
      question: "Welcher Hai wurde schon vor 400 Millionen Jahren geboren?",
      options: ["Megalodon", "Weißer Hai", "Stachelhai", "Hybodus"],
      correct: 2,
    },
    {
      question:
        "Wie viele Menschen sterben jährlich durch Haiangriffe weltweit?",
      options: ["Etwa 5-10", "Etwa 50-100", "Etwa 500-1000", "Über 5000"],
      correct: 0,
    },
    {
      question: "Welcher Hai hat giftige Stacheln?",
      options: ["Dornhai", "Tigerhai", "Hammerhai", "Blauhai"],
      correct: 0,
    },
    {
      question: "Können Haie rückwärts schwimmen?",
      options: [
        "Ja, alle Arten",
        "Ja, aber nur wenige",
        "Nein",
        "Nur im Salzwasser",
      ],
      correct: 2,
    },
    {
      question: "Welcher Hai hat die größten Augen?",
      options: ["Weißer Hai", "Riesenhai", "Riesenmaulhai", "Tigerhai"],
      correct: 2,
    },
    {
      question: "Wie viele Herzschläge pro Minute hat ein ruhender Hai?",
      options: ["10-20", "30-40", "60-80", "100-120"],
      correct: 1,
    },
    {
      question: "Welcher Hai hat eine rosa Färbung?",
      options: ["Rosa Laternenhai", "Weißer Hai", "Walhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Können Haie ihr Gebiss regenerieren?",
      options: [
        "Nein",
        "Nur einmal",
        "Ja, ständig",
        "Nur bis zum 10. Lebensjahr",
      ],
      correct: 2,
    },
    {
      question: "Welcher Hai ist für elektrische Felder am empfindlichsten?",
      options: ["Hammerhai", "Weißer Hai", "Tigerhai", "Walhai"],
      correct: 0,
    },
    {
      question: "Wie lange dauert die Schwangerschaft bei einem Weißen Hai?",
      options: ["6 Monate", "11 Monate", "18 Monate", "24 Monate"],
      correct: 2,
    },
    {
      question: "Welcher ausgestorbene Hai war der größte Hai aller Zeiten?",
      options: ["Megalodon", "Hybodus", "Stethacanthus", "Xenacanthus"],
      correct: 0,
    },
    {
      question:
        "Wie viele Liter Wasser fließen pro Stunde durch die Kiemen eines Walhaies?",
      options: ["100 Liter", "1.000 Liter", "6.000 Liter", "20.000 Liter"],
      correct: 2,
    },
    {
      question: "Welcher Hai kann an Land überleben?",
      options: ["Epaulettenhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Wie dick ist die Haut eines Walhaies?",
      options: ["1 cm", "5 cm", "10 cm", "20 cm"],
      correct: 2,
    },
    {
      question: "Welcher Hai hat die längsten Zähne?",
      options: [
        "Weißer Hai",
        "Tigerhai",
        "Koboldhai",
        "Megalodon (ausgestorben)",
      ],
      correct: 3,
    },
    {
      question: "Wie viele Jungtiere kann ein Tigerhai gebären?",
      options: ["2-5", "10-20", "30-50", "80-100"],
      correct: 2,
    },
    {
      question: "Welcher Hai wird auch 'lebende Fossilien' genannt?",
      options: ["Kragenhai", "Weißer Hai", "Walhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Haben Haie eine Schwimmblase?",
      options: ["Ja, alle", "Nur große Arten", "Nein", "Nur Walhaie"],
      correct: 2,
    },
    {
      question: "Welcher Hai wurde nach einem Werkzeug benannt?",
      options: ["Hammerhai", "Sägehai", "Fuchshai", "Alle drei"],
      correct: 3,
    },
    {
      question: "Wie alt werden die meisten Haiarten durchschnittlich?",
      options: ["10-20 Jahre", "20-30 Jahre", "30-50 Jahre", "100+ Jahre"],
      correct: 1,
    },
    {
      question: "Welcher Hai hat die beste Tarnung?",
      options: ["Teppichhai", "Weißer Hai", "Hammerhai", "Walhai"],
      correct: 0,
    },
    {
      question: "Wie viele Sinne hat ein Hai?",
      options: ["5", "6", "7", "8"],
      correct: 2,
    },
    {
      question: "Welcher Hai wird auch Sandtigerhai genannt?",
      options: ["Grauhai", "Bullenhai", "Zitronenhai", "Tigerhai"],
      correct: 0,
    },
    {
      question: "Können Haie schlafen?",
      options: [
        "Nein, niemals",
        "Ja, wie Menschen",
        "Ja, aber nur halbes Gehirn",
        "Nur im Alter",
      ],
      correct: 2,
    },
    {
      question: "Welcher Hai lebt am tiefsten?",
      options: [
        "Pazifischer Schlafhai",
        "Grönlandhai",
        "Koboldhai",
        "Portugiesischer Dornhai",
      ],
      correct: 3,
    },
    {
      question: "Wie viele Flossen hat ein typischer Hai?",
      options: ["5", "6", "7", "8"],
      correct: 3,
    },
    {
      question: "Welcher Hai ist für seine Sprünge bekannt?",
      options: ["Spinner-Hai", "Walhai", "Riesenhai", "Grönlandhai"],
      correct: 0,
    },
    {
      question: "Was bedeutet 'Selachii' (wissenschaftlicher Name für Haie)?",
      options: ["Jäger", "Meeresräuber", "Knorpelfisch", "Großer Fisch"],
      correct: 2,
    },
    {
      question: "Welcher Hai hat biolumineszierende Eigenschaften?",
      options: ["Laternenhai", "Weißer Hai", "Hammerhai", "Walhai"],
      correct: 0,
    },
    {
      question: "Wie weit kann ein Hai unter Wasser sehen?",
      options: ["5 Meter", "15 Meter", "30 Meter", "100 Meter"],
      correct: 1,
    },
    {
      question: "Welcher Hai hat die meisten Jungtiere pro Wurf?",
      options: ["Weißer Hai", "Blauhai", "Tigerhai", "Hammerhai"],
      correct: 1,
    },
    {
      question: "Haben Haie Augenlider?",
      options: [
        "Ja, alle",
        "Nein, keine",
        "Nur Weiße Haie",
        "Nur eine Nickhaut",
      ],
      correct: 3,
    },
    {
      question: "Welcher Hai frisst hauptsächlich Quallen?",
      options: ["Riesenhai", "Blauhai", "Grönlandhai", "Tigerhai"],
      correct: 1,
    },
    {
      question: "Wie schnell wachsen Haizähne nach?",
      options: ["1 Tag", "1 Woche", "1 Monat", "1 Jahr"],
      correct: 1,
    },
    {
      question: "Welcher Hai wird auch 'Bulldoggenhai' genannt?",
      options: ["Bullenhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Können Haie Farben sehen?",
      options: [
        "Ja, alle Farben",
        "Nein, nur Grautöne",
        "Nur Blau und Grün",
        "Nur Rot",
      ],
      correct: 2,
    },
    {
      question: "Welcher Hai hat den größten Lebensraum?",
      options: ["Weißer Hai", "Blauhai", "Tigerhai", "Hammerhai"],
      correct: 1,
    },
    {
      question: "Wie viele Arten von Hammerhaien gibt es?",
      options: ["3", "6", "9", "12"],
      correct: 2,
    },
    {
      question: "Welcher Hai wird in Aquarien am häufigsten gehalten?",
      options: [
        "Schwarzspitzen-Riffhai",
        "Weißer Hai",
        "Tigerhai",
        "Hammerhai",
      ],
      correct: 0,
    },
    {
      question: "Haben Haie eine Zunge?",
      options: [
        "Nein",
        "Ja, wie Menschen",
        "Ja, aber ohne Muskeln",
        "Nur Walhaie",
      ],
      correct: 2,
    },
    {
      question: "Welcher Hai kann am längsten ohne Nahrung überleben?",
      options: ["Grönlandhai", "Weißer Hai", "Tigerhai", "Walhai"],
      correct: 0,
    },
    {
      question: "Wie viel Prozent der Haiarten sind für Menschen gefährlich?",
      options: ["Weniger als 5%", "10-20%", "30-40%", "Über 50%"],
      correct: 0,
    },
    {
      question: "Welcher Hai hat die dickste Haut?",
      options: ["Walhai", "Weißer Hai", "Tigerhai", "Grönlandhai"],
      correct: 0,
    },
    {
      question: "Können Haie Geräusche machen?",
      options: [
        "Nein, sie sind stumm",
        "Ja, sie brüllen",
        "Ja, sie knurren",
        "Nur Jungtiere",
      ],
      correct: 0,
    },
    {
      question: "Welcher Hai lebt in Korallenriffen?",
      options: ["Riffhai", "Grönlandhai", "Eishai", "Fuchshai"],
      correct: 0,
    },
    {
      question: "Wie alt kann ein Walhai werden?",
      options: ["50 Jahre", "70 Jahre", "100 Jahre", "150 Jahre"],
      correct: 2,
    },
    {
      question: "Welcher Hai wird auch 'Blauhai' genannt?",
      options: ["Prionace glauca", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Haben Haie Ohren?",
      options: [
        "Nein",
        "Ja, äußere Ohren",
        "Ja, innere Ohren",
        "Nur Seitenlinien",
      ],
      correct: 2,
    },
    {
      question: "Welcher Hai hat den stärksten Geruchssinn?",
      options: ["Weißer Hai", "Hammerhai", "Tigerhai", "Alle gleich"],
      correct: 1,
    },
    {
      question: "Wie viele Zahnreihen hat ein Hai gleichzeitig?",
      options: ["2-3", "5-15", "20-30", "50+"],
      correct: 1,
    },
    {
      question: "Welcher Hai ist am wenigsten erforscht?",
      options: ["Tiefseehaie", "Weißer Hai", "Walhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Können Haie Elektrizität erzeugen?",
      options: [
        "Nein, nur wahrnehmen",
        "Ja, wie Zitteraale",
        "Nur Rochen",
        "Nur im Notfall",
      ],
      correct: 0,
    },
    {
      question: "Welcher Hai hat die längste Wanderung?",
      options: ["Weißer Hai", "Blauhai", "Walhai", "Grönlandhai"],
      correct: 0,
    },
    {
      question: "Wie viele Haiarten sind bereits ausgestorben?",
      options: ["Weniger als 10", "Etwa 50", "Über 100", "Über 500"],
      correct: 3,
    },
    {
      question: "Welcher Hai wird am ältesten?",
      options: ["Grönlandhai", "Weißer Hai", "Walhai", "Tigerhai"],
      correct: 0,
    },
    {
      question: "Haben Haie ein gutes Gedächtnis?",
      options: [
        "Nein, sehr kurz",
        "Ja, mehrere Monate",
        "Nur Stunden",
        "Nur Minuten",
      ],
      correct: 1,
    },
    {
      question: "Welcher Hai kann seine Augenfarbe ändern?",
      options: ["Keiner", "Weißer Hai", "Hammerhai", "Katzenhai"],
      correct: 0,
    },
    {
      question: "Wie dick sind die Zähne eines Weißen Hais?",
      options: ["3 mm", "7 cm", "15 cm", "30 cm"],
      correct: 1,
    },
    {
      question: "Welcher Hai ist am aktivsten bei Nacht?",
      options: ["Grauhai", "Weißer Hai", "Walhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Können Haie Diabetes bekommen?",
      options: ["Nein", "Ja, häufig", "Nur in Gefangenschaft", "Nur im Alter"],
      correct: 0,
    },
    {
      question: "Welcher Hai hat die meisten Zähne?",
      options: ["Walhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Wie kommunizieren Haie untereinander?",
      options: ["Körpersprache", "Geräusche", "Elektrosignale", "Duftstoffe"],
      correct: 0,
    },
    {
      question: "Welcher Hai hat die größte Beißkraft pro Quadratzentimeter?",
      options: ["Weißer Hai", "Bullenhai", "Tigerhai", "Hammerhai"],
      correct: 1,
    },
    {
      question: "Können Haie erröten?",
      options: ["Nein", "Ja, bei Stress", "Nur Jungtiere", "Nur zur Paarung"],
      correct: 0,
    },
    {
      question: "Welcher Hai wird am häufigsten gejagt?",
      options: ["Blauhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Haben Haie einen Bauchnabel?",
      options: ["Nein", "Ja", "Nur lebendgebärende Arten", "Nur Weibchen"],
      correct: 2,
    },
    {
      question: "Welcher Hai ist am schnellsten in kurzen Sprints?",
      options: ["Kurzflossen-Mako", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Wie viele Haiarten leben ausschließlich in Süßwasser?",
      options: ["0", "1", "5", "10"],
      correct: 2,
    },
    {
      question: "Welcher Hai hat die meisten Farbvariationen?",
      options: ["Katzenhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Können Haie seekrank werden?",
      options: [
        "Nein",
        "Ja, bei Sturm",
        "Nur in Gefangenschaft",
        "Nur Jungtiere",
      ],
      correct: 0,
    },
    {
      question: "Welcher Hai wird auch 'Zitronenhai' genannt?",
      options: ["Negaprion brevirostris", "Gelber Hai", "Goldhai", "Sonnenhai"],
      correct: 0,
    },
    {
      question: "Wie viele Haie werden jährlich von Menschen getötet?",
      options: ["1 Million", "10 Millionen", "100 Millionen", "1 Milliarde"],
      correct: 2,
    },
    {
      question: "Welcher Hai kann am besten klettern?",
      options: ["Epaulettenhai", "Keiner", "Teppichhai", "Bambushai"],
      correct: 0,
    },
    {
      question: "Haben Haie Schweißdrüsen?",
      options: ["Nein", "Ja, viele", "Nur an Flossen", "Nur im Maul"],
      correct: 0,
    },
    {
      question: "Welcher Hai wird am häufigsten in Filmen gezeigt?",
      options: ["Weißer Hai", "Tigerhai", "Hammerhai", "Walhai"],
      correct: 0,
    },
    {
      question: "Können Haie niesen?",
      options: ["Nein", "Ja, oft", "Nur bei Krankheit", "Nur unter Wasser"],
      correct: 0,
    },
    {
      question: "Welcher Hai ist am geselligsten?",
      options: ["Hammerhai", "Weißer Hai", "Tigerhai", "Walhai"],
      correct: 0,
    },
    {
      question: "Wie viele Ampullen von Lorenzini hat ein Hammerhai?",
      options: ["100", "500", "3000", "10000"],
      correct: 2,
    },
    {
      question: "Welcher Hai wird auch 'Engelshai' genannt?",
      options: ["Squatina squatina", "Weißer Hai", "Walhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Können Haie weinen?",
      options: ["Nein", "Ja, Tränen", "Nur bei Schmerz", "Nur Jungtiere"],
      correct: 0,
    },
    {
      question: "Welcher Hai hat den längsten Körper im Verhältnis zum Kopf?",
      options: ["Fuchshai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Wie viele Wirbel hat ein durchschnittlicher Hai?",
      options: ["50", "100", "200", "400"],
      correct: 2,
    },
    {
      question: "Welcher Hai ist am stärksten vom Aussterben bedroht?",
      options: ["Engelhai", "Weißer Hai", "Walhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Haben Haie Speicheldrüsen?",
      options: ["Nein", "Ja, viele", "Nur große Arten", "Nur im Magen"],
      correct: 0,
    },
    {
      question: "Welcher Hai kann am höchsten springen?",
      options: ["Weißer Hai", "Kurzflossen-Mako", "Tigerhai", "Hammerhai"],
      correct: 1,
    },
    {
      question: "Wie viele Haiarten leben in der Arktis?",
      options: ["1", "5", "10", "20"],
      correct: 1,
    },
    {
      question: "Welcher Hai hat die kleinsten Zähne?",
      options: ["Walhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Können Haie lachen?",
      options: ["Nein", "Ja, bei Freude", "Nur sozial", "Nur Jungtiere"],
      correct: 0,
    },
    {
      question: "Welcher Hai wird auch 'Koboldhai' genannt?",
      options: ["Mitsukurina owstoni", "Grünhai", "Geisthai", "Teufelhai"],
      correct: 0,
    },
    {
      question: "Wie viele Haiarten können in Aquarien überleben?",
      options: ["Weniger als 10", "Etwa 20", "Über 50", "Über 100"],
      correct: 1,
    },
    {
      question: "Welcher Hai wird am ältesten in Gefangenschaft?",
      options: ["Sandtigerhai", "Weißer Hai", "Walhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Haben Haie Fingerabdrücke?",
      options: ["Nein", "Ja, auf Haut", "Nur auf Flossen", "Nur auf Zähnen"],
      correct: 0,
    },
    {
      question: "Welcher Hai ist am besten an kaltes Wasser angepasst?",
      options: ["Grönlandhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Wie viele Haiarten sind Pflanzenfresser?",
      options: ["0", "1", "5", "10"],
      correct: 0,
    },
    {
      question: "Welcher Hai hat die längste Schwanzflosse?",
      options: ["Fuchshai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Können Haie hüpfen?",
      options: ["Nein", "Ja, aus dem Wasser", "Nur auf Land", "Nur Jungtiere"],
      correct: 1,
    },
    {
      question:
        "Welcher Hai wird in der Traditionellen Chinesischen Medizin verwendet?",
      options: ["Viele Arten", "Nur Weißer Hai", "Nur Tigerhai", "Keine"],
      correct: 0,
    },
    {
      question:
        "Wie viele Prozent ihres Körpergewichts frisst ein Hai täglich?",
      options: ["1-2%", "5-10%", "15-20%", "30-40%"],
      correct: 0,
    },
    {
      question: "Welcher Hai hat die komplexeste Sozialstruktur?",
      options: ["Hammerhai", "Weißer Hai", "Tigerhai", "Walhai"],
      correct: 0,
    },
    {
      question: "Haben Haie Geschmacksknospen?",
      options: ["Ja, im Maul", "Nein", "Nur auf Zunge", "Überall"],
      correct: 0,
    },
    {
      question: "Welcher Hai wurde zuerst wissenschaftlich beschrieben?",
      options: ["Weißer Hai", "Walhai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Wie viele Haiarten haben Stacheln?",
      options: ["Etwa 100", "Etwa 50", "Etwa 10", "Keine"],
      correct: 0,
    },
    {
      question:
        "Welcher Hai wird am meisten für Haifischflossensuppe verwendet?",
      options: [
        "Viele Arten",
        "Nur Weißer Hai",
        "Nur Hammerhai",
        "Nur Tigerhai",
      ],
      correct: 0,
    },
    {
      question: "Können Haie ihre Hautfarbe ändern?",
      options: [
        "Leicht, bei Stress",
        "Nein, niemals",
        "Ja, wie Chamäleons",
        "Nur nachts",
      ],
      correct: 0,
    },
    {
      question: "Welcher Hai ist am besten an Höhlen angepasst?",
      options: ["Weißspitzen-Riffhai", "Weißer Hai", "Tigerhai", "Hammerhai"],
      correct: 0,
    },
    {
      question: "Wie lange kann ein Hai ohne Sauerstoff überleben?",
      options: ["Sekunden", "Minuten", "Stunden", "Tage"],
      correct: 1,
    },
    {
      question: "Welcher Hai wird auch 'Nurse Shark' (Ammenhai) genannt?",
      options: [
        "Ginglymostoma cirratum",
        "Krankenpflegerhai",
        "Sanfter Hai",
        "Pflegehai",
      ],
      correct: 0,
    },
    {
      question: "Haben Haie eine Gallenblase?",
      options: ["Ja", "Nein", "Nur große Arten", "Nur Fleischfresser"],
      correct: 0,
    },
    {
      question: "Welcher Hai lebt am längsten in einem Aquarium?",
      options: [
        "Schwarzspitzen-Riffhai",
        "Weißer Hai",
        "Tigerhai",
        "Hammerhai",
      ],
      correct: 0,
    },
    {
      question: "Wie viele Haiarten sind nachtaktiv?",
      options: ["Etwa die Hälfte", "Alle", "Wenige", "Keine"],
      correct: 0,
    },
  ];

  // Funktion zum Mischen der Antworten einer Frage
  const shuffleOptions = (question) => {
    const shuffled = [...question.options];
    const correctAnswer = shuffled[question.correct];

    // Fisher-Yates Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Finde den neuen Index der richtigen Antwort
    const newCorrectIndex = shuffled.indexOf(correctAnswer);

    return {
      ...question,
      options: shuffled,
      correct: newCorrectIndex,
    };
  };

  // Funktion zum Auswählen von 30 zufälligen Fragen
  const getRandomQuestions = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 30);
    return selected.map((q) => shuffleOptions(q));
  };

  const startQuiz = () => {
    const randomQuestions = getRandomQuestions();
    setShuffledQuestions(randomQuestions);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers([]);
  };

  const handleAnswerClick = (answerIndex) => {
    if (!isTimeUp && selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNextQuestion = () => {
    if (isTimeUp) return; // Prevent manual next if time is up

    const isCorrect =
      selectedAnswer === shuffledQuestions[currentQuestion].correct;

    setUserAnswers([
      ...userAnswers,
      {
        question: shuffledQuestions[currentQuestion].question,
        userAnswer: selectedAnswer,
        correctAnswer: shuffledQuestions[currentQuestion].correct,
        isCorrect: isCorrect,
        timeUp: false,
      },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      const finalScore = isCorrect ? score + 1 : score;
      const percentage = Math.round(
        (finalScore / shuffledQuestions.length) * 100
      );
      saveScore(playerName, finalScore, percentage);
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setShowNameInput(true);
    setPlayerName("");
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers([]);
    setShowLeaderboard(false);
  };

  // Name input screen
  if (showNameInput) {
    return (
      <div className="quiz-container">
        <div className="quiz-start">
          <h1 className="quiz-start-title">🎯 Hai-Quiz</h1>
          <p className="quiz-start-description">
            Teste dein Wissen über Haie! Beantworte 15 Fragen und zeige, wie gut
            du dich auskennst.
          </p>

          {!showLeaderboard ? (
            <>
              <form onSubmit={handleNameSubmit} className="name-input-form">
                <div className="name-input-group">
                  <label htmlFor="playerName" className="name-input-label">
                    Dein Name:
                  </label>
                  <input
                    type="text"
                    id="playerName"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Gib deinen Namen ein..."
                    className="name-input-field"
                    maxLength={20}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-quiz-start"
                  disabled={!playerName.trim()}
                >
                  Quiz starten
                </button>
              </form>

              <div className="quiz-info">
                <div className="quiz-info-item">
                  <span className="quiz-info-icon">📝</span>
                  <span>30 Fragen</span>
                </div>
                <div className="quiz-info-item">
                  <span className="quiz-info-icon">⏱️</span>
                  <span>15 Sekunden pro Frage</span>
                </div>
                <div className="quiz-info-item">
                  <span className="quiz-info-icon">🏆</span>
                  <span>Rangliste</span>
                </div>
              </div>

              <button
                className="btn-show-leaderboard"
                onClick={() => setShowLeaderboard(true)}
              >
                📊 Rangliste anzeigen
              </button>
            </>
          ) : (
            <div className="leaderboard-container">
              <h2 className="leaderboard-title">🏆 Rangliste</h2>
              {leaderboard.length === 0 ? (
                <p className="leaderboard-empty">
                  Noch keine Einträge vorhanden. Sei der Erste!
                </p>
              ) : (
                <div className="leaderboard-list">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={index}
                      className={`leaderboard-entry ${
                        index === 0
                          ? "rank-1"
                          : index === 1
                          ? "rank-2"
                          : index === 2
                          ? "rank-3"
                          : ""
                      }`}
                    >
                      <div className="leaderboard-rank">
                        {index === 0 && "🥇"}
                        {index === 1 && "🥈"}
                        {index === 2 && "🥉"}
                        {index > 2 && `#${index + 1}`}
                      </div>
                      <div className="leaderboard-info">
                        <div className="leaderboard-name">{entry.name}</div>
                        <div className="leaderboard-date">
                          {new Date(entry.date).toLocaleDateString("de-DE")}
                        </div>
                      </div>
                      <div className="leaderboard-score">
                        <div className="score-points">
                          {entry.score}/{entry.totalQuestions}
                        </div>
                        <div className="score-percent">{entry.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="btn-quiz-start"
                onClick={() => setShowLeaderboard(false)}
                style={{ marginTop: "2rem" }}
              >
                Zurück
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-start">
          <h1 className="quiz-start-title">Bereit, {playerName}? 🦈</h1>
          <p className="quiz-start-description">
            Gleich geht's los! Beantworte 15 zufällige Fragen über Haie.
          </p>
          <div className="quiz-info">
            <div className="quiz-info-item">
              <span className="quiz-info-icon">📝</span>
              <span>30 Fragen</span>
            </div>
            <div className="quiz-info-item">
              <span className="quiz-info-icon">⏱️</span>
              <span>15 Sekunden pro Frage</span>
            </div>
            <div className="quiz-info-item">
              <span className="quiz-info-icon">🏆</span>
              <span>Sofortiges Feedback</span>
            </div>
          </div>
          <button className="btn-quiz-start" onClick={startQuiz}>
            Jetzt starten!
          </button>
          <button
            className="btn-change-name"
            onClick={() => setShowNameInput(true)}
          >
            Namen ändern
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
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
              <div className="score-total">von {shuffledQuestions.length}</div>
            </div>
            <div className="score-percentage">{percentage}%</div>
          </div>
          <p className="result-message">{resultMessage}</p>

          <div className="player-result-info">
            <p className="player-name-result">
              🎮 Spieler: <strong>{playerName}</strong>
            </p>
          </div>

          <div className="result-buttons">
            <button className="btn-quiz-restart" onClick={restartQuiz}>
              Nochmal versuchen
            </button>
            <button
              className="btn-show-leaderboard"
              onClick={() => {
                setShowResult(false);
                setShowNameInput(true);
                setShowLeaderboard(true);
              }}
            >
              📊 Rangliste ansehen
            </button>
          </div>

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
                    {answer.isCorrect
                      ? "✓ Richtig"
                      : answer.timeUp
                      ? "⏱️ Zeit abgelaufen"
                      : "✗ Falsch"}
                  </span>
                </div>
                <div className="answer-question">{answer.question}</div>
                {!answer.isCorrect && (
                  <div className="answer-correction">
                    {!answer.timeUp && answer.userAnswer !== null && (
                      <span className="your-answer">
                        Deine Antwort:{" "}
                        {shuffledQuestions[index].options[answer.userAnswer]}
                      </span>
                    )}
                    {answer.timeUp && (
                      <span className="your-answer timeout">
                        Keine Antwort - Zeit abgelaufen
                      </span>
                    )}
                    <span className="correct-answer">
                      Richtig:{" "}
                      {shuffledQuestions[index].options[answer.correctAnswer]}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;

  return (
    <div className="quiz-container" ref={quizContentRef}>
      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="quiz-content">
        <div className="quiz-header">
          <span className="quiz-question-number">
            Frage {currentQuestion + 1} von {shuffledQuestions.length}
          </span>
          <div className="quiz-timer-container">
            <div
              className={`quiz-timer ${timeLeft <= 3 ? "timer-warning" : ""}`}
            >
              <span className="timer-icon">⏱️</span>
              <span className="timer-value">{timeLeft}s</span>
            </div>
          </div>
          <span className="quiz-current-score">Score: {score}</span>
        </div>

        <h2 className="quiz-question">
          {shuffledQuestions[currentQuestion].question}
        </h2>

        <div className="quiz-options">
          {shuffledQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${
                selectedAnswer === index ? "selected" : ""
              } ${isTimeUp ? "disabled" : ""}`}
              onClick={() => handleAnswerClick(index)}
              disabled={isTimeUp}
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
          disabled={selectedAnswer === null || isTimeUp}
        >
          {currentQuestion < shuffledQuestions.length - 1
            ? "Nächste Frage"
            : "Quiz beenden"}
        </button>
      </div>
    </div>
  );
};

export default SharkQuiz;
