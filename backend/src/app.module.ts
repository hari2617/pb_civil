import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OwnersModule } from './owners/owners.module';
import { ProjectsModule } from './projects/projects.module';
import { SupervisorsModule } from './supervisors/supervisors.module';
import { DailyUpdatesModule } from './daily-updates/daily-updates.module';

@Module({
  imports: [
    // ── Config (loads .env) ──────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // ── Database ─────────────────────────────────────────────────────────
    PrismaModule,

    // ── Feature modules ──────────────────────────────────────────────────
    AuthModule,
    OwnersModule,
    ProjectsModule,
    SupervisorsModule,
    DailyUpdatesModule,
  ],
})
export class AppModule {}
