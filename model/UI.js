export class UI {
    constructor() {}

    /**
     *
     * @param {string} text
     */

    showQuestion(text) {
        const questionTitle = document.getElementById('question')
        questionTitle.textContent = text
    }
    /**
     *
     * @param {string[]} choices
     */

    showChoices(choices) {
        const choicesConteiner = document.getElementById('choices')
        console.log(choicesConteiner)

        for (let i = 0; i < choices.length; i++) {
            const button = document.createElement('button')
            button.innerText = 'some button'

            button.className = button

            choicesConteiner.append(button)
        }
    }
}
