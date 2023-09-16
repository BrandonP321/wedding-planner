import { VendorResponse } from "@wedding-planner/shared/common/types/vendorPriceOptions";

export const mockVenue: VendorResponse = {
  id: "123",
  name: "The Grand Lakeside",
  description: "A beautiful lakeside venue perfect for weddings.",
  locaiton: "123 Main St, Anytown, USA",
  contactInfo: {
    phone: "(555) 123-4567",
    email: "info@grandlakeside.com",
    website: "http://www.grandlakeside.com",
  },
  type: "venue",
  venueDetails: {
    venueType: "outdoor",
  },
  mainChoices: [
    {
      id: "123",
      name: "Indoor Venue",
      basePrice: 4000,
      peakDatesPrice: 4500,
      subChoices: [
        {
          id: "123",
          name: "With AC",
          additionalPrice: 500,
          peakDatesAdditionalPrice: 550,
        },
        {
          id: "123",
          name: "Without AC",
          additionalPrice: 0,
          peakDatesAdditionalPrice: 0,
        },
      ],
      addOns: [
        {
          id: "123",
          name: "Projector",
          additionalPrice: 200,
          peakDatesAdditionalPrice: 220,
        },
        {
          id: "123",
          name: "Sound System",
          additionalPrice: 300,
          peakDatesAdditionalPrice: 330,
        },
      ],
    },
    {
      id: "123",
      name: "Outdoor Venue",
      basePrice: 3500,
      peakDatesPrice: 3850,
      subChoices: [
        {
          id: "123",
          name: "Lakeside",
          additionalPrice: 200,
          peakDatesAdditionalPrice: 220,
        },
        {
          id: "123",
          name: "Forest",
          additionalPrice: 100,
          peakDatesAdditionalPrice: 110,
        },
      ],
      addOns: [
        {
          id: "123",
          name: "Tents",
          additionalPrice: 400,
          peakDatesAdditionalPrice: 440,
        },
        {
          id: "123",
          name: "Fairy Lights",
          additionalPrice: 150,
          peakDatesAdditionalPrice: 165,
        },
      ],
    },
  ],
} as VendorResponse;
