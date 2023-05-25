import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Pauta } from "./pautas.entity";
import { Result } from "src/commom/Result";

interface IPautaService {
  save(pauta: Pauta): Promise<Result<Pauta>>;
  findAll(): Promise<Pauta[]>;
  findById(id: string): Promise<Pauta>
  iniciarSessao(pauta: Pauta, minutos: number): Promise<boolean>;
}

@Injectable()
export class PautasService implements IPautaService {
  constructor(
    @Inject("PAUTA_REPOSITORY")
    private readonly pautaRepository: Repository<Pauta>
  ) {}

  static TEMPO_PADRAO_PAUTA: number = 10;

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

  async findAll(): Promise<Pauta[]> {
    return await this.pautaRepository.find();
  }

  async findById(id: string): Promise<Pauta> {
    return await this.pautaRepository.findOneBy({ id });
  }

  async iniciarSessao(
    pauta: Pauta,
    minutos: number = PautasService.TEMPO_PADRAO_PAUTA
  ): Promise<boolean> {
    if (!pauta.isIniciarSessao()) return false;

    pauta.abertura = new Date();
    pauta.fechamento = new Date(pauta.abertura.getTime() + minutos * 60000);

    await this.pautaRepository.update(pauta.id, pauta);
    return true;
  }
}
