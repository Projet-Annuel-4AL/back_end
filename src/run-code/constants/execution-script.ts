export class ExecutionScript {
  static readonly JAVA =
    '#!/usr/bin/env bash\n' +
    'mv main.java Main.java\n' +
    'javac Main.java\n' +
    'java Main';

  static readonly CPP =
    '#!/usr/bin/env bash\n' + 'g++ main.cpp -o exec\n' + './exec';
}
