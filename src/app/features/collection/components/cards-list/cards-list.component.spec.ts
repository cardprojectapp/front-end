import { signal } from '@angular/core';
import { CollectionFunctions } from '@features/collection/collection.functions';
import { Card } from '@models/cards.models';
import { TranslateService } from '@ngx-translate/core';
import { classWithProviders } from '@ngx-unit-test/inject-mocks';
import { ToastColor } from '@services/toast/toast.models';
import { ToastService } from '@services/toast/toast.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { of } from 'rxjs';

import { CardsListComponent } from './cards-list.component';

describe(CardsListComponent.name, () => {
  let component: CardsListComponent;
  let translateServiceMock: MockProxy<TranslateService>;
  let toastServiceMock: MockProxy<ToastService>;

  beforeEach(() => {
    translateServiceMock = mock<TranslateService>();
    translateServiceMock.instant.mockImplementation(a => a);

    toastServiceMock = mock<ToastService>();
    toastServiceMock.open$.mockReturnValue(of({} as HTMLIonToastElement));

    component = classWithProviders({
      token: CardsListComponent,
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        {
          provide: ToastService,
          useValue: toastServiceMock,
        },
      ],
    });
  });

  describe('existentCardsByNumbersMap', () => {
    it('should trigger "buildExistentCardsByNumbersMap" function whjen called', () => {
      const spy = jest.spyOn(CollectionFunctions, 'buildExistentCardsByNumbersMap');
      component.cardsList = signal([]) as any;

      component.existentCardsByNumbersMap();

      expect(spy).toHaveBeenCalledWith([]);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('cardsPlacesToRender', () => {
    it('should trigger "buildCardsPlacesToRender" function whjen called', () => {
      const spy = jest.spyOn(CollectionFunctions, 'buildCardsPlacesToRender');
      component.nonExistentCardsMap = signal({}) as any;
      component.cardsList = signal([]) as any;

      component.cardsPlacesToRender();

      expect(spy).toHaveBeenCalledWith([], []);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('trackByCardId', () => {
    it('should trigger "getCardEntityId" function when called', () => {
      const spy = jest.spyOn(CollectionFunctions, 'getCardEntityId');
      component.existentCardsByNumbersMap = signal({});
      component.nonExistentCardsMap = signal({}) as any;

      component.trackByCardId(1);

      expect(spy).toHaveBeenCalledWith({}, {}, 1);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleNonExistentCardClick', () => {
    it('should translate message for toaster if the card does not exist', () => {
      component.handleNonExistentCardClick();

      expect(translateServiceMock.instant).toHaveBeenCalledWith('collection.card_not_exists.toast');
    });

    it('should open toast if the card does not exist', () => {
      component.handleNonExistentCardClick();

      expect(toastServiceMock.open$).toHaveBeenCalledWith('collection.card_not_exists.toast', ToastColor.Medium);
    });
  });

  describe('handleCheckboxClick', () => {
    it('should trigger "cardCheckboxClicked" output event', () => {
      const cardMock = mock<Card>();
      const spy = jest.spyOn(component.cardCheckboxClicked, 'emit');

      component.handleCheckboxClick(cardMock);

      expect(spy).toHaveBeenCalledWith(cardMock);
    });
  });
});
