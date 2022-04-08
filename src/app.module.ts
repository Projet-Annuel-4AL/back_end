import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompilerModule } from './compiler/compiler.module';
import { MainClassGenerateManagerModule } from './run-code/main-class-generate-manager/main-class-generate-manager.module';
import { DockerManagerModule } from './run-code/docker-manager/docker-manager.module';
import { FileManagerModule } from './run-code/file-manager/file-manager.module';
import { ExecutionScriptGenerateManagerModule } from './run-code/execution-script-generate-manager/execution-script-generate-manager.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CompilerModule,
    MainClassGenerateManagerModule,
    DockerManagerModule,
    FileManagerModule,
    ExecutionScriptGenerateManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
