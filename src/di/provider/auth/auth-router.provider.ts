import {
  AuthController,
  AuthControllerImpl,
} from "../../../interface/extl/v1/auth";
import { Router } from "express";
import { ProviderRegistry } from "../../type";

export const AuthHandlerProvider: ProviderRegistry[] = [
  {
    token: AuthController,
    useClass: AuthControllerImpl,
  },
  {
    token: "Router",
    useValue: Router(),
  },
];
