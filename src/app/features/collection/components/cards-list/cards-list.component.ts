import { ChangeDetectionStrategy, Component, Signal, computed, inject, input, output } from '@angular/core';
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

import { NonExistentCardComponent } from '../non-existent-card/non-existent-card.component';

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

  cardsList = input.required<Card[]>();
  cardsLoadingMap = input.required<CardsLoadingMap>();
  nonExistentCardsMap = input<NonExistentCardsMap | undefined>();
  cardCheckboxClicked = output<Card>();

  existentCardsByNumbersMap: Signal<Record<number, Card>> = computed(() => {
    return this.cardsList()?.reduce((memo: Record<number, Card>, card: Card) => {
      const cardNumber = card.serial_number.split('-').at(-1);
      memo[Number(cardNumber)] = card;

      return memo;
    }, {});
  });

  cardsPlacesToRender: Signal<void[]> = computed(() => {
    if (this.cardsList()?.length === 0) return [];

    const nonExistentCardsAmout = Object.values(this.nonExistentCardsMap() ?? {}).length;
    const existedCardsAmount = this.cardsList()!.length;
    const cardsTotal = nonExistentCardsAmout + existedCardsAmount;

    return Array(cardsTotal);
  });

  trackByCardId(cardNumber: number) {
    return this.nonExistentCardsMap()?.[cardNumber]?.id ?? this.existentCardsByNumbersMap()?.[cardNumber].id;
  }

  handleNonExistentCardClick(): void {
    const message = this.translateService.instant('collection.card_not_exists.toast');

    this.toastService.open$(message, ToastColor.Medium).pipe(take(1)).subscribe();
  }

  handleCheckboxClick(card: Card): void {
    this.cardCheckboxClicked.emit(card);
  }
}
