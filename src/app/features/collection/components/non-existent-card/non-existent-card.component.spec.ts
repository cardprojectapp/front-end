import { classWithProviders } from '@ngx-unit-test/inject-mocks';

import { NonExistentCardComponent } from './non-existent-card.component';

describe('NotExistingCardComponent', () => {
  let component: NonExistentCardComponent;

  beforeEach(() => {
    component = classWithProviders({
      token: NonExistentCardComponent,
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
