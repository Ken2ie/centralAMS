import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoaderSpinnerComponent {
  constructor(public loader: LoaderService) { }
}
