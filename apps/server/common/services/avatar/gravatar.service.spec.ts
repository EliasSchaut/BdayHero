import { Test, TestingModule } from "@nestjs/testing";
import { GravatarService } from "./gravatar.service";
import { DangerException } from "@/common/exceptions/danger.exception";
import { GuestModel } from "@/types/models/guest.model";
import { CryptoService } from "@/common/services/crypto.service";

describe("GravatarService", () => {
  let service: GravatarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GravatarService, CryptoService],
    }).compile();

    service = module.get<GravatarService>(GravatarService);
  });

  it("get_avatar returns gravatar URL if email exists", async () => {
    const user = {
      id: "1",
      email: "test@example.com",
    } as GuestModel;
    const hash = "55502f40dc8b7c769880b10874abc9d0";
    const result = await service.get_avatar_href(user);

    expect(result).toBe(`https://www.gravatar.com/avatar/${hash}`);
  });

  it("upload_avatar throws DangerException", async () => {
    await expect(service.upload_avatar()).rejects.toThrow(DangerException);
  });

  it("delete_avatar throws DangerException", async () => {
    await expect(service.delete_avatar()).rejects.toThrow(DangerException);
  });
});
