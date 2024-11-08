import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CardsLoadingMap } from '@features/collection/store/collection-cards-store/collection-cards.store.models';
import { IonSpinner } from '@ionic/angular/standalone';
import { Card } from '@models/cards.models';

import { CardsListComponent } from '../cards-list/cards-list.component';
import { CardsListSkeletonComponent } from '../cards-list-skeleton/cards-list-skeleton.component';
import { CollectionFetchErrorComponent } from '../collection-fetch-error/collection-fetch-error.component';

@Component({
  selector: 'app-search-cards-view',
  standalone: true,
  imports: [IonSpinner, CollectionFetchErrorComponent, CardsListComponent, CardsListSkeletonComponent],
  templateUrl: './search-cards-view.component.html',
  styleUrl: './search-cards-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCardsViewComponent {
  isLoading = input.required<boolean>();
  cardsLoadingMap = input.required<CardsLoadingMap>();
  cards = input.required<Card[]>();

  cardStatusUpdated = output<Card>();

  handleCardStatusUpdate(card: Card): void {
    this.cardStatusUpdated.emit(card);
  }
}
