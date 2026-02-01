export interface Gift {
  _id: string;
  title: string;
  brand: string;
  price: number | string;
  purchased: boolean;
  kids: string[];
  imageUrl?: string;
}
