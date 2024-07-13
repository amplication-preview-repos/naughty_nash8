import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { TweetController } from "../tweet.controller";
import { TweetService } from "../tweet.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  content: "exampleContent",
  author: "exampleAuthor",
  tweetContent: "exampleTweetContent",
  tweetCreatedAt: new Date(),
  tweetAuthor: "exampleTweetAuthor",
};
const CREATE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  content: "exampleContent",
  author: "exampleAuthor",
  tweetContent: "exampleTweetContent",
  tweetCreatedAt: new Date(),
  tweetAuthor: "exampleTweetAuthor",
};
const FIND_MANY_RESULT = [
  {
    id: "exampleId",
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "exampleContent",
    author: "exampleAuthor",
    tweetContent: "exampleTweetContent",
    tweetCreatedAt: new Date(),
    tweetAuthor: "exampleTweetAuthor",
  },
];
const FIND_ONE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  content: "exampleContent",
  author: "exampleAuthor",
  tweetContent: "exampleTweetContent",
  tweetCreatedAt: new Date(),
  tweetAuthor: "exampleTweetAuthor",
};

const service = {
  createTweet() {
    return CREATE_RESULT;
  },
  tweets: () => FIND_MANY_RESULT,
  tweet: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("Tweet", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: TweetService,
          useValue: service,
        },
      ],
      controllers: [TweetController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /tweets", async () => {
    await request(app.getHttpServer())
      .post("/tweets")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        tweetCreatedAt: CREATE_RESULT.tweetCreatedAt.toISOString(),
      });
  });

  test("GET /tweets", async () => {
    await request(app.getHttpServer())
      .get("/tweets")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
          tweetCreatedAt: FIND_MANY_RESULT[0].tweetCreatedAt.toISOString(),
        },
      ]);
  });

  test("GET /tweets/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/tweets"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /tweets/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/tweets"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        tweetCreatedAt: FIND_ONE_RESULT.tweetCreatedAt.toISOString(),
      });
  });

  test("POST /tweets existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/tweets")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        tweetCreatedAt: CREATE_RESULT.tweetCreatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/tweets")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
