import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotated', [
      state('paused', style({ transform: 'rotate(0)' })),
      state('pause-start', style({ transform: 'rotate(0)' })),
      state('pause-end', style({ transform: 'rotate(360deg)', color: 'red' })),
      state('spin-start', style({ transform: 'rotate(0)' })),
      state('spin-end', style({ transform: 'rotate(360deg)', color: 'green' })),
      transition(
        '* => spin-start, * => pause-start, * => paused',
        animate('0s')
      ),
      transition('spin-start => spin-end', animate('1s')),
      transition('paused => spin-end', animate('1s ease-in')),
      transition('pause-start => pause-end', animate('1.5s ease-out'))
    ])
  ]
})
export class AppComponent {
  isRotating = false;
  state: string = 'paused';

  rotate() {
    this.isRotating = !this.isRotating;
    if (this.isRotating) {
      this.state = 'spin-end';
    }
  }

  onRotationComplete() {
    if (this.isRotating) {
      this.state = this.state === 'spin-start' ? 'spin-end' : 'spin-start';
    } else if (this.state === 'pause-start') {
      this.state = 'pause-end';
    } else if (this.state === 'spin-end') {
      this.state = 'pause-start';
    } else if (this.state === 'pause-end') {
      this.state = 'paused';
    }
  }

  toggleState() {}
}
