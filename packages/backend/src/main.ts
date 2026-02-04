import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const configService = app.get(ConfigService)
  const environment = configService.getOrThrow<string>('environment')
  const port = configService.getOrThrow<number>('port')

  const logger = new Logger()

  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages: environment === 'production',
    })
  )

  const config = new DocumentBuilder()
    .setTitle('My Buildings API')
    .setDescription('Building Management API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  if (environment === 'development') {
    const fs = await import('fs')
    const path = await import('path')
    fs.writeFileSync(
      path.join(__dirname, '../../openapi.json'),
      JSON.stringify(document, null, 2)
    )
  }

  await app.listen(port)
  logger.log(`App running on port ${port}`)
}
bootstrap().catch(err => {
  console.error(err)
  process.exit(1)
})
