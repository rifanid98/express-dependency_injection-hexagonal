import KnexInstance from "../../../infrastructure/persistence/postgresql/knex/knex";
import { ProviderRegistry } from "../../type";

export const UserRepositoryProvider: ProviderRegistry[] = [
  {
    token: "Knex",
    useClass: KnexInstance,
  },
];
