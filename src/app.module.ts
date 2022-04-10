import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CodeRunnerModule } from './code-runner/code-runner.module';

@Module({
  imports: [AuthModule, UsersModule, CodeRunnerModule, CodeRunnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
