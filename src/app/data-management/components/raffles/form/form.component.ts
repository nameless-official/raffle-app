import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RaffleStatus } from 'src/app/data-management/interfaces/raffle-status.interface';
import { Raffle, RaffleDTO } from 'src/app/data-management/interfaces/raffle.interface';
import { RaffleStatusService } from 'src/app/data-management/services/raffle-status.service';
import { RafflesService } from 'src/app/data-management/services/raffles.service';
import { isValidField, getFieldError } from 'src/app/shared/utils/forms-validators.util';

@Component({
  selector: 'app-form-raffle',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {


  @Input({ required: true }) dataRecord: Raffle = {
    name: '',
    start_date: '',
    end_date: '',
    description: '',
    slug: '',
    image_url: '',
    image_thumbnail_url: '',
  }

  @Output() successCreate = new EventEmitter<boolean>();
  @Output() successUpdate = new EventEmitter<boolean>();


  private formBuilder = inject(FormBuilder)
  private rafflesService = inject(RafflesService)



  protected formData: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    start_date: [, [Validators.required, Validators.maxLength(50)]],
    end_date: [, [Validators.required]],
    description: ['', [Validators.required]],
    slug: [''],
    raffleStatus: [null],
  })

  protected textButton = signal<string>('Crear')

  protected raffleStatus = signal<RaffleStatus[]>([]);


  private raffleStatusService = inject(RaffleStatusService);


  private imageFile = signal<File>(null)

  ngOnInit(): void {
    this.textButton.set(this.dataRecord.raffle_id ? 'Actualizar' : 'Crear')
    this.formData.controls['name'].setValue(this.dataRecord.name)
    this.formData.controls['start_date'].setValue(this.dataRecord.start_date)
    this.formData.controls['end_date'].setValue(this.dataRecord.end_date)
    this.formData.controls['description'].setValue(this.dataRecord.description)
    this.formData.controls['slug'].setValue(this.dataRecord.slug)

    this.raffleStatusService.getTotalRecords().subscribe(
      {
        next: (responseData: number) => {

          this.raffleStatusService.getAllRecords(0, responseData || 10).subscribe({
            next: (responseData: RaffleStatus[]) => {
              if (responseData) {
                this.raffleStatus.set(responseData)
                this.formData.controls['raffleStatus'].setValue(this.dataRecord.raffleStatus)
              }
            }
          });

        },
      }
    )

  }


  onSubmit() {

    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }


    const dataOfForm: Raffle = { ...this.formData.value }
    const dataForm: RaffleDTO = {
      name: dataOfForm.name,
      start_date: dataOfForm.start_date,
      end_date: dataOfForm.end_date,
      description: dataOfForm.description,
      slug: dataOfForm.slug,
    }

    if (dataOfForm.raffleStatus !== undefined && dataOfForm.raffleStatus !== null) dataForm.raffle_status_id = dataOfForm.raffleStatus.raffle_status_id

    if (!this.dataRecord.raffle_id) {
      if (this.imageFile()) {
        this.rafflesService.uploadImage('raffles', this.imageFile()).subscribe((responseImgUpload: { originalUrl: string; thumbnailUrl: string; }) => {
          if (responseImgUpload) {
            dataForm.image_url = responseImgUpload.originalUrl || ''
            dataForm.image_thumbnail_url = responseImgUpload.thumbnailUrl || ''
            this.rafflesService.createRecord(dataForm).subscribe((dataNewRaffle: Raffle) => {
              if (!dataNewRaffle.raffle_id) return this.successCreate.emit(false)
              this.successCreate.emit(true)
            })
          }
        })
      } else {
        this.rafflesService.createRecord(dataForm).subscribe((dataNewRaffle: Raffle) => {
          if (!dataNewRaffle.raffle_id) return this.successCreate.emit(false)
          this.successCreate.emit(true)
        })
      }
      
    } else {
      const { raffle_id: raffleId } = this.dataRecord

      if (this.imageFile()) {
        this.rafflesService.uploadImage('raffles', this.imageFile()).subscribe((responseImgUpload: { originalUrl: string; thumbnailUrl: string; }) => {

          dataForm.image_url = responseImgUpload.originalUrl || ''
          dataForm.image_thumbnail_url = responseImgUpload.thumbnailUrl || ''

          this.rafflesService.updateRecord(raffleId, dataForm).subscribe((dataResponse: Raffle) => {
            if (!dataResponse) return this.successUpdate.emit(false)

            this.successUpdate.emit(true)
          })
        })
      } else {
        this.rafflesService.updateRecord(raffleId, dataForm).subscribe((dataResponse: Raffle) => {
          if (!dataResponse) return this.successUpdate.emit(false)

          this.successUpdate.emit(true)
        })
      }

    }

  }


  onSelectedImageFile(selectedFile: File): void {
    this.imageFile.set(selectedFile)
  }

  verifyValidatedField(field: string): boolean | null {
    return isValidField(field, this.formData);
  }

  getMessageErrorByField(field: string): string | null {
    return getFieldError(field, this.formData);
  }
}
