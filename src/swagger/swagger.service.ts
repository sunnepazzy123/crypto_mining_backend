import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";

export const swaggerDoc = (app: INestApplication) => {
  const userConfig = new DocumentBuilder()
                            // .setTitle('User example')
                            .setDescription('The Application API description')
                            .setVersion('2.0')
                            .build();
  const document = SwaggerModule.createDocument(app, userConfig);
  SwaggerModule.setup('api', app, document); 
}