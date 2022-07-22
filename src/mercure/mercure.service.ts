import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MercureService {
  public readonly url = 'http://localhost:80/.well-known/mercure';
  public jwt =
    'eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.vhMwOaN5K68BTIhWokMLOeOJO4EPfT64brd8euJOA4M';

  constructor(private readonly http: HttpService) {}

  public sendPostsUpdate() {
    const postData = new URLSearchParams({
      topic: 'http://localhost:4200/posts',
    }).toString();
    const headersRequest = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${this.jwt}`,
    };
    return this.http
      .post(this.url, postData, { headers: headersRequest })
      .subscribe();
  }

  public sendCollabUpdate(groupId: number) {
    const postData = new URLSearchParams({
      topic: 'http://localhost:4200/groups/collab/' + groupId,
      data: JSON.stringify({ group_id: groupId }),
    }).toString();
    const headersRequest = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${this.jwt}`,
    };
    return this.http
      .post(this.url, postData, { headers: headersRequest })
      .subscribe();
  }
}
