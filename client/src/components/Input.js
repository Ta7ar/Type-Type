import React, { useEffect, useState, useRef } from "react";
import randomWords from "random-words";

export default function Input(props) {
  const { signalStart, setStats, time } = props;
  const textInputRef = useRef();
  const targetWordRef = useRef();
  const [targetWords, setTargetWords] = useState(randomWords(10));
  const [currentTarget, setCurrentTarget] = useState(targetWords[0]);
  const [userInput, setUserInput] = useState("");
  const [wrongInput, setWrongInput] = useState(false);
  const [completedWords, setCompletedWords] = useState([]);
  const focusInput = () => {
    textInputRef.current.focus();
  };

  useEffect(() => {
    const numOfCharsEntered = userInput.trim().length;

    if (userInput === currentTarget.substr(0, numOfCharsEntered)) {
      //replace target word with remaining characters of the target word
      targetWordRef.current.textContent = currentTarget.substr(
        numOfCharsEntered
      );
      setWrongInput(false);
    } else {
      setWrongInput(true);
    }
  }, [userInput]);

  useEffect(() => {
    focusInput();
  }, []);

  const submitWord = (e) => {
    signalStart();
    if (e.key === " " || e.key === "Enter") {
      //save user input word along with whether it is correct or not
      let correct = currentTarget === userInput.trim();
      setCompletedWords([
        ...completedWords,
        { word: userInput.trim(), correct },
      ]);

      //update current target word and target words list
      let newTargetWord = targetWords[1];
      setTargetWords([...targetWords.slice(1), randomWords(1)[0]]);
      setCurrentTarget(newTargetWord);

      //clear the input text
      textInputRef.current.textContent = null;

      //clear user input
      setUserInput("");

      //prevent space or key from going into user input
      e.preventDefault();
    }
  };

  const countWordsCharsAndAcc = () => {
    let totalWordsCount = completedWords.length;
    let correctWordsArr = completedWords.filter((obj) => {
      return obj.correct;
    });
    let correctWordsCount = correctWordsArr.length;
    let characterCount = 0;
    correctWordsArr.forEach((val) => {
      characterCount += val.word.length;
    });

    let accuracyRate = correctWordsCount / totalWordsCount;
    accuracyRate = (accuracyRate * 100).toFixed(2);

    return [correctWordsCount, characterCount, accuracyRate];
  };

  useEffect(() => {
    if (time === 0) {
      //update stats only at end (design choice)
      setStats(countWordsCharsAndAcc());
      //reset input fields
      let newTargetWords = randomWords(10);
      setTargetWords(newTargetWords);
      setCurrentTarget(newTargetWords[0]);
      setUserInput("");
      setWrongInput(false);
      setCompletedWords([]);
      textInputRef.current.textContent = null;
    }
  }, [time]);
  return (
    <div
      className="input-form bg-light"
      id="tooltip-target"
      onClick={(e) => {
        focusInput();
      }}
    >
      <div className="input-field-wrapper">
        <div style={{ display: "flex", float: "right", textAlign: "right" }}>
          {completedWords.slice(-10).map((val, i) => {
            return (
              <span
                key={i}
                className={`word ${
                  val.correct ? "completed" : "completed-wrong"
                }`}
              >
                {val.word}
              </span>
            );
          })}

          <div
            className={`input-field ${wrongInput ? "wrong" : "correct"}`}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            contentEditable
            ref={textInputRef}
            onInput={(e) => {
              setUserInput(e.currentTarget.textContent);
            }}
            onKeyPress={submitWord}
          ></div>
        </div>
      </div>

      <div className="words-list">
        {targetWords.map((val, i) => (
          <span key={i} ref={i === 0 ? targetWordRef : null} className="word">
            {val}
          </span>
        ))}
      </div>
    </div>
  );
}
