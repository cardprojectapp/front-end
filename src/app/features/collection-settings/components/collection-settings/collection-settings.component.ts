import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardsDisplayMode, CollectionProgressMode } from '@features/collection-settings/collection-settings.models';
import CollectionProgressSettingsComponent from '@features/collection-settings/rarity-mode-setting/collection-progress-setting.component';
import { CollectionSettingsStore } from '@features/collection-settings/store/collection-settings.store';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenuToggle,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from '@services/storage/storage.service';
import { addIcons } from 'ionicons';
import { addOutline, closeOutline, imageOutline, tabletLandscapeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-collection-settings',
  standalone: true,
  imports: [
    IonFooter,
    IonText,
    IonItem,
    IonList,
    IonIcon,
    IonButton,
    IonButtons,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonContent,
    IonMenuToggle,
    TranslateModule,
    CollectionProgressSettingsComponent,
  ],
  templateUrl: './collection-settings.component.html',
  styleUrl: './collection-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionSettingsComponent {
  private readonly collectionSettingsStore = inject(CollectionSettingsStore);

  globalProgressMode = this.collectionSettingsStore.globalProgressDisplayMode;
  rarityProgressMode = this.collectionSettingsStore.rarityProgressDisplayMode;
  cardsDisplayMode = this.collectionSettingsStore.cardsDisplayMode;

  CollectionProgressMode = CollectionProgressMode;
  CardsDisplayMode = CardsDisplayMode;

  constructor() {
    addIcons({ closeOutline, tabletLandscapeOutline, imageOutline, addOutline });
  }

  handleGlobalProgressModeChange(mode: CollectionProgressMode): void {
    if (mode === this.globalProgressMode()) return;

    this.collectionSettingsStore.updateSettings({ globalProgressDisplayMode: mode });
  }

  handleRarityProgressModeChange(mode: CollectionProgressMode): void {
    if (mode === this.rarityProgressMode()) return;

    this.collectionSettingsStore.updateSettings({ rarityProgressDisplayMode: mode });
  }

  handleCardsViewModeChange(mode: CardsDisplayMode): void {
    if (mode === this.cardsDisplayMode()) return;

    this.collectionSettingsStore.updateSettings({ cardsDisplayMode: mode });
  }
}
