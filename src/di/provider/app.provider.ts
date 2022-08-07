import * as express from "express";
import { AuthRouter, HealthRouter } from "../../interface/extl/v1/router";
import { ProviderRegistry } from "../type";

export const AppProvider: ProviderRegistry[] = [
  {
    token: "Express",
    useValue: express(),
  },
  {
    token: "AppRouters",
    useValue: [new AuthRouter(), new HealthRouter()],
  },
];
