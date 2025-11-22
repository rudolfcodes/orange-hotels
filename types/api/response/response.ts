type ApiResponse<T> = {
  status: "success" | "error";
  data?: T;
  error?: string;
  message?: string;
};
