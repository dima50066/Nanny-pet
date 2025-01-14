export interface User {
  email: string;
  _id: string;
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
