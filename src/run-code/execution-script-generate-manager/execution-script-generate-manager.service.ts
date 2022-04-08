import { Injectable } from '@nestjs/common';
import { Language } from '../enum/language';
import { ExecutionScript } from '../constants/execution-script';
import { writeFile } from 'fs';
import { exec } from 'shelljs';

@Injectable()
export class ExecutionScriptGenerateManagerService {
  static generateExecutionScript(language: Language) {
    const content: string =
      ExecutionScriptGenerateManagerService.getExecutionScript(language);
    writeFile(
      ExecutionScriptGenerateManagerService.getPathScript(language),
      content,
      function (err) {
        if (err) return console.log(err);
        console.log('Execution script is created successfully.');
        exec('chmod +x ./execution_environments/java/entrypoint.sh');
        exec('clear');
        exec('./execution_environments/java/entrypoint.sh');
      },
    );
  }

  static getExecutionScript(language: Language): string {
    switch (language) {
      case Language.Cpp:
        return ExecutionScript.CPP;
      default:
        return ExecutionScript.JAVA;
    }
  }

  static getPathScript(language: Language) {
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
