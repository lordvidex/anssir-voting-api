import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Office } from './office.schema';

export interface Response {}

@Injectable()
export class CandidateVoteHideInterceptor<T>
  implements NestInterceptor<T, Response>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<Office|Office[]> {
    return next.handle().pipe(
      map((data: Office | Office[]) => {
        if (Array.isArray(data)) {
          data.forEach(office => office.candidates.forEach(candidate => delete candidate.votes));
        } else {
          data.candidates?.forEach((candidate) => delete candidate.votes);
        }
        return data;
      }),
    );
  }
}
