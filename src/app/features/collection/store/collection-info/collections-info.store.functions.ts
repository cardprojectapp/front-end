import { NonExistentCard } from '@models/cards.models';

import { NonExistentByRarityCardsMap } from '../collection-cards-store/collection-cards.store.models';

export namespace CollectionInfoStoreFunctions {
  export const buildNonExistentCardsMap = (cards: NonExistentCard[] | undefined): NonExistentByRarityCardsMap => {
    if (!cards) return {};

    return cards.reduce((memo: NonExistentByRarityCardsMap, card: NonExistentCard) => {
      const { rarity, serial_number } = card;
      const [, cardNummer] = serial_number.split('-');
      const cardsForRarity = memo[rarity] ?? {};

      memo[rarity] = { ...cardsForRarity, [Number(cardNummer)]: card };
      return memo;
    }, {});
  };
}
