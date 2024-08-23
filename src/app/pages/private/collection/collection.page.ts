import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  computed,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardsListComponent } from '@features/collection/components/cards-list/cards-list.component';
import { ChipsListComponent } from '@features/collection/components/chips-list/chips-list.component';
import { ProgressBarComponent } from '@features/collection/components/progress-bar/progress-bar.component';
import { RaritySliderComponent } from '@features/collection/components/rarity-slider/rarity-slider.component';
import { CollectionCardsStore } from '@features/collection/store/collection-cards-store/collection-cards.store';
import { CardsLoadingMap } from '@features/collection/store/collection-cards-store/collection-cards.store.models';
import { CollectionInfoStore } from '@features/collection/store/collection-info/collection-info.store';
import { SearchCardsStore } from '@features/collection/store/search-cards/search-cards.store';
import { CardsDisplayMode, CollectionProgressMode } from '@features/collection-settings/collection-settings.models';
import { CollectionSettingsComponent } from '@features/collection-settings/components/collection-settings/collection-settings.component';
import { CollectionSettingsStore } from '@features/collection-settings/store/collection-settings.store';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuToggle,
  IonSearchbar,
  IonSpinner,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Card, CardStatus } from '@models/collection.models';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeCircleOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonContent,
    IonButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonIcon,
    IonMenu,
    IonMenuToggle,
    IonSearchbar,
    ChipsListComponent,
    CardsListComponent,
    CollectionSettingsComponent,
    ProgressBarComponent,
    RaritySliderComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CollectionPage implements OnInit {
  private readonly collectionSettingsStore = inject(CollectionSettingsStore);
  private readonly collectionCardsStore = inject(CollectionCardsStore);
  private readonly collectionInfoStore = inject(CollectionInfoStore);
  private readonly searchCardsStore = inject(SearchCardsStore);

  readonly progressDisplayMode = CollectionProgressMode;

  cardsSearchbar: Signal<IonSearchbar | undefined> = viewChild('cardsSearchbar');

  globalProgressDisplayMode: Signal<CollectionProgressMode> = this.collectionSettingsStore.globalProgressDisplayMode;
  rarityProgressDisplayMode: Signal<CollectionProgressMode> = this.collectionSettingsStore.rarityProgressDisplayMode;
  selectedRarity: Signal<string> = this.collectionSettingsStore.selectedRarity;
  cardsDisplayMode: Signal<CardsDisplayMode> = this.collectionSettingsStore.cardsDisplayMode;

  cardsByRarity: Signal<Record<string, Card[]>> = this.collectionCardsStore.cardsByRarity;
  cardsLoadingMap: Signal<CardsLoadingMap> = this.collectionCardsStore.cardsLoadingMap;
  isCollectionCardsLoading: Signal<boolean> = this.collectionCardsStore.loading;

  searchCards: Signal<Card[]> = this.searchCardsStore.entities;
  isSearchCardsLoading: Signal<boolean> = this.searchCardsStore.loading;

  rarities: Signal<string[] | undefined> = this.collectionInfoStore.rarities;
  cardsTotal: Signal<number | undefined> = this.collectionInfoStore.cards_total;
  cardsCollected: Signal<number | undefined> = this.collectionInfoStore.cards_collected;
  collectionInfoError: Signal<string | undefined> = this.collectionInfoStore.error;
  isCollectionInfoLoading: Signal<boolean> = this.collectionInfoStore.loading;

  isCollectionDataLoadedSuccessfuly: Signal<boolean> = computed(() => {
    const isLoaded = this.isCollectionInfoLoading() === false;
    const hasNoError = this.collectionInfoError() === undefined;

    return isLoaded && hasNoError;
  });

  canDisplayGlobalProgressBar = computed(() => {
    const isEnabled = this.globalProgressDisplayMode() !== CollectionProgressMode.None;

    // TODO: Move 'isCollectionDataLoadedSuccessfuly' to computed
    return isEnabled && this.isCollectionDataLoadedSuccessfuly();
  });

  canDisplayRarityProgressBar = computed(() => {
    const isEnabled = this.rarityProgressDisplayMode() !== CollectionProgressMode.None;

    return isEnabled && this.isCollectionDataLoadedSuccessfuly();
  });

  isDataLoading = computed(() => {
    return this.isCollectionInfoLoading() || this.isSearchCardsLoading() || this.isCollectionCardsLoading();
  });

  isImageDisplayMode = computed(() => this.cardsDisplayMode() === CardsDisplayMode.Image);

  cardsForCurrentRarity: Card[] = [];
  currentRarityCollectedCardsAmount: number = 0;

  // TODO: All tapResponse should be attached to API request in effect to keep effect working and use object instead of arguments

  constructor() {
    addIcons({ settingsOutline, closeCircleOutline });

    effect(() => {
      const existingCardsByRarity = this.cardsByRarity()[this.selectedRarity()];

      if (existingCardsByRarity) {
        this.cardsForCurrentRarity = existingCardsByRarity;
      } else {
        this.collectionCardsStore.fatchByRarity(this.selectedRarity());
        this.cardsForCurrentRarity = [];
      }

      this.currentRarityCollectedCardsAmount = this.cardsForCurrentRarity.filter(
        (card: Card) => card.status === CardStatus.Collected,
      ).length;
    });
  }

  ngOnInit(): void {
    this.collectionInfoStore.getCollectionInfo();
  }

  handleSearchValueChange(event: CustomEvent): void {
    const searchTerm = event.detail.value;

    if (!searchTerm) {
      this.searchCardsStore.clearSearchCards();
    } else {
      this.searchCardsStore.search(searchTerm);
    }
  }

  handleSelectRarity(rarity: string): void {
    if (this.searchCards().length) {
      this.cardsSearchbar()!.value = null;
    }

    if (rarity === this.selectedRarity()) return;

    this.collectionSettingsStore.updateSettings({ selectedRarity: rarity });
  }

  updateCardStatus(card: Card): void {
    const patch = {
      ids: [card.id],
      changes: {
        status: card.status === CardStatus.Collected ? CardStatus.NotCollected : CardStatus.Collected,
      },
    };

    this.collectionCardsStore.update(patch);
  }
}
