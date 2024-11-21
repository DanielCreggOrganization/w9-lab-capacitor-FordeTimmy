import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CameraService } from '../services/camera.service';
import { LocationService } from '../services/location.service';
import { DeviceInfoService } from '../services/device-info.service';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class HomePage implements OnInit {
  photo: string | undefined = undefined;
  location: { latitude: number; longitude: number } | undefined = undefined;
  deviceInfo: any = {};
  deviceInfoKeys: string[] = []; // Precomputed keys for @for
  networkStatus: any | undefined;

  constructor(
    private cameraService: CameraService,
    private locationService: LocationService,
    private deviceInfoService: DeviceInfoService
  ) {}

  async ngOnInit() {
    // Initialize network status
    this.networkStatus = await Network.getStatus();
    Network.addListener('networkStatusChange', (status) => {
      this.networkStatus = status;
    });

    // Fetch device info and prepare keys for @for
    this.deviceInfo = await this.deviceInfoService.getDeviceInfo();
    this.deviceInfoKeys = Object.keys(this.deviceInfo); // Compute keys here
  }

  async takePicture() {
    this.photo = await this.cameraService.takePicture();
  }

  async getLocation() {
    this.location = await this.locationService.getCurrentPosition();
  }
  async getDeviceInfo() {
    this.deviceInfo = await this.deviceInfoService.getDeviceInfo();
    this.deviceInfoKeys = Object.keys(this.deviceInfo); // Update keys whenever device info changes
  }
  
}
