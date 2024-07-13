import * as graphql from "@nestjs/graphql";
import { FollowResolverBase } from "./base/follow.resolver.base";
import { Follow } from "./base/Follow";
import { FollowService } from "./follow.service";

@graphql.Resolver(() => Follow)
export class FollowResolver extends FollowResolverBase {
  constructor(protected readonly service: FollowService) {
    super(service);
  }
}
