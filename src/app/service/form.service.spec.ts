import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormService } from './form.service';

describe('FormService', () => {
  let formService: FormService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    formService = TestBed.inject(FormService);
  });

  it('should create the form service', () => {
    expect(formService).toBeTruthy();
  });

  it('should have a form with the expected structure', () => {
    expect(formService.form instanceof FormGroup).toBeTruthy();
  });

  it('should add education to the form', () => {
    formService.addEducation();
    expect(formService.educationFormArray.length).toBe(2);
  });

  it('should add work experience to the form', () => {
    formService.addWorkExperience();
    expect(formService.workExperienceFormArray.length).toBe(2);
  });

  it('should add skills to the form', () => {
    formService.addSkills();
    expect(formService.skillsFormArray.length).toBe(2);
  });
});
