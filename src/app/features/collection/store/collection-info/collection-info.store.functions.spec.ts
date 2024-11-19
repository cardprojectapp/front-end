import { NonExistentCard } from '@models/cards.models';

import { CollectionInfoStoreFunctions } from './collection-info.store.functions';

describe('CollectionInfoStoreFunctions', () => {
  describe('buildNonExistentCardsMap', () => {
    it('should return empty object if no cards passed', () => {
      const result = CollectionInfoStoreFunctions.buildNonExistentCardsMap([]);

      expect(result).toStrictEqual({});
    });

    it('should build non existent cards by rarity map', () => {
      const nonExistentCardsMock = [
        { rarity: 'R', serial_number: 'R-001' },
        { rarity: 'R-SR', serial_number: 'R-SR-001' },
      ] as NonExistentCard[];
      const expectedMap = {
        R: {
          1: nonExistentCardsMock[0],
        },
        'R-SR': {
          1: nonExistentCardsMock[1],
        },
      };

      const result = CollectionInfoStoreFunctions.buildNonExistentCardsMap(nonExistentCardsMock);

      expect(result).toStrictEqual(expectedMap);
    });
  });
});
