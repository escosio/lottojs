// class LottoGame {
//     constructor(winningNumbers, currentNumbers, message) {
//         this.winningNumbers = this.generateLottoNumbers()
//         this.currentNumbers = []
//         this.message = "Click the button to play"
//     }

//     generateLottoNumbers() {
//         const nums = []

//         while (nums.length <= 6) {
//             const randomNumber = Math.floor(Math.random() * 70);
//             if (!(randomNumber in nums)) {
//                 nums.push(randomNumber)
//             }
//         }
//         nums.sort()
//         return nums
//     }

//     playLotto(winningNumbers) {
//         this.currentNumbers = this.generateLottoNumbers()
//         var attempts = 0

//         while (this.currentNumbers != winningNumbers && attempts < 1000) {
//             attempts += 1
//             this.currentNumbers = this.generateLottoNumbers()
//         }

//         if (this.currentNumbers != winningNumbers) {
//             this.message = `Sorry, you played ${attempts} times and spent $${attempts*2}.00 but did not win.`
//             console.log(this.message)
//         } else {
//             this.message = `Congrats! You won`
//             console.log(this.message)
//         }
//     }
// }

class LottoGame {
    constructor(winningNumbers, currentNumbers, message, attempts) {
        this.winningNumbers = this.generateLottoNumbers()
        this.currentNumbers = this.generateLottoNumbers()
        // to test if function works correctly, comment out line below:
        // this.currentNumbers = this.winningNumbers
        this.message = "Click the button to play. Note: a single play will simulate 1000 plays."
        this.attempts = 0
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

        for (let i = 0; i <= numArray1.length; i++) {
            if (numArray1[i] != numArray2[i]) {
                return false
            }
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
        document.getElementById('currentPlay').innerHTML = `Your last play: ${this.currentNumbers}`
    }
}
    const game = new LottoGame()

    document.getElementById('winning_numbers').innerHTML = game.winningNumbers
    document.getElementById('message').innerHTML = game.message