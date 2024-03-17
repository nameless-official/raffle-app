import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParticipantService } from 'src/app/raffle/services/participant.service';
import { isValidField, getFieldError } from 'src/app/shared/utils/forms-validators.util';

@Component({
  selector: 'app-participation-form',
  templateUrl: './participation-form.component.html',
  styleUrls: ['./participation-form.component.scss']
})
export class ParticipationFormComponent {
  @Input({ required: true }) raffleId: number = 0;
  @Output() acceptedRequest: EventEmitter<boolean> = new EventEmitter<boolean>();

  private formBuilder = inject(FormBuilder)
  private participantServices = inject(ParticipantService)
  protected dataRecord: Record<string, any> = {}

  protected formData: FormGroup = this.formBuilder.group({
    discord_user_id: [, [Validators.required]],
  })

  protected textButton = signal<string>('Participar')


  ngOnInit(): void {
  }


  onSubmit() {

    const dataOfForm: any = { ...this.formData.value }
    const newDataRequest: any = {
      raffle_id: this.raffleId,
      discord_user_id: dataOfForm.discord_user_id,
    }

    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }


    this.participantServices.createParticipationRequest(newDataRequest).subscribe((dataResponse) => {
      if (dataResponse) {
        this.acceptedRequest.emit(true)
      } else {
        this.acceptedRequest.emit(false)
      }
    })

  }

  verifyValidatedField(field: string): boolean | null {
    return isValidField(field, this.formData);
  }

  getMessageErrorByField(field: string): string | null {
    return getFieldError(field, this.formData);
  }


}
