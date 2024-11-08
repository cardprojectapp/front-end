import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CardsLoadingMap } from '@features/collection/store/collection-cards-store/collection-cards.store.models';
import { IonSpinner } from '@ionic/angular/standalone';
import { Card } from '@models/cards.models';
import { TranslateModule } from '@ngx-translate/core';

import { ChipsListComponent } from '../chips-list/chips-list.component';
import { ChipsListSkeletonComponent } from '../chips-list-skeleton/chips-list-skeleton.component';
import { CollectionFetchErrorComponent } from '../collection-fetch-error/collection-fetch-error.component';
import { MarkAllAsCollectedButtonComponent } from '../mark-all-as-collected-button/mark-all-as-collected-button.component';

@Component({
  selector: 'app-chips-view',
  standalone: true,
  imports: [
    IonSpinner,
    ChipsListComponent,
    CollectionFetchErrorComponent,
    TranslateModule,
    MarkAllAsCollectedButtonComponent,
    ChipsListSkeletonComponent,
  ],
  templateUrl: './chips-view.component.html',
  styleUrl: './chips-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsViewComponent {
  error = input.required<string | undefined>();
  isLoading = input.required<boolean>();
  cardsLoadingMap = input.required<CardsLoadingMap>();
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
