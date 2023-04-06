import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { OptionModel, QuestionModel } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  name: string;
  allQuestions: QuestionModel[];
  currentQuestion: number = 0;
  counter: number = 60;
  totalPoints: number = 0;
  correctAnswers: number = 0;
  inCorrectAnwsers: number = 0;
  interval$: any;
  progress: number = 0;
  showResult: boolean = false;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('theName'));

    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestions().subscribe((data) => {
      this.allQuestions = data.questions;
    });
  }

  nextQuestion() {
    if (this.currentQuestion < 8) {
      this.currentQuestion += 1;
      this.resetCounter();
      this.getProcessPercentage();
    } else {
      this.showResult = true;
    }
  }

  prevQuestion() {
    if (this.currentQuestion >= 1) {
      this.currentQuestion -= 1;
    }
  }

  answer(option: OptionModel) {
    setTimeout(() => {
      if (option.correct) {
        this.totalPoints += 10;
        this.correctAnswers += 1;
      } else {
        this.totalPoints -= 10;
        this.inCorrectAnwsers += 1;
      }

      this.nextQuestion();
    }, 1000);
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter -= 1;

      if (this.counter === 0) {
        this.nextQuestion();
        this.counter = 60;
        this.totalPoints -= 10;
        this.inCorrectAnwsers += 1;
      }
    });
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.totalPoints = 0;
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.inCorrectAnwsers = 0;
    this.progress = 0;
  }

  getProcessPercentage() {
    this.progress =
      ((this.currentQuestion + 1) / this.allQuestions.length) * 100;
  }
}
