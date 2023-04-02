import { Question } from './Question.js'

export class Quiz {
    Questionindex = 0
    score = 0
    /**
     *
     * @param {Question} questions
     */

    constructor(questions) {
        this.questions = questions
    }
    /**
     *
     * @returns {Question}
     *
     */
    getQuestionIndex() {
        return this.questions[this.Questionindex]
    }
    isEnded() {
        return this.questions.length === this.Questionindex
    }

    /**
     *
     * @param {string} answer
     */
    guess(answer) {
        if (this.getQuestionIndex().correctAnswer(answer)) {
            this.score++
        }
        this.Questionindex++
    }
}
