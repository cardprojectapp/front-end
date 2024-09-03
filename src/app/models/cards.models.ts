export interface Card {
  id: string;
  rarity: string;
  status: CardStatus;
  character_name: string;
  serial_number: string;
  image_url: string;
}

export enum CardStatus {
  Collected = 'collected',
  NotCollected = 'not_collected',
  NotExisting = 'not_existing',
}