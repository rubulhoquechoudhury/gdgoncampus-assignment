import { Timestamp } from "firebase/firestore";

export type ItemCategory = "Electronics" | "ID Card" | "Book" | "Other";

export type ItemReport = {
  id: string;
  userId: string;
  userEmail: string;
  type: 'lost' | 'found';
  itemName: string;
  description: string;
  location: string;
  category: ItemCategory;
  date: Timestamp;
  imageUrl?: string;
  createdAt: Timestamp;
};
