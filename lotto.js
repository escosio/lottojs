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
        this.message = "Click the button to play"
        this.attempts = 0
    }

    generateLottoNumbers(numCount = 6) {
        const nums = []

        while (nums.length <= numCount) {
            const randomNumber = Math.floor(Math.random() * 70);
            if (!(randomNumber in nums)) {
                nums.push(randomNumber)
            }
        }
        nums.sort()
        return nums
    }

    playLotto(winningNumbers) {
        // this.currentNumbers = this.generateLottoNumbers()
        var maxAttempts = this.attempts + 1000

        while (this.currentNumbers != this.winningNumbers && this.attempts < maxAttempts) {
            this.attempts += 1
            this.currentNumbers = this.generateLottoNumbers()
        }

        if (this.currentNumbers != this.winningNumbers) {
            this.message = `Sorry, you played ${this.attempts} times and spent $${this.attempts*2}.00 but did not win.`
        } else {
            if (this.attempts == 0) {
                this.attempts = 1
            }
            this.message = `Congrats! You won on ${this.attempts} attempts and spent $${this.attempts * 2}`
        }
        document.getElementById('message').innerHTML = this.message
        console.log(this.attempts)
        document.getElementById('currentPlay').innerHTML = `Your last play: ${this.currentNumbers}`
    }
}
    const game = new LottoGame()

    document.getElementById('winning_numbers').innerHTML = game.winningNumbers
    document.getElementById('message').innerHTML = game.message