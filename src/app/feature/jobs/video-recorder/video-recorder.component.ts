import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrls: ['./video-recorder.component.scss']
})
export class VideoRecorderComponent {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef;
  private mediaRecorder!: MediaRecorder;
  private recordedChunks: any[] = [];
  display: boolean = false;

  constructor(private http: HttpClient) {}

  showDialog() {
    this.display = true;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.videoElement.nativeElement.srcObject = stream;
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        this.startRecording();
      });
  }

  startRecording() {
    this.recordedChunks = [];
    this.mediaRecorder.start();
  }

  stopRecording() {
    this.mediaRecorder.stop();
  }

  endCall() {
    this.stopRecording();
    const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', blob, 'recording.webm');

    this.http.post('YOUR_API_ENDPOINT', formData).subscribe(response => {
      console.log('Video uploaded successfully');
    });

    this.display = false;
  }
}
