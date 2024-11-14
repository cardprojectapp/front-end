import { Card, NonExistentCard } from '@models/cards.models';

export type CardsLoadingMap = Record<string, boolean>;

export type NonExistentCardsMap = Record<string, Record<number, NonExistentCard>>;

export interface CollectionCardsState {
  error: string | undefined;
  loading: boolean;
  cardsLoadingMap: CardsLoadingMap;
}

export interface UpdateCardEntityPatch {
  ids: string[];
  changes: Partial<Card>;
}
