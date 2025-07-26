import {
  Component,
  ViewChild,
  AfterViewInit,
  ViewContainerRef,
  ComponentRef,
  OnInit,
  Input,
  EventEmitter,
  Output,
  Injector,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StepConfig } from './models/step-config.model';
import { FormStepComponent } from './models/form-step-cponent.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, AfterViewInit {
  @Input() steps: StepConfig[] = [];
  @Input() formGroup!: FormGroup;
  @Input() formGroupConfigs!: any;
  @Input() data: any = {};

  @Output() onTransitionComplete = new EventEmitter<FormGroup>();
  @Output() onSelectedIndexChanged = new EventEmitter<number>();

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true })
  dynamicComponentContainer!: ViewContainerRef;

  currentIndex: number = 0;
  currentFormGroup!: FormGroup;
  componentRefs: ComponentRef<FormStepComponent>[] = [];
  animationDirection: 'slide-left' | 'slide-right' = 'slide-left';
  visitedSteps: Set<number> = new Set([0]); // First step is always visited

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.steps = this.steps.sort((a: StepConfig, b: StepConfig) => a.order - b.order);

    this.steps.forEach((step) => {
      if (this.formGroupConfigs[step.index]) {
        this.formGroup.addControl(step.index, this.formGroupConfigs[step.index]);
      } else {
        this.formGroup.addControl(step.index, this.fb.group({}));
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeStepComponent(this.currentIndex);
  }

  initializeStepComponent(index: number): void {
    this.dynamicComponentContainer.clear();

    const step = this.steps[index];
    const injector = Injector.create({
      providers: [{ provide: StepperComponent, useValue: this }],
      parent: this.dynamicComponentContainer.injector,
    });

    const componentRef = this.dynamicComponentContainer.createComponent(step.component as any, {
      injector,
    }) as ComponentRef<FormStepComponent>;

    const stepFormGroup = this.formGroup.get(step.index) as FormGroup;
    componentRef.instance.formGroup = stepFormGroup;
    componentRef.instance.globalFormGroup = this.formGroup;
    componentRef.instance.data = this.data;

    this.currentFormGroup = stepFormGroup;
    this.componentRefs = [componentRef];
  }

  nextStep(): void {
    if (this.currentIndex < this.steps.length - 1) {
      this.animationDirection = 'slide-left';
      if (this.currentFormGroup.valid) {
        this.currentIndex++;
        this.visitedSteps.add(this.currentIndex);
        this.initializeStepComponent(this.currentIndex);
        this.onSelectedIndexChanged.emit(this.currentIndex);
        this.onTransitionComplete.emit(this.currentFormGroup);
      } else {
        this.currentFormGroup.markAllAsTouched();
      }
    }
  }

  previousStep(): void {
    if (this.currentIndex > 0) {
      this.animationDirection = 'slide-right';
      this.currentIndex--;
      this.initializeStepComponent(this.currentIndex);
      this.onSelectedIndexChanged.emit(this.currentIndex);
      this.onTransitionComplete.emit(this.currentFormGroup);
    }
  }

  goToStep(index: number): void {
    if (index >= 0 && index < this.steps.length && this.canAccessStep(index)) {
      this.animationDirection = index > this.currentIndex ? 'slide-left' : 'slide-right';
      this.currentIndex = index;
      this.initializeStepComponent(index);
      this.onSelectedIndexChanged.emit(index);
    }
  }

  canAccessStep(index: number): boolean {
    return this.visitedSteps.has(index) || index === this.currentIndex;
  }

  isStepClickable(index: number): boolean {
    return this.visitedSteps.has(index) && index !== this.currentIndex;
  }

  getProgressPercentage(): number {
    return ((this.currentIndex + 1) / this.steps.length) * 100;
  }

  getStepDescription(index: number): string {
    const descriptions = [
      'Review your cart items',
      'Enter delivery address',
      'Complete payment'
    ];
    return descriptions[index] || '';
  }

  ngOnDestroy(): void {
    this.componentRefs.forEach(ref => ref.destroy());
  }
}
