import { Card } from '@models/collection.models';

export type CardsLoadingMap = Record<string, boolean>;

export interface CollectionCardsState {
  error: string | undefined;
  loading: boolean;
  cardsLoadingMap: CardsLoadingMap;
}

export interface UpdateCardEntityPatch {
  ids: string[];
  changes: Partial<Card>;
}