import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { FollowService } from "./follow.service";
import { FollowControllerBase } from "./base/follow.controller.base";

@swagger.ApiTags("follows")
@common.Controller("follows")
export class FollowController extends FollowControllerBase {
  constructor(protected readonly service: FollowService) {
    super(service);
  }
}
