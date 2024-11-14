import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CardsLoadingMap, NonExistentCardsMap } from '@features/collection/store/collection-cards-store/collection-cards.store.models';
import { IonSpinner } from '@ionic/angular/standalone';
import { Card } from '@models/cards.models';
import { TranslateModule } from '@ngx-translate/core';

import { CardsListComponent } from '../cards-list/cards-list.component';
import { CardsListSkeletonComponent } from '../cards-list-skeleton/cards-list-skeleton.component';
import { CollectionFetchErrorComponent } from '../collection-fetch-error/collection-fetch-error.component';
import { MarkAllAsCollectedButtonComponent } from '../mark-all-as-collected-button/mark-all-as-collected-button.component';

@Component({
  selector: 'app-collection-cards-view',
  standalone: true,
  imports: [
    IonSpinner,
    TranslateModule,
    CollectionFetchErrorComponent,
    CardsListSkeletonComponent,
    CardsListComponent,
    MarkAllAsCollectedButtonComponent,
  ],
  templateUrl: './collection-cards-view.component.html',
  styleUrl: './collection-cards-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionCardsViewComponent {
  error = input.required<string | undefined>();
  isLoading = input.required<boolean>();
  cardsLoadingMap = input.required<CardsLoadingMap>();
  nonExistentCardsMap = input.required<NonExistentCardsMap | undefined>();
  cards = input.required<Card[]>();

  cardStatusUpdated = output<Card>();
  tryAgainClicked = output<void>();

  handleCardStatusUpdate(card: Card): void {
    this.cardStatusUpdated.emit(card);
  }

  handleTryAgainClick(): void {
    this.tryAgainClicked.emit();
  }
}
