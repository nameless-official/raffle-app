import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent {
  @Output() selectedImageFile: EventEmitter<File> = new EventEmitter<File>();
  @Input({ required: true }) imageAlt: string = ''
  @Input() selectedImage: string | undefined | null = undefined

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        this.selectedImage = result;
      };

      reader.readAsDataURL(file);
      this.selectedImageFile.emit(reader.DONE ? file : null)
    }
  }
}
