import { Injectable } from '@nestjs/common';
import { Language } from '../enum/language';
import { rmSync, writeFileSync } from 'fs';

@Injectable()
export class FileManagerService {
  createFile(path: string, code: string) {
    writeFileSync(path, code);
    console.log('Main class is created successfully.');
  }

  removeFile(path: string) {
    rmSync(path);
    console.log('Main class is removed successfully.');
  }

  getFolderName(language: Language): string {
    let folderName = './execution_environments/';
    switch (language) {
      case Language.Java:
        folderName += 'java/';
        break;
      case Language.Python:
        folderName += 'python/';
        break;
      case Language.Cpp:
        folderName += 'cpp/';
        break;
      default:
        break;
    }
    return folderName;
  }

  getFileName(language: Language): string {
    let fileName = 'main.';
    switch (language) {
      case Language.Java:
        fileName += 'java';
        break;
      case Language.Python:
        fileName += 'py';
        break;
      case Language.Cpp:
        fileName += 'cpp';
        break;
      default:
        break;
    }
    return fileName;
  }
}
