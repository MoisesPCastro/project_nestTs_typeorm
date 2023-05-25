import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Pauta } from "./pautas.entity";
import { Result } from "src/commom/Result";

interface IPautaService {
  save(pauta: Pauta): Promise<Result<Pauta>>;
}

@Injectable()
export class PautasService implements IPautaService {
  constructor(
    @Inject("PAUTA_REPOSITORY")
    private readonly pautaRepository: Repository<Pauta>
  ) {}

  async save(pauta: Pauta): Promise<Result<Pauta>> {
    const descricao = pauta.descricao;
    if (
      await this.pautaRepository.findOne({
        where: {
          descricao,
        },
      })
    )
      return new Result(null, new Error("pauta existente!"));
    //
    const result = await this.pautaRepository.save(pauta);
    return new Result(result, null);
  }
}
