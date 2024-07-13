import { Module } from "@nestjs/common";
import { FollowModuleBase } from "./base/follow.module.base";
import { FollowService } from "./follow.service";
import { FollowController } from "./follow.controller";
import { FollowResolver } from "./follow.resolver";

@Module({
  imports: [FollowModuleBase],
  controllers: [FollowController],
  providers: [FollowService, FollowResolver],
  exports: [FollowService],
})
export class FollowModule {}
