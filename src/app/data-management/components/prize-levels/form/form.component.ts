import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrizeLevel } from 'src/app/data-management/interfaces/prize-level.interface';
import { PrizeLevelsService } from 'src/app/data-management/services/prize-levels.service';
import { isValidField, getFieldError } from 'src/app/shared/utils/forms-validators.util';

@Component({
  selector: 'app-form-prize-level',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormPrizeLevelComponent {

  @Input({ required: true }) dataRecord: PrizeLevel = {
    grouper: '',
    code: '',
    name: '',
    sort: 0
  }

  @Output() successCreate = new EventEmitter<boolean>();
  @Output() successUpdate = new EventEmitter<boolean>();


  private formBuilder = inject(FormBuilder)
  private prizeLevelsService = inject(PrizeLevelsService)


  protected formData: FormGroup = this.formBuilder.group({
    code: ['', [Validators.required, Validators.maxLength(50)]],
    name: ['', [Validators.required, Validators.maxLength(50)]],
    sort: [, [Validators.required, Validators.min(1)]],
    grouper: ['', [Validators.required, Validators.maxLength(50)]],
  })

  protected textButton = signal<string>('Crear')


  ngOnInit(): void {
    this.textButton.set(this.dataRecord.prize_level_id ? 'Actualizar' : 'Crear')
    this.formData.controls['code'].setValue(this.dataRecord.code)
    this.formData.controls['name'].setValue(this.dataRecord.name)
    this.formData.controls['sort'].setValue(this.dataRecord.sort)
    this.formData.controls['grouper'].setValue(this.dataRecord.grouper)
  }


  onSubmit() {

    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    if (!this.dataRecord.prize_level_id) {
      delete this.dataRecord.prize_level_id

      this.prizeLevelsService.createRecord(this.formData.value).subscribe((dataResponse: PrizeLevel) => {
        if (dataResponse.prize_level_id) {
          this.successCreate.emit(true)
        } else {
          this.successCreate.emit(false)
        }
      })
    } else {
      const { prize_level_id: prizeLevelId } = this.dataRecord
      this.prizeLevelsService.updateRecord(prizeLevelId, this.formData.value).subscribe((dataResponse: any) => {
        if (dataResponse) {
          this.successUpdate.emit(true)
        } else {
          this.successUpdate.emit(false)
        }
      })
    }
  }

  verifyValidatedField(field: string): boolean | null {
    return isValidField(field, this.formData);
  }

  getMessageErrorByField(field: string): string | null {
    return getFieldError(field, this.formData);
  }
}
