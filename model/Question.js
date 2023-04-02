export class Question {
    /**
     *
     * @param {String} text  ESTE ES EL TEXTO DE LA PREGUNTA
     * @param {String[]} choinces  ESTAS SON LAS OPCIONES
     * @param {String} answer ESTA ES LA REPUESTAS
     */

    constructor(text, choinces, answer) {
        this.text = text
        this.choinces = choinces
        this.answer = answer
    }
    /**
     *
     * @param {String} choice son las opciones que el usuario elige
     * @returns {boolean} esto retorna si la respuesta es correcta o no
     */

    correctAnswer(choice) {
        return choice === this.answer
    }
}
