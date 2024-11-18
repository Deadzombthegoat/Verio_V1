window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const startScreen = document.getElementById("start-screen");
  const startButton = document.getElementById("start-button");

  // Simulate loading delay
  setTimeout(() => {
    loadingScreen.style.display = "none";
    startScreen.style.display = "flex";
  }, 2000);

  startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    initializeGame(); // Start the game
    setupMultiplayer(); // Connect to multiplayer server
  });
});
