import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  onStartQuiz(f: NgForm) {
    const theName = f.value['name'];

    localStorage.setItem('theName', JSON.stringify(theName));
    this.router.navigate(['/question']);
  }
}
