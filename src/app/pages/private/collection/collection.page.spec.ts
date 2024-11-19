import { signal } from '@angular/core';
import { CollectionCardsStore } from '@features/collection/store/collection-cards-store/collection-cards.store';
import { CollectionCardsStoreMock } from '@features/collection/store/collection-cards-store/collection-cards.store.testing';
import { CollectionInfoStore } from '@features/collection/store/collection-info/collection-info.store';
import { CollectionInfoStoreMock } from '@features/collection/store/collection-info/collection-info.store.testing';
import { SearchCardsStore } from '@features/collection/store/search-cards/search-cards.store';
import { SearchCardsStoreMock } from '@features/collection/store/search-cards/search-cards.store.testing';
import { CardsDisplayMode, CollectionProgressMode } from '@features/collection-settings/collection-settings.models';
import { CollectionSettingsStore } from '@features/collection-settings/store/collection-settings.store';
import { CollectionSettingsStoreMock } from '@features/collection-settings/store/collection-settings.store.testing';
import { IonSearchbar } from '@ionic/angular/standalone';
import { Card, CardStatus } from '@models/cards.models';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { MockProxy, mock } from 'jest-mock-extended';

import CollectionPage from './collection.page';

jest.mock('@angular/core', () => {
  const actual = jest.requireActual('@angular/core');

  return {
    ...actual,
    effect: (fn: any) => {
      fn();
    },
  };
});

