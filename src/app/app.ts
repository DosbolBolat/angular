import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'About Our Team';
  mission = 'We build delightful software';

  photoUrl ='assets/team.jpeg';
  likes = 0;
  showThanks = false;

  name = '';
  email = '';
  subscribedMessage = '';

  like(){
    this.likes++;
  }

  resetLikes(){
    this.likes = 0;
  }

  toggleThanks(){
    this.showThanks = !this.showThanks;
  }

  subscribe(){
    if(!this.email) return;
    this.subscribedMessage = `Thanks, ${this.email}, we’ll be in touch!`;
    this.email = '';
  }
}
