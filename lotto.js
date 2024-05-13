class LottoGame {
    constructor(winningNumbers, currentNumbers, message, attempts) {
        this.winningNumbers = this.generateLottoNumbers()
        this.currentNumbers = this.generateLottoNumbers()
        this.message = "Click the button to play. Note: a single play will simulate 1000 plays."
        this.attempts = 0
        this.bestPlay = []
        this.autoplay = false
        this.playHistory = []
    }

    generateLottoNumbers(numCount = 6) {
        const nums = []

        while (nums.length < numCount) {
            const randomNumber = Math.floor(Math.random() * 70);
            if (!nums.includes(randomNumber)) {
                nums.push(randomNumber)
            }
        }
        nums.sort()
        return nums
    }

    compareNumbers(numArray1, numArray2) {
        var match = true
        var matchingNumbers = []


        for (let i in numArray1) {
            i = Number(i)
            if (numArray1[i] != numArray2[i]) {
                match = false
            } else {
                matchingNumbers.push(numArray1[i])
            }
        }
        
        if (matchingNumbers.length > this.bestPlay.length) {
            this.bestPlay = matchingNumbers
        }

        return match

    }

    playLotto(winningNumbers) {
        var maxAttempts = this.attempts + 1000
        var youWon = false

        // Check for winning numbers while you havent won and are below min attempts
        while ((youWon == false) && (this.attempts < maxAttempts)) {
            if (this.compareNumbers(this.currentNumbers, this.winningNumbers)) {
                youWon = true
            }
            else {
                this.attempts += 1
                this.currentNumbers = this.generateLottoNumbers()
            }
        }

        if (youWon) {
            if (this.attempts == 0) {
                this.attempts = 1
            }
            this.message = `Congrats! You won on ${this.attempts.toLocaleString()} attempts and spent $${(this.attempts * 2).toLocaleString()}`
        } else if (this.autoplay) {
            maxAttempts += 1000
            this.playLotto(winningNumbers)
        } else {  
            this.message = `Sorry, you played ${this.attempts.toLocaleString()} times and spent $${(this.attempts*2).toLocaleString()}.00 but did not win.`
        }
        document.getElementById('message').innerHTML = this.message
        console.log(this.attempts)
        document.getElementById('currentPlay').innerHTML = `Your last play: ${this.currentNumbers.join(", ")}`
        document.getElementById('matchingNumbers').innerHTML = "Numbers hit in your best play: " + game.bestPlay.join(', ')
        
    }

    getButtonText() {
        if (document.getElementById("autoplayCheckbox").checked) {
            document.getElementById("playButton").innerHTML = "Play until you win";
        } else {
            document.getElementById("playButton").innerHTML = "Play 1,000 times";
        }
    }

    setAutoplay() {
        this.autoplay = !this.autoplay
        this.getButtonText()
    }
}
    const game = new LottoGame()

    document.getElementById('winning_numbers').innerHTML = game.winningNumbers.join(", ")
    document.getElementById('message').innerHTML = game.message