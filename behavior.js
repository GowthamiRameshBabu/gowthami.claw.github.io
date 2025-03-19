function toggleDarkMode() {

  document.body.classList.toggle("dark-mode");
}

function shareOnTwitter() {
  const url = encodeURIComponent(window.location.href);
  //url = "http://13.38.40.104/index.html";
  const text = "Hi there \u{1F44B}, check out this new Cybersecurity Guide I've created!";
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  //url = "http://13.38.40.104/index.html";
  const text = "Hi there, check out this Cybersecurity Guide I've created!"
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&hashtag=${text}`, '_blank');
}

function shareOnLinkedIn() {
  const url = encodeURIComponent(window.location.href);
  //url = "http://13.38.40.104/index.html";
  const title = "Hi there \u{1F44B}, check out this Cybersecurity Guide I've created!";
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${title}`, '_blank');
}

// Adding thumbnail1 clicked
// document.addEventListener("DOMContentLoaded", function(event) {
//     var thumbnail1Element = document.getElementById("smart_thumbnail1");
//     thumbnail1Element.addEventListener("click", function() {
//         if (thumbnail1Element.className == "") {
//             thumbnail1Element.className="small";
//             }
//         else if (thumbnail1Element.className == "small") {
//             thumbnail1Element.className="";
//             }
//     });

// });

function smart_thumbnail_clicked(id) {
  var thumbnailElement = document.getElementById(id);
  if (thumbnailElement.className == "") {
      thumbnailElement.className = "small";
  } else if (thumbnailElement.className == "small") {
      thumbnailElement.className = "";
  }
}

const quizData = {
  currentQuestionIndex: 0,
  questions_list: [{
          question: "<strong>Question 1:</strong> What is the most common method used in phishing attacks?",
          options: ["Fake Emails", "Strong Passwords", "Updating Software"],
          answer: 0,
          explanations: [
              "",
              "Strong passwords help, but phishing tricks users into revealing them.",
              "Updating software is important but does not stop phishing."
          ],
          bestPractice: "Always verify the sender's email address and avoid clicking on suspicious links."
      },
      {
          question: "<strong>Question 2</strong>: Which type of malware locks files and demands a ransom?",
          options: ["Spyware", "Ransomware", "Trojan Horse"],
          answer: 1,
          explanations: [
              "Spyware silently collects user information without locking files.",
              "",
              "A Trojan Horse disguises itself as legitimate software to install malware but does not directly lock files for ransom."
          ],
          bestPractice: "Always back up your important files and avoid downloading suspicious attachments."
      }
  ],
  quizContainer: null,
  quizFeedback: null,
  bestPracticesSection: null
};

function initQuiz() {
  quizData.quizContainer = document.getElementById("quiz");
  quizData.quizFeedback = document.getElementById("quiz-feedback");
  quizData.bestPracticesSection = document.querySelector(".best-practices");

  if (!quizData.quizContainer || !quizData.quizFeedback || !quizData.bestPracticesSection) {
      console.error("Quiz elements not found in the DOM.");
      return;
  }

  loadQuestion();
}

function loadQuestion() {

  // Check if quiz is complete
  if (quizData.currentQuestionIndex >= quizData.questions_list.length) {
      quizData.bestPracticesSection.style.display = "block";
      quizData.quizContainer.innerHTML = "<p style='font-weight:bold;color:green'>Great job! You've completed the quiz.</p>";
      quizData.quizFeedback.innerHTML = "";
      return;
  }

  const q = quizData.questions_list[quizData.currentQuestionIndex];
  quizData.quizContainer.innerHTML = `<p>${q.question}</p>`; //empty placeholders in html 

  //defining each of the option with a button
  q.options.forEach((option, index) => {
      let button = document.createElement("button");
      button.className = "quiz-button-full";
      button.innerText = option; //passing text into the button using innertext
      button.onclick = function() {
          checkAnswer(index, button);
      };
      quizData.quizContainer.appendChild(button);
  });

  quizData.quizFeedback.innerHTML = ""; //clearing the output message if anything printed already
}

function checkAnswer(selectedIndex, button) {

  const q = quizData.questions_list[quizData.currentQuestionIndex];
  if (!q) return;

  if (selectedIndex === q.answer) {
      quizData.quizFeedback.innerHTML = `<span class='correct'>✅ Correct! ${q.bestPractice}</span><br><br>
    <button onclick='nextQuestion()' class='cta-button'>Next Question</button>`;
      quizData.quizFeedback.style.color = "green";
  } else {
      quizData.quizFeedback.innerHTML = `<span class='incorrect'>❌ Incorrect! ${q.explanations[selectedIndex]}</span>`;
      quizData.quizFeedback.style.color = "red";
      button.disabled = true;
  }
}

function nextQuestion() {
  quizData.currentQuestionIndex++;
  loadQuestion();
}

