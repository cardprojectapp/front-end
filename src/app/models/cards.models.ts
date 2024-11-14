export interface Card {
  id: string;
  rarity: string;
  status: CardStatus;
  character_name: string;
  serial_number: string;
  image_url: string;
}

export type NonExistentCard = Pick<Card, 'id' | 'rarity' | 'serial_number'>;

export enum CardStatus {
  Collected = 'collected',
  NotCollected = 'not_collected',
}
