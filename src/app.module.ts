import { Module } from "@nestjs/common";

import { PeopleModule } from "./people/people.module";
import { DatabaseModule } from './database/database.module';
import { PautasModule } from './pautas/pautas.module';

@Module({
  imports: [PeopleModule, DatabaseModule, PautasModule],
})
export class AppModule {}
