import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prize, PrizeDTO } from 'src/app/data-management/interfaces/prize.interface';
import { isValidField, getFieldError } from 'src/app/shared/utils/forms-validators.util';
import { PrizesService } from 'src/app/data-management/services/prizes.service';
import { PrizeLevel } from 'src/app/data-management/interfaces/prize-level.interface';
import { Raffle } from 'src/app/data-management/interfaces/raffle.interface';
import { PrizeLevelsService } from 'src/app/data-management/services/prize-levels.service';
import { RafflesService } from 'src/app/data-management/services/raffles.service';

@Component({
  selector: 'app-form-prize',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormPrizeComponent {


  @Input({ required: true }) dataRecord: Prize = {
    name: '',
    value: '',
    quantity: 0,
    description: '',
    image_url: '',
    image_thumbnail_url: '',
  }

  @Output() successCreate = new EventEmitter<boolean>();
  @Output() successUpdate = new EventEmitter<boolean>();


  private formBuilder = inject(FormBuilder)
  private prizesService = inject(PrizesService)


  protected formData: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    value: [, [Validators.required, Validators.min(1)]],
    quantity: [, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required]],
    prizeLevel: [null],
    raffle: [null],
  })

  protected textButton = signal<string>('Crear')

  protected prizeLevels = signal<PrizeLevel[]>([]);
  protected raffles = signal<Raffle[]>([]);


  private prizeLevelsService = inject(PrizeLevelsService);
  private rafflesService = inject(RafflesService);


  private imageFile = signal<File>(null)

  ngOnInit(): void {
    this.textButton.set(this.dataRecord.prize_id ? 'Actualizar' : 'Crear')
    this.formData.controls['name'].setValue(this.dataRecord.name)
    this.formData.controls['value'].setValue(this.dataRecord.value)
    this.formData.controls['quantity'].setValue(this.dataRecord.quantity)
    this.formData.controls['description'].setValue(this.dataRecord.description)

    this.prizeLevelsService.getTotalRecords().subscribe(
      {
        next: (responseData: number) => {

          this.prizeLevelsService.getAllRecords(0, responseData || 10).subscribe({
            next: (responseData: PrizeLevel[]) => {
              if (responseData) {
                this.prizeLevels.set(responseData)
                this.formData.controls['prizeLevel'].setValue(this.dataRecord.prizeLevel)
              }
            }
          });

        },
      }
    )

    this.rafflesService.getTotalRecords().subscribe(
      {
        next: (responseData: number) => {

          this.rafflesService.getAllRecords(0, responseData || 10).subscribe({
            next: (responseData: Raffle[]) => {
              if (responseData) {
                this.raffles.set(responseData)
                this.formData.controls['raffle'].setValue(this.dataRecord.raffle)
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


    const dataOfForm: Prize = { ...this.formData.value }
    const dataForm: PrizeDTO = {
      name: dataOfForm.name,
      value: dataOfForm.value,
      quantity: dataOfForm.quantity,
      description: dataOfForm.description,
    }

    if (dataOfForm.prizeLevel !== undefined && dataOfForm.prizeLevel !== null) dataForm.prize_level_id = dataOfForm.prizeLevel.prize_level_id
    if (dataOfForm.raffle !== undefined && dataOfForm.raffle !== null) dataForm.raffle_id = dataOfForm.raffle.raffle_id

    if (!this.dataRecord.prize_id) {
      if (this.imageFile()) {
        this.prizesService.uploadImage('prizes', this.imageFile()).subscribe((responseImgUpload: { originalUrl: string; thumbnailUrl: string; }) => {
          if (responseImgUpload) {
            dataForm.image_url = responseImgUpload.originalUrl || ''
            dataForm.image_thumbnail_url = responseImgUpload.thumbnailUrl || ''
            this.prizesService.createRecord(dataForm).subscribe((dataNewRaffle: Prize) => {
              if (!dataNewRaffle.prize_id) return this.successCreate.emit(false)
              this.successCreate.emit(true)
            })
          }
        })
      } else {
        this.prizesService.createRecord(dataForm).subscribe((dataNewRaffle: Prize) => {
          if (!dataNewRaffle.prize_id) return this.successCreate.emit(false)
          this.successCreate.emit(true)
        })
      }

    } else {
      const { prize_id: prizeId } = this.dataRecord

      if (this.imageFile()) {
        this.prizesService.uploadImage('prizes', this.imageFile()).subscribe((responseImgUpload: { originalUrl: string; thumbnailUrl: string; }) => {

          dataForm.image_url = responseImgUpload.originalUrl || ''
          dataForm.image_thumbnail_url = responseImgUpload.thumbnailUrl || ''

          this.prizesService.updateRecord(prizeId, dataForm).subscribe((dataResponse: Prize) => {
            if (!dataResponse) return this.successUpdate.emit(false)

            this.successUpdate.emit(true)
          })
        })
      } else {
        this.prizesService.updateRecord(prizeId, dataForm).subscribe((dataResponse: Prize) => {
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
