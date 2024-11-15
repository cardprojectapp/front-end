import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonChip, IonLabel } from '@ionic/angular/standalone';
import { NonExistentCard } from '@models/cards.models';

@Component({
  selector: 'app-non-existent-chip',
  standalone: true,
  imports: [IonLabel, IonChip],
  templateUrl: './non-existent-chip.component.html',
  styleUrl: './non-existent-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonExistentChipComponent {
  card = input.required<NonExistentCard | undefined>();
  clickChip = output<string>();
}
