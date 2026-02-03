# Testownik Converter

This is a command-line utility for converting text-base single-choice or multiple-choice quizzes into the JSON format used by [Testownik](https://testownik.solvro.pl).

## Adapters

Currently, the only supported adapter is for converting quizzes exported from CCNA exams.

### CCNA

Invoke this adapter by running: 

```sh
npx testownik-converter ccna <filename>
```

## Options

For a list of globally-available command-line options, run the command without arguments.

```sh
npx testownik-converter
```

For more information about adapter-specific options, use the `help` command:

```sh
npx testowink-converter help ccna
```

## Copyright

Copyright © 2026 Konrad Guzek

This file, along with all other source code files found in this repository, is a part of the Testownik Converter project, licensed under the [MIT license](./LICENSE).

This tool is not affiliated with, endorsed by, or sponsored by Cisco Systems, Inc. Cisco® is a registered trademark of Cisco Systems, Inc.

It is also not endorsed neither by Testownik nor by KN Solvro, although you should [check out their projects](https://solvro.pwr.edu.pl)!
