import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { PautasService } from "./pautas.service";
import {
  CriarPautaResource,
  toDomain,
  toRepresentation,
} from "./pautas.resource";
import { Response } from "express";
import { ErrorResponse } from "src/commom/error.resoucer";

interface IPautasController {
  save(descricao: CriarPautaResource, res: Response): Promise<Response>;
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
}
