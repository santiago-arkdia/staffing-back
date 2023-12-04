/* eslint-disable prettier/prettier */
import {MiddlewareConsumer, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './modules/users/users.module';
import {AuthModule} from './modules/auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {ConnectionController} from './connection.controller';
import {AllowAnyIPMiddleware} from './middleware/auth.middleware';
import {AuthService} from './modules/auth/auth.service';
import {ClientsModule} from './modules/clients/clients.module';
import {AdminsModule} from './modules/admin/admin.module';
import {PayrollsModule} from './modules/payroll/payroll.module';
import {CountrysModule} from './modules/business-configuration/country/country.module';
import {RegionsModule} from './modules/business-configuration/regions/region.module';
import {CostCentersModule} from './modules/business-configuration/centers-costs/centers-costs.module';
import {UtilityCentersModule} from './modules/business-configuration/utility-center/utility-center.module';
import {ModuleParameterizationModule} from './modules/module-parameterization/module-parameterization.module';
import {RolessModule} from './modules/roles/roles.module';
import {ConceptsModule} from './modules/concepts/concepts.module';
import {CategoriesNoveltyModule} from './modules/categories-novelty/categories-novelty.module';
import {NoveltyModule} from './modules/novelty/novelty.module';
import {EpsModule} from './modules/eps/eps.module';
import {DiagnosisModule} from './modules/diagnosis/diagnosis.module';
import {AdminClientModule} from './modules/admin-client/admin-client.module';
import {GetAllUsersModule} from './modules/get-all-users/get-all-users.module';
import {StateNoveltyModule} from './modules/state-novelty/state-novelty.module';
import {UserSchema} from './modules/users/entities/user.entity';
import {RolesSchema} from './modules/roles/entities/roles.entity';
import {JobPositionsModule} from './modules/business-configuration/job-positions/job-positions.module';
import {ArlModule} from './modules/arl/arl.module';
import {SpreadsheetNoveltyModule} from './modules/spreadsheet-novelty/spreadsheet-novelty.module';
import {CollaboratorModule} from './modules/collaborators/collaborators.module';
import {CollaboratorCoreModule} from "./modules/collaborator-core/collaborator-core.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_DATABASE_URL, {
            autoIndex: true,
        }),
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},
            {name: 'Role', schema: RolesSchema},
        ]),
        UsersModule,
        AuthModule,
        ClientsModule,
        AdminsModule,
        PayrollsModule,
        CountrysModule,
        RegionsModule,
        CostCentersModule,
        UtilityCentersModule,
        ModuleParameterizationModule,
        RolessModule,
        ConceptsModule,
        CategoriesNoveltyModule,
        NoveltyModule,
        EpsModule,
        DiagnosisModule,
        AdminClientModule,
        GetAllUsersModule,
        StateNoveltyModule,
        JobPositionsModule,
        ArlModule,
        SpreadsheetNoveltyModule,
        CollaboratorModule,
        CollaboratorCoreModule
    ],
    controllers: [AppController, ConnectionController],
    providers: [AppService, AuthService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AllowAnyIPMiddleware).forRoutes('*'); // Aplica la middleware a todas las rutas
    }
}
