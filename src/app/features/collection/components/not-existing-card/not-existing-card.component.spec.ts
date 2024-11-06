import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { NotExistingCardComponent } from './not-existing-card.component';

describe('NotExistingCardComponent', () => {
  let component: NotExistingCardComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: NotExistingCardComponent,
      providers: [],
    });
  });

  describe('handleCardClick', () => {
    it('should emit selected card value', () => {
      const cardId: string = 'R-007';
      const spy = jest.spyOn(component.clickCard, 'emit');

      component.handleCardClick(cardId);

      expect(spy).toHaveBeenCalledWith(cardId);
    });
  });
});
