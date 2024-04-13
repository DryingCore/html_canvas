const canvas = document.querySelector("canvas"); // gotcha canvas element
const context = canvas.getContext("2d"); // main character

function main() {
	// keymap consts
	const up = "w";
	const down = "s";
	const left = "a";
	const right = "d";

	const size = 50;
	let posX = 50;
	let posY = 50;
	const collisionBlock = "#000"; // collider block color
	const characterNormal = "#003"; // default character color
	const characterCollision = "#f70"; // color if character do collision
	let normalColor = characterNormal;

	// character who will have collision logic
	const collisionBlockX = canvas.width / 2 - size / 2;
	const collisionBlockY = canvas.height / 2 - size / 2;

	// key status
	let isMoving = { up: false, down: false, left: false, right: false };

	function handleKeyDown(event) {
		if (event.key === up) isMoving.up = true;
		if (event.key === down) isMoving.down = true;
		if (event.key === left) isMoving.left = true;
		if (event.key === right) isMoving.right = true;
	}

	function handleKeyUp(event) {
		if (event.key === up) isMoving.up = false;
		if (event.key === down) isMoving.down = false;
		if (event.key === left) isMoving.left = false;
		if (event.key === right) isMoving.right = false;
	}

	function updateCharacterPosition() {
		if (isMoving.up) posY -= 3;
		if (isMoving.down) posY += 3;
		if (isMoving.left) posX -= 3;
		if (isMoving.right) posX += 3;
	}

	function collide() {
		if (posX + size > collisionBlockX && posX < collisionBlockX + size && posY + size > collisionBlockY && posY < collisionBlockY + size) {
			normalColor = characterCollision;
		} else {
			normalColor = characterNormal;
		}
	}

	// render the main character
	function renderCharacter() {
		context.fillStyle = collisionBlock;
		context.fillRect(collisionBlockX, collisionBlockY, size, size);
		context.fillStyle = normalColor;
		context.fillRect(posX, posY, size, size);
	}

	// clear previous character to default (prevent bugs)
	function clearCanvas() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	// start the game
	function gameLoop() {
		clearCanvas();
		collide();
		updateCharacterPosition();
		renderCharacter();
		window.requestAnimationFrame(gameLoop);
	}

	window.addEventListener("keydown", handleKeyDown);
	window.addEventListener("keyup", handleKeyUp);
	gameLoop();
}

main();
