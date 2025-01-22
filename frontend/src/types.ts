export interface User {
  email: string;
  _id: string;
  name: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    user: User;
  };
}

export interface ResetResponse {
  message: string;
}

export interface AxiosErrorResponse {
  response?: {
    data: {
      message: string;
    };
  };
}

export interface RestrictedRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

export interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

export interface Nanny {
  _id: string;
  userId: string;
  name: string;
  avatar_url: string;
  birthday: string;
  experience: string;
  education: string;
  kids_age: string;
  price_per_hour: number;
  location: string;
  about: string;
  characters: string[];
  rating: number;
  reviews: Review[];

  createdAt: string;
  updatedAt: string;
}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface NannyResponse {
  data: Nanny;
}

export interface NanniesListResponse {
  data: {
    nannies: Nanny[];
    favorites: Nanny[];
    totalPages: number;
    currentPage: number;
  };
}

export interface FavoritesResponse {
  data: Nanny[];
}

export interface QueryParams {
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  priceRange?: string;
  rating?: number;
}

export interface Appointment {
  _id: string;
  nannyId: string;
  date: string;
  address: string;
  phone: string;
  childAge: number;
  email: string;
  parentName: string;
  meetingTime: string;
  comment: string;
}

export interface AppointmentResponse {
  data: Appointment;
}

export interface QueryParams {
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  priceRange?: string;
  rating?: number;
}
