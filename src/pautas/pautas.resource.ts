import { Pauta } from "./pautas.entity";

export class CriarPautaResource {
  descricao: string;
}

export class PautasResource {
  id: string;
  descricao: string;
  status: string;
}
export class INovaSessaoResource {
  minutos: number;
}

export const toRepresentation = (entity: Pauta): PautasResource => {
  const resource = new PautasResource();
  resource.id = entity.id;
  resource.descricao = entity.descricao;
  resource.status = entity.obterStatus();
  return resource;
};

export const toDomain = (resource: CriarPautaResource): Pauta => {
  const pauta = new Pauta();
  pauta.descricao = resource.descricao;
  return pauta;
};