describe(CollectionPage.name, () => {
  let component: CollectionPage;
  let collectionSettingsStoreMock: MockProxy<CollectionSettingsStoreMock>;
  let collectionCardsStoreMock: MockProxy<CollectionCardsStoreMock>;
  let collectionInfoStoreMock: MockProxy<CollectionInfoStoreMock>;
  let searchCardsStoreMock: MockProxy<SearchCardsStoreMock>;

  beforeEach(() => {
    collectionSettingsStoreMock = mock<CollectionSettingsStoreMock>();
    collectionSettingsStoreMock.selectedRarity.mockReturnValue('R');

    collectionCardsStoreMock = mock<CollectionCardsStoreMock>();
    collectionCardsStoreMock.cardsByRarity.mockReturnValue({ R: [] });
    collectionCardsStoreMock.cardsUpdateInProgress.mockReturnValue(true);

    collectionInfoStoreMock = mock<CollectionInfoStoreMock>();

    searchCardsStoreMock = mock<SearchCardsStoreMock>();
    searchCardsStoreMock.entities.mockReturnValue([]);

    component = classWithProviders({
      token: CollectionPage,
      providers: [
        {
          provide: CollectionSettingsStore,
          useValue: collectionSettingsStoreMock,
        },
        {
          provide: CollectionCardsStore,
          useValue: collectionCardsStoreMock,
        },
        {
          provide: CollectionInfoStore,
          useValue: collectionInfoStoreMock,
        },
        {
          provide: SearchCardsStore,
          useValue: searchCardsStoreMock,
        },
      ],
    });
  });

  describe('currentRarityCollectedCardsAmount', () => {
    it('should update "currentRarityCollectedCardsAmount"', () => {
      expect(component.currentRarityCollectedCardsAmount).toBe(0);
    });
  });

  describe('isCollectionDataLoadedSuccessfully', () => {
    it('should return true if collection info is loaded and there is no error', () => {
      collectionInfoStoreMock.loading.mockReturnValue(false);
      collectionInfoStoreMock.error.mockReturnValue(undefined);

      expect(component.isCollectionDataLoadedSuccessfully()).toBe(true);
    });

    it('should return false if collection info is not loaded', () => {
      collectionInfoStoreMock.loading.mockReturnValue(true);
      collectionInfoStoreMock.error.mockReturnValue(undefined);

      expect(component.isCollectionDataLoadedSuccessfully()).toBe(false);
    });

    it('should return false if there is an error in the collection', () => {
      collectionInfoStoreMock.loading.mockReturnValue(false);
      collectionInfoStoreMock.error.mockReturnValue('error');

      expect(component.isCollectionDataLoadedSuccessfully()).toBe(false);
    });

    it('should return false if collection info is not loaded and there is an error', () => {
      collectionInfoStoreMock.loading.mockReturnValue(true);
      collectionInfoStoreMock.error.mockReturnValue('error');

      expect(component.isCollectionDataLoadedSuccessfully()).toBe(false);
    });
  });

  describe('canDisplayGlobalProgressBar', () => {
    it('should return true if selected display mode is not "none" and no error in info store', () => {
      collectionSettingsStoreMock.globalProgressDisplayMode.mockReturnValueOnce(CollectionProgressMode.Numbers);
      collectionInfoStoreMock.error.mockReturnValueOnce(undefined);

      const result = component.canDisplayGlobalProgressBar();

      expect(result).toBe(true);
    });

    it('should return false if selected display mode is "none"', () => {
      collectionInfoStoreMock.error.mockReturnValueOnce('error');
      collectionSettingsStoreMock.globalProgressDisplayMode.mockReturnValueOnce(CollectionProgressMode.None);

      const result = component.canDisplayGlobalProgressBar();

      expect(result).toBe(false);
    });

    it('should return false if there is collection info error received', () => {
      collectionInfoStoreMock.error.mockReturnValueOnce('error');
      collectionSettingsStoreMock.globalProgressDisplayMode.mockReturnValueOnce(CollectionProgressMode.Numbers);

      const result = component.canDisplayGlobalProgressBar();

      expect(result).toBe(false);
    });
  });

  describe('canDisplayRarityProgressBar', () => {
    it('should return true if selected display mode if not "none" and no error receied in info store', () => {
      collectionInfoStoreMock.error.mockReturnValueOnce(undefined);
      collectionSettingsStoreMock.rarityProgressDisplayMode.mockReturnValueOnce(CollectionProgressMode.Numbers);

      const result = component.canDisplayRarityProgressBar();

      expect(result).toBe(true);
    });

    it('should return false if selected display mode is "none"', () => {
      collectionInfoStoreMock.error.mockReturnValueOnce(undefined);
      collectionSettingsStoreMock.rarityProgressDisplayMode.mockReturnValueOnce(CollectionProgressMode.None);

      const result = component.canDisplayRarityProgressBar();

      expect(result).toBe(false);
    });

    it('should return false if collection info was not loaded', () => {
      collectionInfoStoreMock.error.mockReturnValueOnce('error');
      collectionSettingsStoreMock.rarityProgressDisplayMode.mockReturnValueOnce(CollectionProgressMode.Numbers);

      const result = component.canDisplayRarityProgressBar();

      expect(result).toBe(false);
    });
  });

  describe('isLoadingCollectionRequiredData', () => {
    it('should return true if only collectionInfo loading in progresss', () => {
      collectionInfoStoreMock.loading.mockReturnValueOnce(true);
      collectionCardsStoreMock.loading.mockReturnValueOnce(false);

      const result = component.isLoadingCollectionRequiredData();

      expect(result).toBe(true);
    });

    it('should return true if only collectionCards loading in progresss', () => {
      collectionInfoStoreMock.loading.mockReturnValueOnce(false);
      collectionCardsStoreMock.loading.mockReturnValueOnce(true);

      const result = component.isLoadingCollectionRequiredData();

      expect(result).toBe(true);
    });

    it('should return false if all the stores have loading false', () => {
      collectionInfoStoreMock.loading.mockReturnValueOnce(false);
      collectionCardsStoreMock.loading.mockReturnValueOnce(false);

      const result = component.isLoadingCollectionRequiredData();

      expect(result).toBe(false);
    });
  });

  describe('isImageDisplayMode', () => {
    it('should return true if cards display mode is "Image"', () => {
      collectionSettingsStoreMock.cardsDisplayMode.mockReturnValueOnce(CardsDisplayMode.Image);

      const result = component.isImageDisplayMode();

      expect(result).toBe(true);
    });

    it('should return false if cards display mode is not "Image"', () => {
      collectionSettingsStoreMock.cardsDisplayMode.mockReturnValueOnce(CardsDisplayMode.Chip);

      const result = component.isImageDisplayMode();

      expect(result).toBe(false);
    });
  });

  describe('ngOnInit', () => {
    it('should trigger "getCollectionInfo" of collection info store', () => {
      component.ngOnInit();

      expect(collectionInfoStoreMock.getCollectionInfo).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleSearchValueChange', () => {
    it('should trigger "clearSearchCards" of searchCards store if no search term', () => {
      component.handleSearchValueChange(mock<CustomEvent>({ detail: { value: '' } }));

      expect(searchCardsStoreMock.clearSearchCards).toHaveBeenCalledTimes(1);
    });

    it('should trigger "search" of searchCards store if there is search term', () => {
      component.handleSearchValueChange(mock<CustomEvent>({ detail: { value: '123' } }));

      expect(searchCardsStoreMock.search).toHaveBeenCalledWith('123');
    });
  });

  describe('handleSelectRarity', () => {
    it('should not trigger "updateSettings" if passed value is the same as we have in store', () => {
      component.handleSelectRarity('R');

      expect(collectionSettingsStoreMock.updateSettings).not.toHaveBeenCalled();
    });

    it('should trigger "updateSettings" if passed value is not the same as we have in store', () => {
      component.handleSelectRarity('SSR');

      expect(collectionSettingsStoreMock.updateSettings).toHaveBeenCalledWith({ selectedRarity: 'SSR' });
    });

    it('should rest serchbar value if searchCardsList is not empty', () => {
      const searchbarMock = mock<IonSearchbar>({ value: '' });
      component.cardsSearchbar = signal(searchbarMock);
      searchCardsStoreMock.entities.mockReturnValueOnce([mock<Card>()]);

      component.handleSelectRarity('SSR');

      expect(searchbarMock.value).toBe(null);
    });

    it('should not reset value of cardsSearchbar if searchCardsList is emoty', () => {
      const searchbarMock = mock<IonSearchbar>({ value: '123' });
      component.cardsSearchbar = signal(searchbarMock);
      searchCardsStoreMock.entities.mockRejectedValueOnce([]);

      component.handleSelectRarity('SSR');

      expect(searchbarMock.value).toBe('123');
    });
  });

  describe('updateCardStatus', () => {
    it('should build patch and trigger "update" method of collection cards store', () => {
      const cardMock = mock<Card>({ status: CardStatus.Collected });
      const expectedPatch = {
        ids: [cardMock.id],
        changes: {
          status: CardStatus.NotCollected,
        },
      };

      component.updateCardStatus(cardMock);

      expect(collectionCardsStoreMock.update).toHaveBeenCalledWith(expectedPatch);
    });
  });

  describe('markAllAsCollected', () => {
    it('should build patch and trigger "update" method of collection cards store', () => {
      component.nonExistentCardsMap = signal({ '3': {} }) as any;
      const mockCards = [
        mock<Card>({ status: CardStatus.NotCollected, id: '1' }),
        mock<Card>({ status: CardStatus.Collected, id: '2' }),
        mock<Card>({ status: CardStatus.NotCollected, id: '3' }),
      ];
      const expectedPatch = {
        ids: ['1', '3'],
        changes: {
          status: CardStatus.Collected,
        },
      };

      component.markAllAsCollected(mockCards);

      expect(collectionCardsStoreMock.update).toHaveBeenCalledWith(expectedPatch);
    });
  });

  describe('shouldHideMarkAllAsCollected', () => {
    it('should return false if collections cards are loading', () => {
      collectionCardsStoreMock.loading.mockReturnValueOnce(true);

      const result = component.shouldHideMarkAllAsCollected();

      expect(result).toBe(false);
    });

    it('should return true if collections info store has error', () => {
      collectionCardsStoreMock.loading.mockReturnValueOnce(false);
      collectionInfoStoreMock.error.mockReturnValueOnce('error');

      const result = component.shouldHideMarkAllAsCollected();

      expect(result).toBe(true);
    });

    it('should return true if searchbar has some value', () => {
      collectionCardsStoreMock.loading.mockReturnValueOnce(false);
      collectionInfoStoreMock.error.mockReturnValueOnce(undefined);
      component.cardsSearchbar = signal({ value: '123' }) as any;

      const result = component.shouldHideMarkAllAsCollected();

      expect(result).toBe(true);
    });

    it('should return false if user can mark all cards as collected', () => {
      collectionCardsStoreMock.loading.mockReturnValueOnce(false);
      collectionInfoStoreMock.error.mockReturnValueOnce(undefined);
      component.cardsSearchbar = signal({ value: undefined }) as any;
      component.canMarkAllAsCollected = true;

      const result = component.shouldHideMarkAllAsCollected();

      expect(result).toBe(false);
    });

    it('should return true if user can not mark all cards as collected', () => {
      collectionCardsStoreMock.loading.mockReturnValueOnce(false);
      collectionInfoStoreMock.error.mockReturnValueOnce(undefined);
      component.cardsSearchbar = signal({ value: undefined }) as any;
      component.canMarkAllAsCollected = false;

      const result = component.shouldHideMarkAllAsCollected();

      expect(result).toBe(true);
    });
  });

  describe('reFetchCollectionInfo', () => {
    it('should trigger "getCollectionInfo" method of collection info store', () => {
      component.reFetchCollectionInfo();

      expect(collectionInfoStoreMock.getCollectionInfo).toHaveBeenCalledTimes(1);
    });
  });

  describe('reFetchCardsByRarity', () => {
    it('should trigger "fatchByRarity" store method', () => {
      component.reFetchCardsByRarity();

      expect(collectionCardsStoreMock.fetchByRarity).toHaveBeenCalledTimes(1);
    });

    it('should trigger "getCollectedCardsForRarity" method to update collected cards amount', () => {
      const spy = jest.spyOn(component, 'getCollectedCardsForRarity');

      component.reFetchCardsByRarity();

      expect(spy).toHaveBeenCalledWith([]);
    });
  });

  describe('handleRarityChange', () => {
    it('should assign empty array as value if no cards for rarity', () => {
      component.handleRarityChange({}, 'R');

      expect(component.cardsForCurrentRarity).toStrictEqual([]);
    });

    it('should trigger "fatchByRarity" if no cards for rarity', () => {
      component.handleRarityChange({}, 'R');

      expect(collectionCardsStoreMock.fetchByRarity).toHaveBeenCalledTimes(1);
    });

    it('should assign array with cards as value if there are cards for rarity', () => {
      const cardsMock = [mock<Card>()];

      component.handleRarityChange({ R: cardsMock }, 'R');

      expect(component.cardsForCurrentRarity).toStrictEqual(cardsMock);
    });
  });

  describe('getCollectedCardsForRarity', () => {
    it('should filter out cards that are not collected', () => {
      const cardsMock = [mock<Card>({ status: CardStatus.Collected }), mock<Card>({ status: CardStatus.NotCollected })];

      const result = component.getCollectedCardsForRarity(cardsMock);

      expect(result.length).toBe(1);
    });
  });

  describe('getCanMarkAllAsCollected', () => {
    describe("can't mark all as collected", () => {
      it('should return false if list is empty', () => {
        jest.spyOn(component, 'isCardsListEmpty').mockReturnValueOnce(true);

        const result = component.getCanMarkAllAsCollected([]);

        expect(result).toBeFalsy();
      });

      it('should return false if every card is collected', () => {
        jest.spyOn(component, 'isCardsListEmpty').mockReturnValueOnce(false);
        jest.spyOn(component, 'isSomeCardUncollected').mockReturnValueOnce(false);

        const result = component.getCanMarkAllAsCollected([]);

        expect(result).toBeFalsy();
      });
    });

    describe('can mark all as collected', () => {
      it('should return true if list is not empty and some card is uncollected', () => {
        jest.spyOn(component, 'isCardsListEmpty').mockReturnValueOnce(false);
        jest.spyOn(component, 'isSomeCardUncollected').mockReturnValueOnce(true);

        const result = component.getCanMarkAllAsCollected([]);

        expect(result).toBeTruthy();
      });
    });
  });

  describe('isCardsListEmpty', () => {
    describe('returns false', () => {
      it('should return false if list is not empty', () => {
        const cardsList: Card[] = [{} as Card];

        const result = component.isCardsListEmpty(cardsList);

        expect(result).toBeFalsy();
      });
    });

    describe('returns true', () => {
      it('should return true if list is null', () => {
        const cardsList = null;

        const result = component.isCardsListEmpty(cardsList);

        expect(result).toBeTruthy();
      });

      it('should return true if list is empty', () => {
        const cardsList: Card[] = [];

        const result = component.isCardsListEmpty(cardsList);

        expect(result).toBeTruthy();
      });
    });
  });

  describe('isSomeCardUncollected', () => {
    describe('returns false', () => {
      it('should return false is list is null', () => {
        const result = component.isSomeCardUncollected(null);

        expect(result).toBeFalsy();
      });

      it('should return false if every card is collected', () => {
        const cardsList: Card[] = [{ status: CardStatus.Collected } as Card];

        const result = component.isSomeCardUncollected(cardsList);

        expect(result).toBeFalsy();
      });

      it('should return false if every card is non existent', () => {
        const cardsList: Card[] = [{ status: CardStatus.Collected, id: '1' } as Card];
        component.nonExistentCardsMap = signal({ '1': {} }) as any;

        const result = component.isSomeCardUncollected(cardsList);

        expect(result).toBeFalsy();
      });
    });

    describe('returns true', () => {
      it('should return true if some card is not collected', () => {
        const cardsList: Card[] = [
          { status: CardStatus.NotCollected } as Card,
          { status: CardStatus.Collected } as Card,
        ];

        const result = component.isSomeCardUncollected(cardsList);

        expect(result).toBeTruthy();
      });
    });
  });
});
