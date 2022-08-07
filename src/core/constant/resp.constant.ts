export type GlobalResponse = {
  statusCode: number;
  message?: string;
  data?: any | any[];
  error?: any;
  errors?: any[];
};

export type GlobalResponseWithData = {
  message?: string;
  data?: any | any[];
};

export type GlobalResponseWithError = {
  message?: string;
  error?: any;
  errors?: any[];
};
