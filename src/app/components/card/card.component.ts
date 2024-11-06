import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCheckbox, IonLabel, IonSpinner, IonText } from '@ionic/angular/standalone';
import { Card, CardStatus } from '@models/cards.models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    IonText,
    NgClass,
    IonLabel,
    TranslateModule,
    IonCard,
    IonCardContent,
    IonCheckbox,
    IonSpinner,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly status = CardStatus;

  card = input.required<Card>();
  isLoading = input.required<boolean>();
  clickCard = output<string>();
  clickCheckbox = output<string>();
  handleCardClick(cardId: string): void {
    this.clickCard.emit(cardId);
  }

  handleCardCheckboxClick(event: MouseEvent, cardId: string): void {
    event.stopPropagation();

    this.clickCheckbox.emit(cardId);
  }

  handleImageLoadError(event: ErrorEvent): void {
    const target = event.target as HTMLImageElement;

    target.src = 'assets/img/card-load-failed.jpg';
  }
}
