class LottoGame {
  constructor() {
    this.defaultMaxAttempts = 10000;
    this.winningNumbers = this.generateLottoNumbers();
    this.currentNumbers = [];
    this.message = `Click the button to play. Note: a single play will simulate ${this.defaultMaxAttempts.toLocaleString()} plays.`;
    this.attempts = 0;
    this.bestPlay = [];
    this.playing = false;
  }

  generateLottoNumbers(numCount = 6) {
    const nums = [];

    while (nums.length < numCount) {
      const randomNumber = Math.floor(Math.random() * 69) + 1;
      if (!nums.includes(randomNumber)) {
        nums.push(randomNumber);
      }
    }
    return nums.sort((a, b) => a - b);
  }

  compareNumbers(numArray1, numArray2) {
    const matchingNumbers = numArray1.filter((n) => numArray2.includes(n));

    if (matchingNumbers.length > this.bestPlay.length) {
      this.bestPlay = matchingNumbers;
    }

    return matchingNumbers.length === numArray2.length;
  }

  async playLotto() {
    // A second click while playing stops the run
    if (this.playing) {
      this.playing = false;
      return;
    }
    this.playing = true;
    document.getElementById("playButton").innerHTML = "Stop";

    const autoplay = this.isAutoplay();
    const maxAttempts = this.attempts + this.defaultMaxAttempts;
    const chunkSize = 50000;
    let youWon = false;

    // Play in chunks and yield between them so the page can repaint
    while (
      this.playing &&
      !youWon &&
      (autoplay || this.attempts < maxAttempts)
    ) {
      const chunkEnd = autoplay
        ? this.attempts + chunkSize
        : Math.min(maxAttempts, this.attempts + chunkSize);

      while (this.attempts < chunkEnd) {
        this.attempts += 1;
        this.currentNumbers = this.generateLottoNumbers();
        if (this.compareNumbers(this.currentNumbers, this.winningNumbers)) {
          youWon = true;
          break;
        }
      }

      this.render(youWon);
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    this.playing = false;
    document.getElementById("playButton").innerHTML = youWon
      ? "You won!"
      : "Play again";
    document.getElementById("playButton").disabled = youWon;
  }

  render(youWon) {
    const moneySpent = (this.attempts * 2).toLocaleString();

    if (youWon) {
      this.message = `Congrats! You won on ${this.attempts.toLocaleString()} attempts and spent $${moneySpent}.00`;
    } else {
      this.message = `Sorry, you played ${this.attempts.toLocaleString()} times and spent $${moneySpent}.00 but did not win.`;
    }

    document.getElementById("message").innerHTML = this.message;
    document.getElementById(
      "currentPlay"
    ).innerHTML = `Your last play: ${this.currentNumbers.join(", ")}`;
    document.getElementById("matchingNumbers").innerHTML =
      "Numbers hit in your best play: " + this.bestPlay.join(", ");
    document.getElementById(
      "attempts"
    ).innerHTML = `Attempts: ${this.attempts.toLocaleString()}`;
    document.getElementById(
      "moneySpent"
    ).innerHTML = `Money spent: $${moneySpent}`;
  }

  isAutoplay() {
    const checkbox = document.getElementById("autoplayCheckbox");
    return checkbox ? checkbox.checked : false;
  }

  getButtonText() {
    if (this.playing) return;
    if (this.isAutoplay()) {
      document.getElementById("playButton").innerHTML = "Play until you win";
    } else {
      document.getElementById(
        "playButton"
      ).innerHTML = `Play ${this.defaultMaxAttempts.toLocaleString()} times`;
    }
  }
}
const game = new LottoGame();

document.getElementById("winning_numbers").innerHTML =
  game.winningNumbers.join(", ");
document.getElementById("message").innerHTML = game.message;
game.getButtonText();
