import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

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
      disableErrorMessages: process.env.NODE_ENV === 'production',
    })
  )

  const config = new DocumentBuilder()
    .setTitle('My Buildings API')
    .setDescription('Building Management API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  if (process.env.NODE_ENV === 'development') {
    const fs = await import('fs')
    const path = await import('path')
    fs.writeFileSync(
      path.join(__dirname, '../../openapi.json'),
      JSON.stringify(document, null, 2)
    )
  }

  await app.listen(process.env.PORT ?? 3000)
  logger.log(`App running on port ${process.env.PORT}`)
}
bootstrap().catch(err => {
  console.error(err)
  process.exit(1)
})
