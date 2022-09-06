import {Body, Controller, Get, Post} from '@nestjs/common';

import {AppService} from './app.service';
import {ApiBody, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {ExampleRequest} from "./example.request";
import {ExampleResponse} from "./example.response";

@Controller("app")
@ApiTags("app")
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post("example")
  @ApiBody({type: ExampleRequest})
  @ApiOkResponse({type: ExampleResponse, description: "Example description"})
  example(
    @Body() request: ExampleRequest,
  ) {
    const response = new ExampleResponse()
    response.stringAttribute = "response"
    response.dateAttribute = new Date()
    return response
  }
}