// Initialize timeline animation
function initTimeline() {
  var timelineData = [{
          year: "1986",
          event: "Computer Fraud and Abuse Act (USA)",
          description: "Criminalized unauthorized access to computer systems, laying the foundation for modern cyber laws."
      },
      {
          year: "2000",
          event: "Australia Cybercrime Act 2001",
          description: "Established legal measures against hacking, identity theft, and unauthorized system access in Australia."
      },
      {
          year: "2013",
          event: "NIST Cybersecurity Framework",
          description: "Guidelines developed to help organizations manage and reduce cybersecurity risks."
      },
      {
          year: "2016",
          event: "EU GDPR",
          description: "Strengthened data protection and privacy rights across the European Union."
      },
      {
          year: "2018",
          event: "California Consumer Privacy Act (CCPA)",
          description: "Gives California residents control over their personal data, requiring transparency from businesses."
      },
      {
          year: "2022",
          event: "Australia Privacy Act Update",
          description: "Enhanced data protection measures, imposing stricter privacy regulations in Australia."
      }
  ];

  var timelineContainer = document.getElementById("interactive-timeline");
  if (!timelineContainer) return;

  timelineData.forEach(function(entry) {
      var eventDiv = document.createElement("div");
      eventDiv.className = "timeline-event";

      var dateDiv = document.createElement("div");
      dateDiv.className = "timeline-date";
      dateDiv.textContent = entry.year + " - " + entry.event;

      var contentDiv = document.createElement("div");
      contentDiv.className = "timeline-content";
      contentDiv.textContent = entry.description;
      contentDiv.style.display = "none"; // Hide content initially

      // Add a click event to show the clicked event's content and hide others
      dateDiv.addEventListener("click", function() {
          var contents = document.querySelectorAll(".timeline-content");
          for (var i = 0; i < contents.length; i++) {
              contents[i].style.display = "none";
          }
          contentDiv.style.display = "block";
      });

      eventDiv.appendChild(dateDiv);
      eventDiv.appendChild(contentDiv);
      timelineContainer.appendChild(eventDiv);
  });
}


// Javascript for Case studies page


function initPage() {

  initScenarios();
}

function selectOption(option, scenarioElem) {
  var feedback = scenarioElem.querySelector(".scenario-feedback");
  var message = "";
  switch (option) {
      case "ignore":
          message = "⚠️ Ignoring the email is better than clicking, but it's best to report it.";
          feedback.style.color = "orange";
          break;
      case "click":
          message = "❌ This is a phishing attempt! Never click on unknown links.";
          feedback.style.color = "red";
          break;
      case "verify":
          message = "✅ Correct! Always verify through an official channel.";
          feedback.style.color = "green";
          break;
      case "install":
          message = "❌ Never install software from unverified sources.";
          feedback.style.color = "red";
          break;
      case "report":
          message = "✅ Good job! Reporting suspicious emails helps protect everyone.";
          feedback.style.color = "green";
          break;
      case "provide":
          message = "❌ This is a scam! Never share credentials over the phone.";
          feedback.style.color = "red";
          break;
      case "hangup":
          message = "✅ Correct! Hanging up and reporting it is the best response.";
          feedback.style.color = "green";
          break;
  }
  feedback.innerText = message;
}

function initScenarios() {
  // Select all scenario containers by class
  var scenarios = document.querySelectorAll(".scenario");
  for (var i = 0; i < scenarios.length; i++) {
      // For each scenario, attach event listeners to its buttons
      var buttons = scenarios[i].querySelectorAll("button");
      for (var j = 0; j < buttons.length; j++) {
          buttons[j].addEventListener("click", function() {
              var option = this.getAttribute("data-option");
              var scenarioElem = this.closest(".scenario");
              selectOption(option, scenarioElem);
          });
      }
  }
}

// Javascript for activities 

function guessPassword() {
  const guessedPassword = document.getElementById("guess-password").value;
  const correctPassword = "John1990"; // Weak password based on user details
  const feedback = document.getElementById("password-hack-feedback");
  const explanation = document.getElementById("brute-force-explanation");

  if (guessedPassword === correctPassword) {
      feedback.innerText = "🎉 Congratulations! You cracked the password.";
      feedback.style.color = "green";
      explanation.style.display = "block";
  } else {
      feedback.innerText = "❌ Incorrect! Try again.";
      feedback.style.color = "red";
  }
}


function checkPasswordStrength() {
  const password = document.getElementById("password-input").value;
  const feedback = document.getElementById("password-feedback");
  const nistGuidelines = document.getElementById("nist-guidelines");

  const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (strongPattern.test(password)) {
      feedback.innerText = "✅ Strong Password!";
      feedback.style.color = "green";
      nistGuidelines.style.display = "none";
  } else {
      feedback.innerText = "⚠️ Weak Password! Follow NIST Guidelines below.";
      feedback.style.color = "red";
      nistGuidelines.style.display = "block";
  }
}

// Phishing Email Detector (Dummy function for now)
function identifyPhishing() {
  document.getElementById("phishing-feedback").innerText = "⚠️ This email contains few suspicious elements: unusual sender email ID and a sense of urgency";
  document.getElementById("phishing-feedback").style.color = "red";
}

function checkCompliance() {
  const checkboxes = document.querySelectorAll("#compliance-form input[type='checkbox']");
  const feedback = document.getElementById("compliance-feedback");
  let allChecked = true;

  checkboxes.forEach(checkbox => {
      if (!checkbox.checked) {
          allChecked = false;
      }
  });

  if (allChecked) {
      feedback.innerText = "✅ You meet basic cybersecurity compliance! Keep it up!";
      feedback.style.color = "green";
  } else {
      feedback.innerText = "Some security measures are missing. \nReview the checklist!";
      feedback.style.color = "red";
  }
}

function toggleContent(id) {
  let element = document.getElementById(id);
  if (element.classList.contains("expanded")) {
      element.classList.remove("expanded");
      element.style.maxHeight = "0";
      element.style.opacity = "0";
  } else {
      document.querySelectorAll(".toggle-content").forEach(content => {
          content.classList.remove("expanded");
          content.style.maxHeight = "0";
          content.style.opacity = "0";
      });
      element.classList.add("expanded");
      element.style.maxHeight = "500px";
      element.style.opacity = "1";
  }
}

// hamburger menu
function togglehamburgermenu() {
      const menu = document.getElementById('menu');
      menu.classList.toggle('open');
}
