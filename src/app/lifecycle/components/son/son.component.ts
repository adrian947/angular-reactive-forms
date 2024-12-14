import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrl: './son.component.css',
})
export class SonComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public num: number = 0;
  public interval$?: Subscription;
  @Output() public resetNum: EventEmitter<void> = new EventEmitter<void>();


  ngOnInit(): void {
    console.log('ngOnInit desde son');

    this.interval$ = interval(1000).subscribe((value) =>
      console.log('value', value)
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('🚀 ~ changes son:', changes);
    console.log('ngOnChanges desde son');
  }
  ngOnDestroy(): void {
    this.interval$?.unsubscribe();
    this.resetNum.emit();
    console.log('ngOnDestroy desde son');
  }
}
