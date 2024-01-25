class LottoGame {
    constructor(winningNumbers, currentNumbers, message, attempts) {
        this.winningNumbers = this.generateLottoNumbers()
        this.currentNumbers = this.generateLottoNumbers()
        // to test if function works correctly, comment out line below:
        // this.currentNumbers = this.winningNumbers
        this.message = "Click the button to play. Note: a single play will simulate 1000 plays."
        this.attempts = 0
        this.bestPlay = []
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
                // return false
            } else {
                // matchingNumbers += 1
                matchingNumbers.push(numArray1[i])
            }
        }
        
        // console.log(matchingNumbers)
        if (matchingNumbers.length > this.bestPlay.length) {
            this.bestPlay = matchingNumbers
        }

        return match

    }

    playLotto(winningNumbers) {
        // this.currentNumbers = this.generateLottoNumbers()
        var maxAttempts = this.attempts + 1000
        var youWon = false

        while ((youWon == false) && (this.attempts < maxAttempts)) {
            if (this.compareNumbers(this.currentNumbers, this.winningNumbers)) {
                youWon = true
            } else {
                this.attempts += 1
                // document.getElementById('attempts').innerHTML = "Attempts: " + this.attempts
                this.currentNumbers = this.generateLottoNumbers()
            }
        }

        if (youWon) {
            if (this.attempts == 0) {
                this.attempts = 1
            }
            this.message = `Congrats! You won on ${this.attempts.toLocaleString()} attempts and spent $${(this.attempts * 2).toLocaleString()}`
        } else {
            this.message = `Sorry, you played ${this.attempts.toLocaleString()} times and spent $${(this.attempts*2).toLocaleString()}.00 but did not win.`
        }
        document.getElementById('message').innerHTML = this.message
        console.log(this.attempts)
        document.getElementById('currentPlay').innerHTML = `Your last play: ${this.currentNumbers.join(", ")}`
        document.getElementById('matchingNumbers').innerHTML = "Numbers hit in your best play: " + game.bestPlay.join(', ')
    }
}
    const game = new LottoGame()

    document.getElementById('winning_numbers').innerHTML = game.winningNumbers.join(", ")
    document.getElementById('message').innerHTML = game.message