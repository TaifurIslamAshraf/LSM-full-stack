import { apiSlice } from "../api/apiSlice";
import { userRegistetion } from "./authSlice";

type RegistretionRes = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistetion({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activation",
        method: "POST",
        body: {
          activation_code,
          activation_token,
        },
      }),
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;
