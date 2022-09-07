export type Coordinates = {
  lat: number;
  lng: number;
};

export type Capacity ={
  code: string,
  value: number
}
export type MaterialType = {
  code: string;
  value: number;
};
export type Order = {
  capacity: string;
  customerId: string;
  materialType: string;
  weight: string;
  isRouteAllocated: boolean;
  deliveryStatus: string;
  expectedDeliveryTime?: Date;
  contactNo: string,
  address: string;
  pincode: string;
  landmark: string;
  orgin: {
    type: string;
    coordinates: number[];
  };
  destination: {
    type: string;
    coordinates: number[];
  };
};
