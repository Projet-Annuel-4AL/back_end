import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class CompilerService {
  constructor(private readonly http: HttpService) {}

  async compile(
    code: string,
    language: string,
    input: string,
  ): Promise<Observable<AxiosResponse<any>>> {
    if (language == 'Python') {
      language = 'py';
    } else if (language == 'Java') {
      language = 'java';
    }
    // else if (language == 'C++') {
    //   language = 'cpp';
    // }

    const body = JSON.stringify({
      code: code,
      language: language,
      input: input,
    });

    return this.http
      .post('https://codexweb.netlify.app/.netlify/functions/enforceCode', body)
      .pipe(map((response) => response.data.output));
  }
}
