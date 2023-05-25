import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { PautasService } from "./pautas.service";
import {
  CriarPautaResource,
  INovaSessaoResource,
  toDomain,
  toRepresentation,
} from "./pautas.resource";
import { Response } from "express";
import { ErrorResponse } from "src/commom/error.resoucer";

interface IPautasController {
  save(descricao: CriarPautaResource, res: Response): Promise<Response>;
  list(res: Response): Promise<Response>;
  criarSessao(
    id: string,
    resourse: INovaSessaoResource,
    res: Response
  ): Promise<Response>;
}

@Controller("pautas")
export class PautasController {
  constructor(private readonly service: PautasService) {}

  @Post()
  async save(
    @Body() descricao: CriarPautaResource,
    @Res() res: Response
  ): Promise<Response> {
    const result = await this.service.save(toDomain(descricao));

    if (result.isError())
      return res
        .status(HttpStatus.CONFLICT)
        .json(new ErrorResponse(result.error.message));

    return res.status(HttpStatus.CREATED).json(toRepresentation(result.value));
  }

  @Get()
  async list(@Res() res: Response): Promise<Response> {
    const result = await this.service.findAll();
    return res.status(HttpStatus.OK).json(result.map(toRepresentation));
  }

  @Post("/:id/sessao")
  async criarSessao(
    @Param("id") id: string,
    @Body() resourse: INovaSessaoResource,
    @Res() res: Response
  ): Promise<Response> {
    const pauta = await this.service.findById(String(id));
    if (!pauta)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send(new ErrorResponse("Pauta não encontrada!"));

    const sucesso = await this.service.iniciarSessao(pauta, resourse.minutos);
    if (sucesso) return res.status(HttpStatus.OK).send();

    const errorResponse = new ErrorResponse(
      "Não foi possivel iniciar a sessão para esta pauta, sua sessão já foi iniciada ou encerrada!"
    );
    return res.status(HttpStatus.CONFLICT).send(errorResponse);
  }
}
