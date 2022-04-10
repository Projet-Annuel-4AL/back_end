import { Injectable } from '@nestjs/common';
import { Language } from '../enum/language';
import { exec } from 'shelljs';

@Injectable()
export class DockerManagerService {
  buildImage(folderName, imageName) {
    exec('docker image build ' + folderName + ' -t ' + imageName);
  }

  runImage(imageName) {
    return exec('docker run --rm ' + imageName).stdout;
  }

  getImageName(language: Language): string {
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
