import { FormGroup } from "@angular/forms";

export const isValidField = (field: string, form: FormGroup): boolean | null => {
  return form.controls[field].errors && form.controls[field].touched
}

export const getFieldError = (field: string, form: FormGroup): string | null => {

  if (!form.controls[field]) return null;

  const errors = form.controls[field].errors || {};

  for (const key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        return 'Este campo es requerido';

      case 'minlength':
        return `Este campo debe tener mínimo ${errors['minlength'].requiredLength} caracteres`;

      case 'maxlength':
        return `Este campo debe tener Máximo ${errors['maxlength'].requiredLength} caracteres`;

      case 'min':
        return `Este campo debe tener un valor Mínimo de ${errors['min'].min}`;

      case 'min':
        return `Este campo debe tener un valor Máximo de ${errors['max'].max}`;


      default:
        break;
    }
  }

  return null;
}
