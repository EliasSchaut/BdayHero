import {
	EMAIL_TRANSPORT,
	EMAIL_HOST,
	EMAIL_PORT,
	EMAIL_SECURE,
	EMAIL_HOST_USER,
	EMAIL_HOST_PASSWORD,
	PROJ_TITLE,
	EMAIL_FROM,
	EMAIL_FILE_DIR
} from '$app/env/private';

import nodemailer, { type Transporter } from 'nodemailer';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

let transporter: Transporter | undefined;

function getTransporter(): Transporter {
	if (transporter) return transporter;
	if (EMAIL_TRANSPORT === 'json') {
		// Development: mails are not sent but printed to stdout.
		transporter = nodemailer.createTransport({ jsonTransport: true });
	} else if (EMAIL_TRANSPORT === 'file') {
		// End-to-end tests: mails are written as JSON files to EMAIL_FILE_DIR.
		transporter = nodemailer.createTransport({ jsonTransport: true });
	} else {
		transporter = nodemailer.createTransport({
			host: EMAIL_HOST,
			port: Number(EMAIL_PORT ?? 587),
			secure: EMAIL_SECURE === 'true',
			auth: EMAIL_HOST_USER ? { user: EMAIL_HOST_USER, pass: EMAIL_HOST_PASSWORD } : undefined
		});
	}
	return transporter;
}

export interface Mail {
	to: string;
	subject: string;
	text: string;
}

export async function sendMail(mail: Mail): Promise<void> {
	const title = PROJ_TITLE ?? 'BdayHero';
	const info = await getTransporter().sendMail({
		from: `"${title}" <${EMAIL_FROM || EMAIL_HOST_USER || 'noreply@localhost'}>`,
		to: mail.to,
		subject: `[${title}] ${mail.subject}`,
		text: mail.text
	});
	if (EMAIL_TRANSPORT === 'json') {
		console.log(`[mail] ${JSON.stringify(JSON.parse(String(info.message)))}`);
	} else if (EMAIL_TRANSPORT === 'file') {
		const dir = EMAIL_FILE_DIR ?? '.mails';
		await mkdir(dir, { recursive: true });
		await writeFile(join(dir, `${Date.now()}-${randomUUID()}.json`), String(info.message));
	}
}
