import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-chips-list-skeleton',
  standalone: true,
  imports: [IonSkeletonText],
  templateUrl: './chips-list-skeleton.component.html',
  styleUrl: './chips-list-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsListSkeletonComponent {
  skeletons = new Array(12).fill(0);
}
