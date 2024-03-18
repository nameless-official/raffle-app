import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RaffleStatus } from 'src/app/data-management/interfaces/raffle-status.interface';
import { RaffleStatusService } from 'src/app/data-management/services/raffle-status.service';
import { isValidField, getFieldError } from 'src/app/shared/utils/forms-validators.util';

@Component({
  selector: 'app-form-raffle-status',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormRaffleStatusComponent {


  @Input({ required: true }) dataRecord: RaffleStatus = {
    code: '',
    name: '',
    sort: 1,
    is_finished: false
  }
  @Output() successCreate = new EventEmitter<boolean>();
  @Output() successUpdate = new EventEmitter<boolean>();


  private formBuilder = inject(FormBuilder)
  private raffleStatussService = inject(RaffleStatusService)


  protected formData: FormGroup = this.formBuilder.group({
    code: ['', [Validators.required, Validators.maxLength(50)]],
    name: ['', [Validators.required, Validators.maxLength(50)]],
    sort: [, [Validators.required, Validators.min(1)]],
    is_finished: [false],
  })

  protected textButton = signal<string>('Crear')


  ngOnInit(): void {
    this.textButton.set(this.dataRecord.raffle_status_id ? 'Actualizar' : 'Crear')
    this.formData.controls['code'].setValue(this.dataRecord.code)
    this.formData.controls['name'].setValue(this.dataRecord.name)
    this.formData.controls['sort'].setValue(this.dataRecord.sort)
    this.formData.controls['is_finished'].setValue(this.dataRecord.is_finished)
  }


  onSubmit() {

    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    if (!this.dataRecord.raffle_status_id) {
      delete this.dataRecord.raffle_status_id

      this.raffleStatussService.createRecord(this.formData.value).subscribe((dataResponse: RaffleStatus) => {
        if (dataResponse.raffle_status_id) {
          this.successCreate.emit(true)
        } else {
          this.successCreate.emit(false)
        }
      })
    } else {
      const { raffle_status_id: raffleStatusId } = this.dataRecord
      this.raffleStatussService.updateRecord(raffleStatusId, this.formData.value).subscribe((dataResponse: any) => {
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
