const initialState = {
  data: {
    name: "",
    email: "",
  },
  isLoading: false,
};

export const usersReducer = (state = initialState, action) => {
  if (action.type === "CUSTOMER_LOGIN_PENDING") {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === "CUSTOMER_LOGIN_SUCCESS") {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  } else if (action.type === "SELLER_LOGIN_SUCCESS") {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  } else if (action.type === "REGISTER_CUSTOMER_SUCCESS") {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  } else if (action.type === "REGISTER_SELLER_SUCCESS") {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  } else {
    return state;
  }
};
