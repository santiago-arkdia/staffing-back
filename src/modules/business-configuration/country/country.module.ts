import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './entities/country.entity';
import { CountryController } from './controllers/country.controller';
import { CountryService } from './services/country.service';
import { UsersService } from '../../users/services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Country.name, schema: CountrySchema },
    ]),
  ],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountrysModule {}
