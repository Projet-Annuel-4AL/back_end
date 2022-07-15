export class MainClasses {
  static readonly JAVA =
    'public class Main%s {\n' +
    '\tpublic static void main(String[] args) {\n' +
    '\t\t%s\n' +
    '\t}\n' +
    '\n' +
    '\tstatic %s\n' +
    '}';

  static readonly CPP =
    '#include <iostream>\n' +
    'using namespace std;\n\n' +
    '%s\n\n' +
    'int main() {\n' +
    '    %s' +
    '    return 0;\n' +
    '}';
}
