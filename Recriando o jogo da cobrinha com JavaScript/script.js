let canvas = document.getElementById("snake"); //Cria o container que envolve o jogo;
let context = canvas.getContext("2d");
let box = 32; // tamanho da caixa

let snake = []; //Inicialização do array vazio;
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
//Build JavaScript Objects
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Function para Desenhar e Definir a Cor do Elemento Container;
function createBG() {
    context.fillStyle = "white";
    context.fillRect(0, 0, 16 * box, 16 * box);//Desenha o frame do jogo
}
// Function para inicializar e percorrer o array como 
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box); // Fill color position x and y of snake
    }
}
// Function que desenha a comida aleatoriamente;
function createFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Evento de escuta para capturar os controles do jogo;
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function beginToPlay() {
    //Condição caso a snake chegue até a parede do container
    if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;

    if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    // Loop parar jogo ao chocar com o array da snake   
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(play);
            alert('Game Over :(');
        }
    }
    createBG();
    createSnake();
    createFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //method unshift and pop();
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    // Condição para aumentar a snake com o food;
    snakeX != food.x || snakeY != food.y ? (
        snake.pop()
    ) : (
        food.x = Math.floor(Math.random() * 15 + 1) * box, //Recebe posição aleatória;
        food.y = Math.floor(Math.random() * 15 + 1) * box
    );

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}
let play = setInterval(beginToPlay, 100);