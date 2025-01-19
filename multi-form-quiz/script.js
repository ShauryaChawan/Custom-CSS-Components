const questions = [
    {
      question: "Which animal says 'meow'?",
      options: ["Dog", "Cat", "Cow", "Elephant"],
      values: ["dog", "cat", "cow", "elephant"],
      answer: "cat",
    },
    {
      question: "Which animal is the largest land animal?",
      options: ["Lion", "Giraffe", "Elephant", "Zebra"],
      values: ["lion", "giraffe", "elephant", "zebra"],
      answer: "elephant",
    },
    {
      question: "What do cows give us?",
      options: ["Wool", "Eggs", "Milk", "Feathers"],
      values: ["wool", "eggs", "milk", "feathers"],
      answer: "milk",
    },
    {
      question: "Which of these animals can fly?",
      options: ["Dog", "Bird", "Snake", "Tiger"],
      values: ["dog", "bird", "snake", "tiger"],
      answer: "bird",
    },
    {
      question: "What is the baby of a dog called?",
      options: ["Calf", "Kitten", "Puppy", "Duckling"],
      values: ["calf", "kitten", "puppy", "duckling"],
      answer: "puppy",
    },
    {
      question: "Which animal is known as the 'King of the Jungle'?",
      options: ["Tiger", "Lion", "Bear", "Monkey"],
      values: ["tiger", "lion", "bear", "monkey"],
      answer: "lion",
    },
    {
      question: "What color are most zebras?",
      options: ["Black and White", "Brown", "Green", "Yellow"],
      values: ["black_and_white", "brown", "green", "yellow"],
      answer: "black_and_white",
    },
    {
      question: "Which animal is known to have a long neck?",
      options: ["Elephant", "Horse", "Giraffe", "Rabbit"],
      values: ["elephant", "horse", "giraffe", "rabbit"],
      answer: "giraffe",
    },
    {
      question: "Which of these animals lives in water?",
      options: ["Whale", "Lion", "Snake", "Kangaroo"],
      values: ["whale", "lion", "snake", "kangaroo"],
      answer: "whale",
    },
    {
      question: "What sound does a duck make?",
      options: ["Quack", "Roar", "Chirp", "Moo"],
      values: ["quack", "roar", "chirp", "moo"],
      answer: "quack",
    },
  ];
  
  
  const questionHtmlComponent = (data, index) => {
    const { question, options, values, ans } = data;
  
    return `
    <div class="quiz-item custom-container-fluid" id="quiz-item-${++index}">
      <p class="question">
        ${index}. ${question}
      </p>
      <div class="options-container custom-container-fluid">
        <label class="option">
        <input type="radio" name="animal${index}" id="1" value=${values[0]} /> ${
      options[0]
    }
        </label>
        <label class="option">
        <input type="radio" name="animal${index}" id="2" value=${values[1]} /> ${
      options[1]
    }
        </label>
        <label class="option">
        <input type="radio" name="animal${index}" id="3" value=${values[2]} /> ${
      options[2]
    }
        </label>
        <label class="option">
        <input type="radio" name="animal${index}" id="4" value=${values[3]} /> ${
      options[3]
    }
        </label>
      </div>
  
    </div>
    `;
  };
  
  const answerContainer = (userAns, correctAns, correctOptionID) => {
    // console.log(userAns, correctAns, correctOptionID);
    if (userAns == correctAns) {
      return `
      <div class="answer-container custom-container-fluid correct" id="correct-answer">
        Your answer is correct
      </div>
      `;
    } else {
      return `
      <div class="answer-container custom-container-fluid wrong" id="wrong-answer">
        Wrong!! Correct Answer: ${correctOptionID}. ${correctAns}
      </div>
      `;
    }
  };
  
  const scoreCard = (correctAnswersCount, totalQuestions, userName) => {
   
    let percentage = (correctAnswersCount / totalQuestions) * 100;
    let message = "";
    
    if(percentage >= 60){
      message = "Well done"
    }
    else if (percentage < 60 && percentage >=30){
      message = "Congratulations"
    }else{
      message = "Better luck next time"
    }
    return `
      <div class="score-card custom-container-fluid" id="score-card">
        <p> ${message} ${userName} !!</p>
        <p>Your total score is ${correctAnswersCount}/${totalQuestions} 
        or ${percentage} %</p>
      </div>
      `;
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const userFName = document.getElementById("userFName");
    const userFNameError = document.getElementById("userFNameError");
    const userLName = document.getElementById("userLName");
    const userLNameError = document.getElementById("userLNameError");
    const userEmail = document.getElementById("userEmail");
    const userEmailError = document.getElementById("userEmailError");
    const registerBtn = document.getElementById("register-btn");
    const questionsAnswered = document.getElementById("questions-answered");
    const registrationForm = document.getElementById("registration");
    const formSubmitBtn = document.getElementById("submit-btn");
    const formPreviousBtn = document.getElementById("previous-btn");
    const formPlayAgainBtn = document.getElementById("play-again-btn");
    const quizForm = document.getElementById("quiz");
    const timer = document.getElementById("timer");
    const quizContainer = document.getElementById("quiz-container");
  
    // Global variables
    // let countdownTime = 180;
    let countdownTime = 179;
    let totalQuestsionAnswered;
    let userFirstName, userLastName, userEmailID;
    let countDownTimer;
  
    /*
    ========================================
    Validating all fields
    ========================================
    */
    const validateFields = () => {
      /*
      ========================================
      RegEx expressions
      ========================================
      */
      const userFNameRegex = /^[a-zA-Z\s]+$/;
      const userLNameRegex = /^[a-zA-Z\s]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
  
      /*
      ========================================
      Common Error
      ========================================
      */
  
      const commonErrorActivate = (errorComponent, message, parentComponent) => {
        errorComponent.innerHTML = message;
        errorComponent.style.visibility = "visible";
        parentComponent.style.border = "1px solid red";
      };
  
      const commonErrorDeactivate = (errorComponent, parentComponent) => {
        errorComponent.innerHTML = "";
        errorComponent.style.visibility = "hidden";
        parentComponent.style.borderColor = "";
      };
  
      /*
      ========================================
      Validating user first name
      ========================================
      */
      const validateUserFName = () => {
        // Case 1: Field is empty
        if (userFName.value.trim().length === 0) {
          let errorMessage = "The first name field is required";
          commonErrorActivate(userFNameError, errorMessage, userFName);
          return false;
        }
  
        // Case 2: Contains special characters or numbers
        else if (!userFNameRegex.test(userFName.value.trim())) {
          let errorMessage = "No special characters or numbers are allowed";
          commonErrorActivate(userFNameError, errorMessage, userFName);
          return false;
        }
  
        // Case 3: Exceeds maximum length
        else if (userFName.value.trim().length > 20) {
          let errorMessage = "Maximum length is 20 characters";
          commonErrorActivate(userFNameError, errorMessage, userFName);
          return false;
        }
        // Valid username
        else {
          commonErrorDeactivate(userFNameError, userFName);
          return true;
        }
      };
  
      /*
      ========================================
      Validating user last name
      ========================================
      */
      const validateUserLName = () => {
        // Case 1: Field is empty
        if (userLName.value.trim().length === 0) {
          let errorMessage = "The last name field is required";
          commonErrorActivate(userLNameError, errorMessage, userLName);
          return false;
        }
  
        // Case 2: Contains special characters or numbers
        else if (!userLNameRegex.test(userLName.value.trim())) {
          let errorMessage = "No special characters or numbers are allowed";
          commonErrorActivate(userLNameError, errorMessage, userLName);
          return false;
        }
  
        // Case 3: Exceeds maximum length
        else if (userLName.value.trim().length > 20) {
          let errorMessage = "Maximum length is 20 characters";
          commonErrorActivate(userLNameError, errorMessage, userLName);
          return false;
        }
        // Valid username
        else {
          commonErrorDeactivate(userLNameError, userLName);
          return true;
        }
      };
  
      /*
      ========================================
      Validating email
      ========================================
      */
  
      const validateEmail = () => {
        // Checking is length is 0
        if (userEmail.value.trim().length === 0) {
          let errorMessage = "The email field is required";
          commonErrorActivate(userEmailError, errorMessage, userEmail);
          return false;
        }
        // Validate email
        else if (!emailRegex.test(userEmail.value.trim())) {
          let errorMessage = "Please enter a valid email address";
          commonErrorActivate(userEmailError, errorMessage, userEmail);
          return false;
        }
        // Valid Email
        else {
          commonErrorDeactivate(userEmailError, userEmail);
          return true;
        }
      };
      /*
      ========================================
      Running all validation
      ========================================
      */
  
      const isUserFNameValid = validateUserFName();
      const isUserLNameValid = validateUserLName();
      const isEmailValid = validateEmail();
  
      if (isUserFNameValid && isUserLNameValid && isEmailValid) {
        return true;
      } else return false;
    };
  
    /*
    ========================================
    Register Button Click
    ========================================
    */
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let isFormValid = validateFields();
      if (isFormValid) {
        userFirstName = userFName.value;
        userLastName = userLName.value;
        userEmailID = userEmail.value;
  
        const confirmSubmit = window.confirm(
          `First Name: ${userFName.value}\nLast Name: ${userLName.value}\nEmail: ${userEmail.value}`
        );
        if (confirmSubmit) {
          startQuizSection();
        }
      }
    });
  
    /*
    ========================================
    Function to start and stop the countdown
    ========================================
    */
  
    const startCountdown = () => {
      countDownTimer = setInterval(() => {
        const hours = Math.floor(countdownTime / 3600);
        const remainingMinutes = Math.floor((countdownTime % 3600) / 60);
        const seconds = countdownTime % 60;
  
        // Format the time as HH:MM:SS
        const formattedTime = `${hours
          .toString()
          .padStart(2, "0")}:${remainingMinutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  
        timer.innerHTML = `Time Remaining: ${formattedTime}`;
  
        if (countdownTime === 0) {
          clearInterval(countDownTimer);
          timer.innerHTML = "Time's up!";
        }
  
        countdownTime--;
      }, 1000);
    };
  
    const stopCounterDown = () => {
      clearInterval(countDownTimer);
    };
  
    /*
      ========================================
      Render all questions dynamically
      ========================================
    */
  
    function renderQuestions() {
      quizContainer.innerHTML = "";
  
      questions.forEach((questionData, index) => {
        const questionHTML = questionHtmlComponent(questionData, index);
  
        quizContainer.innerHTML += questionHTML;
      });
    }
  
    renderQuestions();
  
    /*
    ========================================
    Tack questions answered
    ========================================
    */
  
    function trackAnsweredQuestions() {
      const options = document.querySelectorAll(
        '.options-container input[type="radio"]'
      );
      const answeredQuestions = new Set();
  
      options.forEach((option) => {
        option.addEventListener("change", () => {
          const questionContainer = option.closest(".quiz-item");
          const questionId = questionContainer.getAttribute("id");
  
          answeredQuestions.add(questionId);
  
          totalQuestsionAnswered = answeredQuestions.size;
          questionsAnswered.textContent = totalQuestsionAnswered.toString();
        });
      });
    }
  
    /*
    ========================================
    Form submit actions
    ========================================
    */
  
    const renderAnswerStatus = (
      selectedAnswer,
      correctAnswer,
      correctInputOptionId,
      index
    ) => {
      const quizItem = document.getElementById(`quiz-item-${index + 1}`);
  
      const correctAnswerDiv = answerContainer(
        selectedAnswer,
        correctAnswer,
        correctInputOptionId
      );
  
      quizItem.insertAdjacentHTML("beforeend", correctAnswerDiv);
    };
  
    const disableOptionSelection = () => {
      const radioButtons = document.querySelectorAll('.options-container input[type="radio"]');
      radioButtons.forEach(button => {
        button.disabled = true;
      });
    };
  
    const disableHoverEffectOnInputs = () => {
      const radioButtons = document.querySelectorAll('.option input[type="radio"]');
    
      radioButtons.forEach(radioButton => {
        radioButton.style.pointerEvents = 'none';
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      stopCounterDown();
      disableOptionSelection();
      disableHoverEffectOnInputs();
  
      let correctAnswersCount = 0;
  
      questions.forEach((questionData, index) => {
        const selectedOption = document.querySelector(
          `input[name="animal${index + 1}"]:checked`
        );
  
        if (selectedOption) {
          const selectedAnswer = selectedOption.value;
  
          const correctAnswer = questionData.answer;
          const correctInputOptionId = questionData.values.indexOf(`${correctAnswer}`) + 1;
                  const correctAndswerFromOptions = questionData.options[correctInputOptionId - 1];
                  console.log(correctAndswerFromOptions);
            
            if (selectedAnswer === correctAnswer) {
              selectedOption.parentElement.classList.add("correct");
              correctAnswersCount++;
            } else {
              selectedOption.parentElement.classList.add("wrong");
              
              const correctionOptionInputID = document.querySelector(
                `input[name="animal${index + 1}"][id="${correctInputOptionId}"]`
              );
            correctionOptionInputID.parentElement.classList.add("correct");
          }
  
          renderAnswerStatus(
            selectedAnswer,
            questionData.answer,
            correctInputOptionId,
            index
          );
        }
      });
      const userName = `${userFirstName} ${userLastName}`
      const scoreCardDiv = scoreCard(correctAnswersCount, questions.length, userName);
      const quizWrapper = document.querySelector(".quiz-wrapper");
      // const statusDiv = document.querySelector(".status");
      quizWrapper.insertAdjacentHTML("afterbegin", scoreCardDiv);
  
      formSubmitBtn.style.display = "none";
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      alert("Form Submitted Successfully !!");
      
    };
  
    formSubmitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (totalQuestsionAnswered == 10) {
        const confirmSubmit = window.confirm(
          "Are you sure you want to submit the form?"
        );
        if (confirmSubmit) {
          formPreviousBtn.style.display="none";
          formPlayAgainBtn.style.display="block";
          handleSubmit(e);
          // console.log("form submitted");
        }
      } else {
        alert("Please answer all the questions before submitting!");
      }
    });
  
    formPlayAgainBtn.addEventListener("click", () =>{
      location.reload();
    })
  
    /*
    ========================================
    Start Quiz Section
    ========================================
    */
  
    const startQuizSection = () => {
      registrationForm.style.display = "none";
      quizForm.style.display = "flex";
  
      startCountdown(countdownTime);
  
      trackAnsweredQuestions();
    };
  
    /*
    ========================================
    Previous Button action
    ========================================
    */
  
    formPreviousBtn.addEventListener("click", (e) => {
      e.preventDefault();
      registrationForm.style.display = "flex";
      quizForm.style.display = "none";
  
      userFName.value = userFirstName;
      userLName.value = userLastName;
      userEmail.value = userEmailID;
    });
  });
  