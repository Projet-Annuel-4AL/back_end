import { Injectable } from '@nestjs/common';
import { Language } from '../enum/language';
import { ExecutionScript } from '../constants/execution-script';
import { writeFileSync, rmSync } from 'fs';

@Injectable()
export class ExecutionScriptGenerateManagerService {
  generateExecutionScript(language: Language) {
    const content: string = this.getExecutionScript(language);
    writeFileSync(this.getPathScript(language), content);
    console.log('Execution script is created successfully.');
  }

  removeExecutionScript(path: string) {
    rmSync(path + 'entrypoint.sh');
    console.log('Execution script is removed successfully.');
  }

  getExecutionScript(language: Language): string {
    switch (language) {
      case Language.Cpp:
        return ExecutionScript.CPP;
      case Language.Python:
        return ExecutionScript.PYTHON;
      default:
        return ExecutionScript.JAVA;
    }
  }

  getPathScript(language: Language) {
    switch (language) {
      case Language.Cpp:
        return './execution_environments/cpp/entrypoint.sh';
      case Language.Python:
        return './execution_environments/python/entrypoint.sh';
      default:
        return './execution_environments/java/entrypoint.sh';
    }
  }
}
