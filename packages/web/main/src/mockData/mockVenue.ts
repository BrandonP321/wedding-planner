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
      id: "1",
      name: "Indoor Venue",
      price: 4000,
      subChoices: [
        {
          id: "2",
          multipleChoice: false,
          name: "Package",
          choices: [
            {
              id: "100",
              label: "Basic",
              name: "basic",
              price: 1000,
            },
            {
              id: "101",
              label: "Standard",
              name: "standard",
              price: 2000,
            },
            {
              id: "102",
              label: "Premium",
              name: "premium",
              price: 3000,
            },
          ],
        },
        {
          id: "3",
          name: "Guest count",
          multipleChoice: false,
          choices: [
            { label: "0-99", name: "100", price: 0, id: "103" },
            { label: "100-199", name: "200", price: 1000, id: "104" },
            { label: "200+", name: "300", price: 2000, id: "105" },
          ],
        },
        {
          id: "4",
          name: "Add-ons",
          multipleChoice: true,
          choices: [
            { label: "Chair renatls", name: "chairs", price: 300, id: "106" },
            { label: "AC", name: "ac", price: 200, id: "107" },
            { label: "Fire place", name: "fireplace", price: 400, id: "108" },
          ],
        },
      ],
    },
    {
      id: "5",
      name: "Outdoor Venue",
      price: 5000,
      subChoices: [
        {
          id: "6",
          multipleChoice: false,
          name: "Package",
          choices: [
            {
              id: "109",
              label: "Basic",
              name: "basic",
              price: 1500,
            },
            {
              id: "110",
              label: "Standard",
              name: "standard",
              price: 2500,
            },
            {
              id: "111",
              label: "Premium",
              name: "premium",
              price: 3500,
            },
          ],
        },
        {
          id: "7",
          name: "Guest count",
          multipleChoice: false,
          choices: [
            { label: "0-99", name: "100", price: 1000, id: "112" },
            { label: "100-199", name: "200", price: 2000, id: "113" },
            { label: "200+", name: "300", price: 3000, id: "114" },
          ],
        },
        {
          id: "8",
          name: "Add-ons",
          multipleChoice: true,
          choices: [
            { label: "Chair renatls", name: "chairs", price: 300, id: "115" },
            { label: "AC", name: "ac", price: 200, id: "116" },
            { label: "Fire place", name: "fireplace", price: 400, id: "117" },
            { label: "Swimming pool", name: "pool", price: 1000, id: "118" },
          ],
        },
      ],
    },
  ],
};
