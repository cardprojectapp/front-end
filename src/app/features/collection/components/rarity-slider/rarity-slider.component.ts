import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonLabel, IonSegment, IonSegmentButton, IonSkeletonText, SegmentCustomEvent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-rarity-slider',
  standalone: true,
  imports: [IonSkeletonText, IonLabel, IonSegmentButton, IonSegment],
  templateUrl: './rarity-slider.component.html',
  styleUrl: './rarity-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaritySliderComponent {
  rarities = input.required<string[]>();
  selectedRarity = input.required<string | undefined>();
  isLoading = input.required<boolean>();

  selectRarity = output<string>();

  handleRarityChange(segmentEvent: SegmentCustomEvent): void {
    const rarity = segmentEvent.detail.value as string;

    this.selectRarity.emit(rarity);
  }
}
