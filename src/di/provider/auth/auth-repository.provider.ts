import KnexInstance from "../../../infrastructure/persistence/postgresql/knex/knex";
import { ProviderRegistry } from "../../type";

export const AuthRepositoryProvider: ProviderRegistry[] = [
  {
    token: "Knex",
    useClass: KnexInstance,
  },
];
