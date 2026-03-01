import { FareClass } from "@/types/pricing";

export const initialFareClasses: FareClass[] = [
  {
    code: "Y",
    price: 28000, // XPF - Plein tarif flexible
    seatsProtected: 8,
    seatsSold: 0,
    open: true,
    rules: {
      refundable: true,
      changePenalty: 0,
      advancePurchaseDays: 0,
    },
  },
  {
    code: "B",
    price: 19000, // XPF - Tarif standard
    seatsProtected: 12,
    seatsSold: 0,
    open: true,
    rules: {
      refundable: false,
      changePenalty: 3000,
      advancePurchaseDays: 7,
    },
  },
  {
    code: "Q",
    price: 12000, // XPF - Tarif promo
    seatsProtected: 0,
    seatsSold: 0,
    open: true,
    rules: {
      refundable: false,
      changePenalty: 5000,
      advancePurchaseDays: 30,
    },
  },
];
