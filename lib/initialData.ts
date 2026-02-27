import { FareClass } from "@/types/pricing";

export const initialFareClasses: FareClass[] = [
  {
    code: "Y",
    price: 1000,
    seatsProtected: 15,
    seatsSold: 0,
    open: true,
    rules: {
      refundable: true,
      changePenalty: 0,
      advancePurchaseDays: 0,
    },
  },
  {
    code: "L",
    price: 700,
    seatsProtected: 0,
    seatsSold: 0,
    open: false,
    rules: {
      refundable: false,
      changePenalty: 150,
      advancePurchaseDays: 14,
    },
  },
];
