const hintEl = document.getElementById("hint");
const displayEl = document.getElementById("word-display");
const inputEl = document.getElementById("letter-input");
const msgEl = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");

const easyWords = [{
        word: "pencil",
        hint: "Used for drawing or writing"
    },
    {
        word: "window",
        hint: "Lets light into a room"
    },
    {
        word: "banana",
        hint: "A yellow curved fruit"
    },
    {
        word: "bottle",
        hint: "Used to hold liquids"
    },
    {
        word: "button",
        hint: "Used to fasten a shirt"
    },
    {
        word: "circle",
        hint: "A round shape"
    },
    {
        word: "rocket",
        hint: "Flies to space"
    },
    {
        word: "camera",
        hint: "Used to take photos"
    },
    {
        word: "cloudy",
        hint: "When the sky is full of clouds"
    },
    {
        word: "market",
        hint: "Where you buy things"
    },
    {
        word: "orange",
        hint: "A fruit and a color"
    },
    {
        word: "ladder",
        hint: "Used to climb up"
    },
    {
        word: "castle",
        hint: "A big building from the past"
    },
    {
        word: "gloves",
        hint: "Worn on hands for warmth"
    },
    {
        word: "wallet",
        hint: "Holds your money"
    },
    {
        word: "pillow",
        hint: "Used under your head when sleeping"
    },
    {
        word: "mirror",
        hint: "You see your reflection in it"
    },
    {
        word: "planet",
        hint: "Orbits around a star"
    },
    {
        word: "guitar",
        hint: "String instrument you play"
    },
    {
        word: "basket",
        hint: "Used to carry things"
    },
    {
        word: "rabbit",
        hint: "Hops and has long ears"
    },
    {
        word: "silver",
        hint: "A shiny gray metal"
    },
    {
        word: "magnet",
        hint: "Attracts iron objects"
    },
    {
        word: "shovel",
        hint: "Used for digging"
    },
    {
        word: "crayon",
        hint: "Used for coloring"
    },
    {
        word: "zipper",
        hint: "Used to fasten bags or jackets"
    },
    {
        word: "planet",
        hint: "Object in space that orbits the sun"
    },
    {
        word: "candle",
        hint: "Wax object that gives light"
    },
    {
        word: "thread",
        hint: "Used for sewing"
    },
    {
        word: "violin",
        hint: "A small string instrument"
    },
    {
        word: "horizon",
        hint: "Where the earth and sky appear to meet"
    },
    {
        word: "bicycle",
        hint: "A vehicle with two wheels"
    },
    {
        word: "diamond",
        hint: "A precious stone and a shape"
    },
    {
        word: "journey",
        hint: "A long trip from one place to another"
    },
    {
        word: "whistle",
        hint: "High-pitched sound made with lips or a device"
    },
    {
        word: "orchard",
        hint: "Land where fruit trees grow"
    },
    {
        word: "stadium",
        hint: "A large sports venue"
    },
    {
        word: "pyramid",
        hint: "Ancient triangular Egyptian structure"
    },
    {
        word: "kingdom",
        hint: "Land ruled by a king or queen"
    },
    {
        word: "library",
        hint: "Place with many books"
    },
    {
        word: "cabinet",
        hint: "A cupboard for storage"
    },
    {
        word: "fossils",
        hint: "Preserved remains of ancient organisms"
    },
    {
        word: "battery",
        hint: "Stores energy for later use"
    },
    {
        word: "courage",
        hint: "The ability to face fear or danger"
    },
    {
        word: "lantern",
        hint: "Portable light source"
    },
    {
        word: "gravity",
        hint: "Force that pulls objects toward the Earth"
    },
    {
        word: "compass",
        hint: "Shows direction (N, S, E, W)"
    },
    {
        word: "fiction",
        hint: "Literary work not based on fact"
    },
    {
        word: "blanket",
        hint: "Used to keep warm while sleeping"
    },
    {
        word: "justice",
        hint: "Fair treatment or behavior"
    },
    {
        word: "harvest",
        hint: "Gathering of crops"
    },
    {
        word: "network",
        hint: "A connected system of things or people"
    },
    {
        word: "islands",
        hint: "Land surrounded by water"
    },
    {
        word: "gesture",
        hint: "A movement expressing an idea or feeling"
    },
    {
        word: "echoing",
        hint: "Sound bouncing back"
    },
    {
        word: "village",
        hint: "A small group of houses in the countryside"
    },
    {
        word: "forests",
        hint: "Large areas filled with trees"
    },
    {
        word: "texture",
        hint: "How something feels to the touch"
    },
    {
        word: "recycle",
        hint: "Convert waste into reusable material"
    },
    {
        word: "voyager",
        hint: "One who goes on a long journey"
    }
];

let word = "";
let hiddenWord = [];
let guessed = [];

function getRandomEasyWord() {
    const random = easyWords[Math.floor(Math.random() * easyWords.length)];
    word = random.word.toLowerCase();
    guessed = [];
    let rand1 = Math.floor(Math.random() * 6);
    let rand2 = Math.floor(Math.random() * 5);

    for (let i = 0; i < word.length; i++) {
        if (i === rand1) {
            hiddenWord.push(word[i]); // Keep the first character
        } else if (i === rand2) {
            hiddenWord.push(word[i]);
        } else {
            hiddenWord.push("_"); // Replace others with underscore
        }
    }

    hintEl.textContent = `Hint: ${random.hint}`;
    updateDisplay();
    inputEl.disabled = false;
    inputEl.focus();
}

function updateDisplay() {
    displayEl.textContent = hiddenWord.join(" ");
}

function resetGame() {
    word = "";
    hiddenWord = [];
    guessed = [];
    hintEl.textContent = "Hint: loading...";
    displayEl.textContent = "";
    msgEl.textContent = "";
    inputEl.value = "";
    inputEl.disabled = true;
}

inputEl.addEventListener("input", () => {
    const letter = inputEl.value.toLowerCase();
    inputEl.value = "";

    if (!/^[a-z]$/.test(letter)) return;
    if (guessed.includes(letter)) {
        alert("You already guessed that letter.");
        return;
    }

    guessed.push(letter);

    let match = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            hiddenWord[i] = letter;
            match = true;
        }
    }

    updateDisplay();

    if (!hiddenWord.includes("_")) {
        msgEl.textContent = "🎉 You guessed the word!";
        inputEl.disabled = true;
    } else if (!match) {
        msgEl.textContent = `"${letter}" is not in the word.`;
        setTimeout(() => (msgEl.textContent = ""), 1500);
    }
});

restartBtn.addEventListener("click", () => {
    resetGame();
    getRandomEasyWord();
});

// Start game on load
getRandomEasyWord();