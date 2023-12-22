export type TaskType = {
  _id: string;
  title: string;
  description: string;
};

export type UserType = {
  token: string;
};

export type CartItemType = {
  _id: string;
  prodId: string;
  title: string;
  price: number;
  salePrice?: number;
  imgSrc: string;
  sale: boolean;
  inventory: number;
  quantity: number;
};
