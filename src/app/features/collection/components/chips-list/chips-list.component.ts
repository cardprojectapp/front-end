import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
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

@Component({
  selector: 'app-chips-list',
  standalone: true,
  imports: [ChipComponent, TranslateModule],
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

  handleChipClick(card: Card): void {
    if (this.nonExistentCardsMap()?.get(card.id)) {
      const message = this.translateService.instant('collection.card_not_exists.toast');

      this.toastService.open$(message, ToastColor.Medium).pipe(take(1)).subscribe();
    } else {
      this.chipClicked.emit(card);
    }
  }
}
