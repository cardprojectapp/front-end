import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonCard, IonCardContent, IonLabel, IonText } from '@ionic/angular/standalone';
import { NonExistentCard } from '@models/cards.models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-non-existent-card',
  standalone: true,
  imports: [IonLabel, IonCardContent, IonText, IonCard, TranslateModule],
  templateUrl: './non-existent-card.component.html',
  styleUrl: './non-existent-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonExistentCardComponent {
  card = input.required<NonExistentCard | undefined>();

  clickCard = output<string>();

  handleCardClick(cardId: string): void {
    this.clickCard.emit(cardId);
  }
}
