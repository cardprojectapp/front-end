import { NonExistentCard } from '@models/cards.models';

import { NonExistentCardsMap } from '../collection-cards-store/collection-cards.store.models';

export namespace CollectionInfoStoreFunctions {
  export const buildNonExistentCardsMap = (cards: NonExistentCard[] | undefined): NonExistentCardsMap => {
    if (!cards) return {};

    return cards.reduce((memo: NonExistentCardsMap, card: NonExistentCard) => {
      const { rarity, serial_number } = card;
      const [, cardNummer] = serial_number.split('-');
      const cardsForRarity = memo[rarity] ?? {};

      memo[rarity] = { ...cardsForRarity, [Number(cardNummer)]: card };
      return memo;
    }, {});
  };
}
