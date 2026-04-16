
const paragraphs = [
  `India is a country of diverse cultures and languages. It is known for its rich heritage, traditions, and unity in diversity. People from different religions live together peacefully and celebrate festivals with joy. The country has a long history and has contributed a lot to the world in science, mathematics, and philosophy. India is also famous for its food, which varies from region to region and offers a unique taste everywhere.`,

  `Education is the key to success in life. It helps a person gain knowledge, improve thinking ability, and build a better future. An educated person can make wise decisions and contribute positively to society. Schools and teachers play an important role in shaping the future of students. With proper education, one can achieve goals and live a meaningful life.`,

  `Health is wealth. A healthy person can enjoy life to the fullest and perform daily activities with energy and enthusiasm. Good health depends on proper diet, regular exercise, and a positive mindset. Avoiding junk food and maintaining hygiene are also important. When a person is healthy, they can focus better on studies and work, leading to overall success in life.`,

  `Time is precious and once lost, cannot be regained. It is important to use time wisely and avoid wasting it on unnecessary things. Successful people understand the value of time and plan their day effectively. Time management helps in completing tasks on time and reduces stress. If we respect time, it will reward us with success and happiness.`,

  `Hard work is the key to success. There is no shortcut to achieving goals in life. People who work hard with dedication and determination always succeed in the long run. Challenges and failures are part of life, but they teach valuable lessons. With continuous effort and a positive attitude, anyone can overcome obstacles and reach their dreams.`,

  `Sports are essential for physical and mental development. They keep the body fit and improve concentration. Playing games teaches teamwork, discipline, and leadership skills. Students who participate in sports often perform better in academics as well. It is important to balance studies and sports for overall growth and development.`,

  `Books are our best companions. They provide knowledge, entertainment, and inspiration. Reading books improves vocabulary, imagination, and thinking skills. There are different types of books such as storybooks, novels, biographies, and educational books. A good book can change our perspective and motivate us to do better in life.`,

  `Technology has changed the way we live and work. From smartphones to the internet, everything has become faster and more convenient. People can communicate easily, access information instantly, and perform tasks efficiently. However, excessive use of technology can also have negative effects. It is important to use technology wisely and maintain a balance in life.`
];


const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".input-field");
const tryAgainBtn = document.querySelector("button");
const timeTag = document.querySelector(".time b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");

let timer, timeLeft = 60, charIndex = 0, mistakes = 0, isTyping = false;

function loadParagraph(){
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";

    paragraphs[randomIndex].split("").forEach(char => {
        typingText.innerHTML += `<span>${char}</span>`;
    });

    typingText.querySelector("span").classList.add("active");

    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.charAt(charIndex);

    if(charIndex < characters.length && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if(typedChar === ""){
            if(charIndex > 0){
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")){
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct");
            } else {
                characters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        if(charIndex < characters.length){
            characters[charIndex].classList.add("active");
        }

        let timeSpent = 60 - timeLeft;
        let wpm = timeSpent > 0 ? Math.round(((charIndex - mistakes)/5)/(timeSpent/60)) : 0;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;

        inpField.value = inpField.value.substring(0, charIndex);

    } else {
        clearInterval(timer);
    }
}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = 60;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;

    inpField.value = "";
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = 0;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
