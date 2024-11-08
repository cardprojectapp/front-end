import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonButton, IonIcon, IonSkeletonText } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mark-all-as-collected-button',
  standalone: true,
  imports: [IonIcon, IonButton, IonSkeletonText, TranslateModule],
  templateUrl: './mark-all-as-collected-button.component.html',
  styleUrl: './mark-all-as-collected-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkAllAsCollectedButtonComponent {
  isLoading = input.required<boolean>();
  disabled = input.required<boolean>();

  clicked = output<void>();
}
