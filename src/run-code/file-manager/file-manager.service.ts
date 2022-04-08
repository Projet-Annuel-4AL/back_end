import { Injectable } from '@nestjs/common';
import { Language } from '../enum/language';
import { rmSync, writeFile } from 'fs';

@Injectable()
export class FileManagerService {
  static createFile(path: string, code: string) {
    writeFile(path, code, function (err) {
      if (err) return console.log(err);
      console.log('Main class is created successfully.');
    });
  }

  static deleteFile(path: string) {
    rmSync(path);
  }

  static getFolderName(language: Language): string {
    let folderName = 'execution_environments/';
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

  static getFileName(language: Language): string {
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
