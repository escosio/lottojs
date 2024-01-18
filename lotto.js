class LottoGame {
    constructor(winningNumbers, currentNumbers, message) {
        this.winningNumbers = this.generateLottoNumbers()
        this.currentNumbers = []
        this.message = "Click the button to play"
    }

    generateLottoNumbers() {
        const nums = []

        while (nums.length <= 6) {
            const randomNumber = Math.floor(Math.random() * 70);
            if (!(randomNumber in nums)) {
                nums.push(randomNumber)
            }
        }
        nums.sort()
        return nums
    }

    playLotto(winningNumbers) {
        this.currentNumbers = this.generateLottoNumbers()
        var attempts = 0

        while (this.currentNumbers != winningNumbers && attempts < 1000) {
            attempts += 1
            this.currentNumbers = this.generateLottoNumbers()
        }

        if (this.currentNumbers != winningNumbers) {
            this.message = `Sorry, you played ${attempts} times and spent $${attempts*2}.00 but did not win.`
            console.log(this.message)
        } else {
            this.message = `Congrats! You won`
            console.log(this.message)
        }
    }
}

