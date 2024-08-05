import { FormlyFieldConfig } from "@ngx-formly/core";

export const emailField: FormlyFieldConfig = {
  key: 'email',
  type: 'input',
  templateOptions: {
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
  },
  validation: {
    messages: {
      required: 'Email is required',
      email: 'Please enter a valid email',
    },
  },
};

export const passwordField: FormlyFieldConfig = {
  key: 'password',
  type: 'input',
  templateOptions: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
  validation: {
    messages: {
      required: 'Password is required',
      minlength: 'Password must be at least 8 characters long',
      maxlength: 'Password must be no longer than 36 characters',
    },
  },
};
