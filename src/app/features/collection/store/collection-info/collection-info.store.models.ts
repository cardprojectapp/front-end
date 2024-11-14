import { NonExistentCard } from '@models/cards.models';

export interface CollectionInfoState {
  error: string | undefined;
  loading: boolean;
  cards_collected: number | undefined;
  cards_total: number | undefined;
  rarities: string[] | undefined;
  non_existent_cards: NonExistentCard[] | undefined;
}
