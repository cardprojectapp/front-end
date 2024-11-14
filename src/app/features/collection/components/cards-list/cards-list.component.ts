import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import {
  CardsLoadingMap,
  NonExistentCardsMap,
} from '@features/collection/store/collection-cards-store/collection-cards.store.models';
import { Card } from '@models/cards.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { take } from 'rxjs';

import { NonExistentCardComponent } from '../not-existing-card/non-existent-card.component';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CardComponent, TranslateModule, NonExistentCardComponent],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsListComponent {
  private readonly translateService = inject(TranslateService);
  private readonly toastService = inject(ToastService);

  cardsList = input.required<Card[] | null>();
  cardsLoadingMap = input.required<CardsLoadingMap>();
  nonExistentCardsMap = input<NonExistentCardsMap | undefined>();
  cardCheckboxClicked = output<Card>();

  handleNonExistentCardClick(): void {
    const message = this.translateService.instant('collection.card_not_exists.toast');

    this.toastService.open$(message, ToastColor.Medium).pipe(take(1)).subscribe();
  }

  handleCheckboxClick(card: Card): void {
    this.cardCheckboxClicked.emit(card);
  }

  isNextCardNonExistent(): boolean {
    return thi
  }
}
