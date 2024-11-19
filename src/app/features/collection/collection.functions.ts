import { Card, NonExistentCard } from '@models/cards.models';

import { NonExistentCardsMap } from './store/collection-cards-store/collection-cards.store.models';

export namespace CollectionFunctions {
  export const buildExistentCardsByNumbersMap = (existingsCars: Card[]): Record<number, Card> => {
    return existingsCars?.reduce((memo: Record<number, Card>, card: Card) => {
      const cardNumber = card.serial_number.split('-').at(-1);
      memo[Number(cardNumber)] = card;

      return memo;
    }, {});
  };
  export const buildCardsPlacesToRender = (existingsCars: Card[], nonExistentCards: NonExistentCard[] = []): void[] => {
    if (existingsCars?.length === 0) return [];

    const nonExistentCardsAmout = nonExistentCards.length;
    const existedCardsAmount = existingsCars!.length;
    const cardsTotal = nonExistentCardsAmout + existedCardsAmount;

    return Array(cardsTotal);
  };

  export const getCardEntityId = (
    existentCardsByNumbersMap: Record<number, Card>,
    nonExistentCardsMap: NonExistentCardsMap | undefined,
    cardNumber: number,
  ) => {
    return nonExistentCardsMap?.[cardNumber]?.id ?? existentCardsByNumbersMap?.[cardNumber]?.id;
  };
}
