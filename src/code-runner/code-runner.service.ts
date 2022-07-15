import { Injectable } from '@nestjs/common';
import { FileManagerService } from './file-manager/file-manager.service';
import { ExecutionScriptGenerateManagerService } from './execution-script-generate-manager/execution-script-generate-manager.service';
import { DockerManagerService } from './docker-manager/docker-manager.service';
import { Language } from './enum/language';

@Injectable()
export class CodeRunnerService {
  constructor(
    private readonly fileManager: FileManagerService,
    private readonly executionScriptManager: ExecutionScriptGenerateManagerService,
    private readonly dockerManager: DockerManagerService,
  ) {}

  runCode(code: string, language: Language) {
    const folderName = this.fileManager.getFolderName(language);
    const fileName = this.fileManager.getFileName(language);
    const pathMain: string = folderName + fileName;

    this.fileManager.createFile(pathMain, code);

    this.executionScriptManager.generateExecutionScript(language);

    const imageName = this.dockerManager.getImageName(language);
    this.dockerManager.buildImage(folderName, imageName);
    const result = this.dockerManager.runImage(imageName);

    this.executionScriptManager.removeExecutionScript(folderName);
    this.fileManager.removeFile(pathMain);
    return result;
  }
}
