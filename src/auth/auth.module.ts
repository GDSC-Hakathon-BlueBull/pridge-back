import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import * as admin from 'firebase-admin';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: `${configService.get(
              'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
            )}s`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    {
      provide: 'FIREBASE_APP',
      useFactory: async (configService: ConfigService) => {
        return admin.initializeApp({
          credential: admin.credential.cert({
            projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
            privateKey: configService
              .get<string>('FIREBASE_PRIVATE_KEY')!
              .replace(/\\n/g, '\n'),
            clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          }),
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
