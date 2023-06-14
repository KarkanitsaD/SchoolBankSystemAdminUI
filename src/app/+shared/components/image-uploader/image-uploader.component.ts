import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FileModel } from "../../models/file.model";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  imports: [
    MatIconModule,
    MatButtonModule,
    NgIf
  ],
  standalone: true
})
export class ImageUploaderComponent {
  @Input() imageSrc = '';

  @Output() imageUpload = new EventEmitter<FileModel>();

  onResetImage(): void {
    this.imageSrc = '';
    this.imageUpload.emit(null);
  }

  onFileUpload(event: any): void {
    if (!event.target.files.length) {
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result as string;

      let firstExtensionIndex = this.imageSrc.indexOf(':');
      let secondExtensionIndex = this.imageSrc.indexOf(';');
      let base64Index = this.imageSrc.indexOf(';base64,') + ';base64,'.length;

      const base64 = this.imageSrc.substring(base64Index);
      const extension = this.imageSrc.substring(firstExtensionIndex + 1, secondExtensionIndex);

      this.imageUpload.emit(new FileModel({ base64, extension }));
    };
  }
}
