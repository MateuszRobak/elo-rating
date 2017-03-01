/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/routing-stubs';

import { NavComponent } from './nav.component';


describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let routerStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ], 
      providers: [
        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it ('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should have title ', () => {
    expect(component.title).toEqual('EloRating');
  });

  it ('should render title in navbar header', () => {
    let debugElement = fixture.debugElement.query(By.css('nav div.container a.navbar-brand'));
    expect(debugElement.nativeElement.textContent).toEqual('EloRating');
  });

  it ('should render navbar for user which selected tournament', () => {
    let debugElement = fixture.debugElement.queryAll(By.css('nav ul.navbar-nav li a'));
    expect(debugElement.length).toEqual(3);
    expect(debugElement[0].nativeElement.textContent).toEqual('Dashboard');
    expect(debugElement[1].nativeElement.textContent).toEqual('Rating');    
    expect(debugElement[2].nativeElement.textContent).toEqual('Players');
  });
});
