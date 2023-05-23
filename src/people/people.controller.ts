import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { PeopleService } from "./people.service";
import { Person, PersonUpdateBody } from "./person";
import { Response } from "express";

interface IPeopleController {
  verificationPersonExist(id: number, res: Response): Person | Response;
  save(person: Person, res: Response): Response;
  list(res: Response): Response;
  getById(id: number, res: Response): Response;
  putById(id: number, person: Person, res: Response): Response;
  deleteById(id: number, res: Response): Response;
}

@Controller("people")
export class PeopleController implements IPeopleController {
  constructor(private readonly servicePeople: PeopleService) {}

  verificationPersonExist(id: number, res: Response): Person | Response {
    const existPeople = this.servicePeople.findById(id);
    if (!existPeople)
      return res.status(404).json({ message: "Id da pessoa não existe!" });
    return existPeople;
  }

  @Post()
  save(@Body() person: Person, @Res() res: Response): Response {
    this.servicePeople.save(person);
    return res.status(201).send({ message: "Salvo com sucesso!" });
  }

  @Get()
  list(@Res() res: Response): Response {
    const list: Person[] = this.servicePeople.list();
    return res.json(list);
  }

  @Get("/:id")
  getById(@Param("id") id: number, @Res() res: Response): Response {
    const existPeople = this.verificationPersonExist(id, res);
    return res.json(existPeople);
  }

  @Put("/:id")
  putById(
    @Param("id") id: number,
    @Body() person: PersonUpdateBody,
    @Res() res: Response
  ): Response {
    this.verificationPersonExist(id, res);
    this.servicePeople.UpdateById(id, person);
    return res.status(204).send();
  }

  @Delete("/:id")
  deleteById(@Param("id") id: number, @Res() res: Response): Response {
    this.verificationPersonExist(id, res);
    this.servicePeople.deleteById(id);

    return res.status(204).send();
  }
}
