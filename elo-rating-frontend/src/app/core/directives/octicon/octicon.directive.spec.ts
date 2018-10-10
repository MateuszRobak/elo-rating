import { OcticonDirective } from './octicon.directive';
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Component, DebugElement, ElementRef, Renderer2} from "@angular/core";
import {By} from "@angular/platform-browser";

@Component({
  selector: 'app-test-octicon-component',
  template: `
    <style>
      .color-red {color: rgb(255, 0, 0)}
    </style>
    <span appOcticon="book"></span>
    <span class="color-red" appOcticon="alert"></span>
    <span appOcticon="gear" size="lg"></span>
    <span appOcticon="no-existing"></span>
  `
})
class TestOcticonComponent { }

class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

describe('OcticonDirective', () => {

  let fixture: ComponentFixture<TestOcticonComponent>;
  let component: TestOcticonComponent;
  let icons: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestOcticonComponent, OcticonDirective],
      providers: [
        Renderer2,
        { provide: ElementRef, useClass: MockElementRef }
      ]
    });

    fixture = TestBed.createComponent(TestOcticonComponent);
    component = fixture.componentInstance;
    icons = fixture.debugElement.queryAll(By.directive(OcticonDirective));
    fixture.detectChanges();
  }));

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have icon', () => {
    const icon = icons[0];
    expect(icon.attributes['appOcticon']).toEqual('book');
  });

  it('should have icon with color inherited from parent element', () => {
    const icon = icons[1];
    expect(icon.attributes['appOcticon']).toEqual('alert');
    let iconColor = getComputedStyle(icon.nativeElement).color;
    expect(iconColor).toEqual('rgb(255, 0, 0)');
  });

  it('should have icon size large', () => {
    const icon = icons[2];
    expect(icon.attributes['appOcticon']).toEqual('gear');
    expect(icon.attributes['size']).toEqual('lg');
  });
});
