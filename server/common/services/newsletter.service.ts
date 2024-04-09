import { Injectable, Logger } from '@nestjs/common';
import { DangerException } from '@/common/exceptions/danger.exception';

@Injectable()
export class NewsletterService {
  async subscribe(email: string) {
    return await this.ionos_mail_server_request(email, 'subscribe');
  }

  async unsubscribe(email: string) {
    return await this.ionos_mail_server_request(email, 'unsubscribe');
  }

  private async ionos_mail_server_request(
    email: string,
    action: 'subscribe' | 'unsubscribe',
  ) {
    const res = await fetch(
      'https://ml.kundenserver.de/cgi-bin/mailinglist.cgi',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          FBMLNAME: 'bday@schaut.dev',
          subscribe_r: action,
          mailaccount_r: email,
          mailaccount2_r: email,
        }),
      },
    ).catch((e) => {
      throw new DangerException(
        'Internal error with newsletter. Please try again later!',
        e,
      );
    });
    return res.status === 200;
  }
}
