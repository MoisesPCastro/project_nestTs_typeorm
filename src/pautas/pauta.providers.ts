import { DataSource, Repository } from "typeorm";
import { Pauta } from "./pautas.entity";
import { Provider } from "@nestjs/common";

const pautaRepository: Provider<Repository<Pauta>> = {
  provide: "PAUTA_REPOSITORY",
  useFactory: (dataSource: DataSource) => {
    const repository: Repository<Pauta> = dataSource.getRepository(Pauta);
    return repository;
  },
  inject: ["DATA_SOURCE"],
};
export const pautaProviders: Provider[] = [pautaRepository];
