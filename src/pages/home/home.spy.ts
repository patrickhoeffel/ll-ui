import {Directive, OnDestroy, OnInit} from "@angular/core";
/**
 * Created by patrick.hoeffel on 7/1/2017.
 */
// Spy on any element to which it is applied.
// Usage: <div mySpy>...</div>
@Directive({selector: '[itemSpy]'})
export class SpyDirective implements OnInit, OnDestroy {

  constructor() {

  }

  ngOnInit() {
    alert('Item OnInit()');
  }

  ngOnDestroy() {

  }

}
