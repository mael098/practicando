//@ts-check
import { questions } from './data/question.js'
import { Quiz } from './model/Quiz.js'
import { UI } from './model/UI.js'

function main() {
    // @ts-ignore
    const quiz = new Quiz(questions)
    const ui = new UI()

    ui.showQuestion(quiz.getQuestionIndex().text)
    ui.showChoices(quiz.getQuestionIndex().choinces, () => console.log('something!'))
}

main()
