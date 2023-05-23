import { Injectable } from "@nestjs/common";
import { Person, PersonUpdateBody } from "./person";

interface IPeopleService {
  save(person: Person): void;
  list(): Person[];
  findById(id: number): Person;
  UpdateById(id: number, person: Person): void;
  deleteById(id: number): void;
}

@Injectable()
export class PeopleService implements IPeopleService {
  people: Person[] = [];
  save(person: Person): void {
    this.people.push(person);
  }

  list(): Person[] {
    return this.people;
  }

  findById(id: number): Person {
    const foundPerson = this.people.find((item) => item.id === Number(id));

    return foundPerson;
  }

  UpdateById(id: number, person: PersonUpdateBody): void {
    this.people.forEach((element: Person) => {
      if (id == element.id) {
        element.name = person.name;
      }
    });
  }

  deleteById(id: number): void {
    const newPersons = this.people.filter((item: Person) => item.id != id);
    this.people = newPersons;
  }
}
