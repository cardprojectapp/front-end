import { ChangeDetectionStrategy, Component, Signal, computed, inject, input, output } from '@angular/core';
import { ChipComponent } from '@components/chip/chip.component';
import {
  CardsLoadingMap,
  NonExistentCardsMap,
} from '@features/collection/store/collection-cards-store/collection-cards.store.models';
import { Card } from '@models/cards.models';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { take } from 'rxjs';

import { NonExistentChipComponent } from '../non-existent-chip/non-existent-chip.component';

@Component({
  selector: 'app-chips-list',
  standalone: true,
  imports: [ChipComponent, TranslateModule, NonExistentChipComponent],
  templateUrl: './chips-list.component.html',
  styleUrl: './chips-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsListComponent {
  private readonly translateService = inject(TranslateService);
  private readonly toastService = inject(ToastService);

  cardsList = input.required<Card[]>();
  cardsLoadingMap = input.required<CardsLoadingMap>();
  nonExistentCardsMap = input.required<NonExistentCardsMap | undefined>();
  chipClicked = output<Card>();

  existentCardsByNumbersMap = computed(() => {
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

  handleNonExistentChipClick(): void {
    const message = this.translateService.instant('collection.card_not_exists.toast');

    this.toastService.open$(message, ToastColor.Medium).pipe(take(1)).subscribe();
  }
}
