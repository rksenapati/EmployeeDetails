import { FormArray, FormControl, FormGroup } from "@angular/forms"

export interface employeefromModel {
    personalInfo: ModelFormGroup<personalInfoModel>,
    workExperienceForm: ModelFormGroup<workExperienceFormModel>,
    educationForm: ModelFormGroup<educationFormModel>,
    skillsForm: ModelFormGroup<skilldFormModel>
  }
  export interface personalInfoModel {
    fullName: string,
    email: string,
    phone: string,
    language: string
  }
  
  export interface workExperienceFormModel {
    workExperience: ModelFormArray<workExperienceFormArrayModel>
  }
  export interface workExperienceFormArrayModel {
    companyName: string,
    role: string,
    startDate: string,
    endDate: string
  }
  export interface educationFormModel {
    education: educationFormArrayModel[]
  }
  export interface educationFormArrayModel {
    instituteName: string,
    instituteType: string,
    degree: string,
    date: string
  }
  export interface skilldFormModel {
    skills: skillsFormArrayModel[]
  }
  export interface skillsFormArrayModel {
    skillName: string,
    skillLevel: string
  }
  export type ModelFormGroup<T> = FormGroup<{
    [K in keyof T]: FormControl<T[K] | null>;
  }>;
  export type ModelFormArray<T> = FormArray<ModelFormGroup<T>>;