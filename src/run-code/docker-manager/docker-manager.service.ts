import { Injectable } from '@nestjs/common';
import { Language } from '../enum/language';
import { exec } from 'shelljs';

@Injectable()
export class DockerManagerService {
  static buildImage(folderName, imageName) {
    exec('docker image build ' + folderName + ' -t ' + imageName);
  }

  static runImage(imageName) {
    return exec('docker run --rm ' + imageName).stdout;
  }

  static getImageName(language: Language): string {
    switch (language) {
      case Language.Python:
        return 'pyhton';
      case Language.Cpp:
        return 'cpp';
      default:
        return 'java';
    }
  }
}
