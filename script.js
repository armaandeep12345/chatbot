const button = document.querySelector("button");
const input = document.querySelector("input[type='text']");
const chatContent = document.querySelector(".chat-content");

window.onload = () => {
    addMessage("bot", "Hi there! 👋 Welcome to Full-Stack Web Developer Helper! Type 'list of topics' to get started!");
};

button.addEventListener("click", sendMessage);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendMessage();
});

function sendMessage() {
    const userMessage = input.value.trim();
    if (userMessage) {
        addMessage("user", userMessage);
        input.value = "";

        setTimeout(() => {
            const reply = generateReply(userMessage);
            if (reply.type === "text") {
                addMessage("bot", reply.text);
            } else if (reply.type === "choices") {
                addChoices(reply.choices);
            }
        }, 1000);
    } else {
        alert("Please enter a message!");
    }
}

function addMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    const avatarDiv = document.createElement("div");
    avatarDiv.className = `avatar ${sender}-avatar`;
    const icon = document.createElement("i");
    icon.className = sender === "bot" ? "fas fa-robot" : "fas fa-user";
    avatarDiv.appendChild(icon);

    const textDiv = document.createElement("div");
    textDiv.className = "text";
    textDiv.textContent = text;

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(textDiv);

    chatContent.appendChild(messageDiv);
    chatContent.scrollTo({ top: chatContent.scrollHeight, behavior: 'smooth' });
}

function addChoices(choices) {
    const choiceContainer = document.createElement("div");
    choiceContainer.className = "choices";

    choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => {
            addMessage("user", choice);
            const reply = generateReply(choice.toLowerCase());
            setTimeout(() => {
                addMessage("bot", reply.text);
            }, 1000);
        };
        choiceContainer.appendChild(button);
    });

    chatContent.appendChild(choiceContainer);
    chatContent.scrollTo({ top: chatContent.scrollHeight, behavior: 'smooth' });
}

function generateReply(userMessage) {
    const message = userMessage.toLowerCase();
    if (message.includes("list of topics")) {
        return {
            type: "choices",
            choices: [
                "🌐 Full-Stack Development Overview",
                "💻 Front-End Development",
                "🖥️ Back-End Development",
                "📚 Databases",
                "🔧 Tools and Technologies",
                "🌍 Deployment & Hosting"
            ]
        };
    } else if (message.includes("full-stack development")) {
        return {
            type: "text",
            text: "🌐 Full-Stack Development Overview:\n- Front-End: HTML, CSS, JavaScript\n- Back-End: Node.js, Express.js, Python\n- Databases: MongoDB, MySQL, PostgreSQL\n- Deployment: Heroku, AWS, DigitalOcean\n- Version Control: Git/GitHub\n- UI Frameworks: React, Vue.js\n- APIs: RESTful, GraphQL\n- Authentication: JWT, OAuth"
        };
    } else if (message.includes("front-end")) {
        return {
            type: "text",
            text: "💻 Front-End Development:\n- HTML5, CSS3, JavaScript\n- Responsive Design\n- CSS Preprocessors (SASS, LESS)\n- JavaScript Frameworks: React, Vue.js, Angular\n- Webpack, Babel\n- Bootstrap, Tailwind CSS"
        };
    } else if (message.includes("back-end")) {
        return {
            type: "text",
            text: "🖥️ Back-End Development:\n- Node.js, Express.js, Python (Django, Flask)\n- Server-Side Programming\n- RESTful APIs, GraphQL\n- Authentication: JWT, OAuth\n- Web Servers: Nginx, Apache"
        };
    } else if (message.includes("databases")) {
        return {
            type: "text",
            text: "📚 Databases:\n- SQL: MySQL, PostgreSQL\n- NoSQL: MongoDB\n- ORMs: Sequelize, Mongoose\n- Data Modeling & Querying\n- Data Relationships"
        };
    } else if (message.includes("tools and technologies")) {
        return {
            type: "text",
            text: "🔧 Tools and Technologies:\n- Git & GitHub (Version Control)\n- Postman (API Testing)\n- Docker (Containerization)\n- Nginx (Web Server)\n- Cloud: AWS, Heroku, DigitalOcean\n- CI/CD: Jenkins, Travis CI"
        };
    } else if (message.includes("deployment")) {
        return {
            type: "text",
            text: "🌍 Deployment & Hosting:\n- Platforms: Heroku, AWS, DigitalOcean\n- CI/CD Pipelines\n- Docker & Kubernetes for Containerization\n- Domain Management & DNS\n- SSL Certificates"
        };
    } else {
        return {
            type: "text",
            text: "I’m sorry, I didn’t understand that. Type 'list of topics' to see available options!"
        };
    }
}