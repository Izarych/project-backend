import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ParseModule } from './parse/parse.module';
import { MovieModule } from './movie/movie.module';
import { PeopleModule } from './people/people.module';
import { Movie } from "./movie/movie.model";
import { People } from "./people/people.model";
import { MoviePeople } from "./people/moviepeople.model";
import { GenresModule } from './genres/genres.module';
import { Genres } from "./genres/genres.model";
import { MovieGenres } from "./genres/moviegenres.model";


@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Movie, People, MoviePeople, Genres, MovieGenres],
      autoLoadModels: true
    }),
    ParseModule,
    MovieModule,
    PeopleModule,
    GenresModule
  ]
})
export class AppModule { }
