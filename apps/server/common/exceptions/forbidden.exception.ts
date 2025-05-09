import { ResCodeEnum } from "@/types/enum/res_code.enum";
import { Exception } from "@/common/exceptions/exception";

export class ForbiddenException extends Exception {
  constructor(message: string, cause?: any) {
    super(message, ResCodeEnum.FORBIDDEN, cause);
  }
}
