import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decodedToken = await this.firebaseService.getAuth().verifyIdToken(token);
      
      const user = await this.prisma.user.upsert({
        where: { firebaseUid: decodedToken.uid },
        update: {},
        create: {
          email: decodedToken.email || `missing-${decodedToken.uid}@example.com`,
          firebaseUid: decodedToken.uid,
        },
      });

      request['user'] = user;
    } catch (error) {
      console.error("Auth verification failed", error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
