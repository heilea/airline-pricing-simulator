export type FareRules = {
  refundable: boolean;
  changePenalty: number;
  advancePurchaseDays: number;
};

export type FareClass = {
  code: string;
  price: number;
  seatsProtected: number;
  seatsSold: number;
  rules: FareRules;
  open: boolean;
};
