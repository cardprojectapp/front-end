import { Card, NonExistentCard } from '@models/cards.models';
import { mock } from 'jest-mock-extended';

import { CollectionFunctions } from './collection.functions';

describe('CollectionFunctions', () => {
  describe('buildExistentCardsByNumbersMap', () => {
    it('should return empty object, if no cards', () => {
      const result = CollectionFunctions.buildExistentCardsByNumbersMap([]);

      expect(result).toStrictEqual({});
    });

    it('should return object with numbers as keys and cards as values', () => {
      const cardMock = mock<Card>({ serial_number: 'R-001' });
      const expectedMap = { 1: cardMock };

      const result = CollectionFunctions.buildExistentCardsByNumbersMap([cardMock]);

      expect(result).toStrictEqual(expectedMap);
    });
    it('should return object with numbers as keys and cards as values if serial number has more than one dash', () => {
      const cardMock = mock<Card>({ serial_number: 'SR-R-001' });
      const expectedMap = { 1: cardMock };

      const result = CollectionFunctions.buildExistentCardsByNumbersMap([cardMock]);

      expect(result).toStrictEqual(expectedMap);
    });
  });

  describe('buildCardsPlacesToRender', () => {
    it('should return empty array, if no existing cards', () => {
      const result = CollectionFunctions.buildCardsPlacesToRender([], []);

      expect(result).toStrictEqual([]);
    });

    it('should return array with length equal to existent cards length if no not existend cards', () => {
      const result = CollectionFunctions.buildCardsPlacesToRender([mock<Card>()], []).length;

      expect(result).toBe(1);
    });

    it('should return array with length equal sum of existent and not existent cards', () => {
      const result = CollectionFunctions.buildCardsPlacesToRender([mock<Card>()], [mock<NonExistentCard>()]).length;

      expect(result).toBe(2);
    });
  });

  describe('getCardEntityId', () => {
    it('should return card id if card not existent', () => {
      const result = CollectionFunctions.getCardEntityId({}, { 1: { id: 'id1' } as NonExistentCard }, 1);

      expect(result).toBe('id1');
    });

    it('should return card id if card is existent', () => {
      const result = CollectionFunctions.getCardEntityId({ 1: { id: 'id1' } as Card }, {}, 1);

      expect(result).toBe('id1');
    });

    it('should return return undefined if no such card entity', () => {
      const result = CollectionFunctions.getCardEntityId({ 1: {} as Card }, {}, 2);

      expect(result).toBe(undefined);
    });
  });
});
