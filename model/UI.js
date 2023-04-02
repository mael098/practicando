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
     * @param {string[]} choices choices es un array de strings
     */

    showChoices(choices, callback) {
        const choicesConteiner = document.getElementById('choices')

        for (let i = 0; i < choices.length; i++) {
            const button = document.createElement('button')
            button.innerText = choices[i]
            button.className = button
            button.addEventListener('click', () => callback())

            choicesConteiner.append(button)
        }
    }
}
