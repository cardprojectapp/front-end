import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonCard, IonCardContent, IonLabel, IonText } from '@ionic/angular/standalone';
import { Card } from '@models/cards.models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-not-existing-card',
  standalone: true,
  imports: [IonLabel, IonCardContent, IonText, IonCard, TranslateModule],
  templateUrl: './not-existing-card.component.html',
  styleUrl: './not-existing-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotExistingCardComponent {
  card = input.required<Card>();

  clickCard = output<string>();

  handleCardClick(cardId: string): void {
    this.clickCard.emit(cardId);
  }
}
