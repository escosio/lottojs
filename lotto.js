class LottoGame {
  constructor(winningNumbers, currentNumbers, message, attempts) {
    this.playHistory = [];
    this.winningNumbers = this.generateLottoNumbers();
    this.currentNumbers = this.generateLottoNumbers();
    this.message =
      "Click the button to play. Note: a single play will simulate 1000 plays.";
    this.attempts = 0;
    this.bestPlay = [];
    this.autoplay = false;
    this.defaultMaxAttempts = 10000;
  }

  generateLottoNumbers(numCount = 6, playHistoryArray = this.playHistory) {
    const nums = [];

    while (nums.length < numCount) {
      const randomNumber = Math.floor(Math.random() * 70);
      if (!nums.includes(randomNumber)) {
        nums.push(randomNumber);
      }
    }
    nums.sort();
    if (playHistoryArray.includes(nums)) {
      nums = this.generateLottoNumbers();
      console.log("Skipping because number has already been played");
    } else {
      playHistoryArray.push(nums);
    }
    return nums;
  }

  compareNumbers(numArray1, numArray2) {
    var match = true;
    var matchingNumbers = [];

    for (let i in numArray1) {
      i = Number(i);
      if (numArray1[i] != numArray2[i]) {
        match = false;
      } else {
        matchingNumbers.push(numArray1[i]);
      }
    }

    if (matchingNumbers.length > this.bestPlay.length) {
      this.bestPlay = matchingNumbers;
    }

    return match;
  }

  playLotto(winningNumbers) {
    var maxAttempts = this.attempts + this.defaultMaxAttempts;
    var youWon = false;

    document.getElementById("playButton").innerHTML = "Playing...";
    // Check for winning numbers while you havent won and are below min attempts
    while (
      (!youWon && this.attempts < maxAttempts) ||
      (!youWon && this.autoplay)
    ) {
      if (this.compareNumbers(this.currentNumbers, this.winningNumbers)) {
        youWon = true;
      } else {
        try {
          this.attempts += 1;
          this.currentNumbers = this.generateLottoNumbers();
          this.playHistory.push(this.currentNumbers);
        } catch (error) {
          console.log(error);
          break;
        }
      }
    }

    if (youWon) {
      if (this.attempts == 0) {
        this.attempts = 1;
      }
      this.message = `Congrats! You won on ${this.attempts.toLocaleString()} attempts and spent $${(
        this.attempts * 2
      ).toLocaleString()}`;
      document.getElementById("message").innerHTML = this.message;
      console.log("You won!");
    } else if (this.autoplay) {
      try {
        this.maxAttempts += this.defaultMaxAttempts;
        this.message = `Sorry, you played ${this.attempts.toLocaleString()} times and spent $${(
          this.attempts * 2
        ).toLocaleString()}.00 but did not win.`;
        this.playLotto(this.winningNumbers);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.message = `Sorry, you played ${this.attempts.toLocaleString()} times and spent $${(
        this.attempts * 2
      ).toLocaleString()}.00 but did not win.`;
    }

    console.log(this.attempts);
    document.getElementById("message").innerHTML = this.message;
    document.getElementById(
      "currentPlay"
    ).innerHTML = `Your last play: ${this.currentNumbers.join(", ")}`;
    document.getElementById("matchingNumbers").innerHTML =
      "Numbers hit in your best play: " + game.bestPlay.join(", ");
    document.getElementById("playButton").innerHTML = "Play again";
    document.getElementById(
      "attempts"
    ).innerHTML = `Attempts: ${this.attempts.toLocaleString()}`;
    document.getElementById("moneySpent").innerHTML = `Money spent: $${(
      this.attempts * 2
    ).toLocaleString()}`;
  }

  getButtonText() {
    if (document.getElementById("autoplayCheckbox").checked) {
      document.getElementById("playButton").innerHTML = "Play until you win";
    } else {
      document.getElementById(
        "playButton"
      ).innerHTML = `Play ${this.defaultMaxAttempts.toLocaleString()} times`;
    }
  }

  setAutoplay() {
    this.autoplay = !this.autoplay;
    this.getButtonText();
  }
}
const game = new LottoGame();

document.getElementById("winning_numbers").innerHTML =
  game.winningNumbers.join(", ");
document.getElementById("message").innerHTML = game.message;
