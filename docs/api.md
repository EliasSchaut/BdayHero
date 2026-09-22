# REST API

All endpoints live under `/api`. Authentication uses the Better Auth session cookie
(`better-auth.session_token`), i.e. the same cookie the website uses. Responses are
localised via the `locale` cookie or `Accept-Language` (`en`, `de`).

## Envelope

```jsonc
// success
{ "ok": true, "code": "SUCCESS" | "INFO", "message": "optional", "data": { ... } }
// error
{ "ok": false, "code": "WARNING" | "DANGER" | "FORBIDDEN", "message": "...", "issues": [ { "path": "firstName", "message": "..." } ] }
```

`code` maps to the alert shown in the UI: `SUCCESS` → green, `INFO` → blue, `WARNING` → yellow,
`DANGER`/`FORBIDDEN` → red. HTTP status: validation `400`, not signed in `401`, slot full `409`,
unexpected `500`. In hero-only mode (`PUBLIC_HERO_ONLY=true`) every guest/shift/auth endpoint
answers `404` with code `FORBIDDEN`.

## Endpoints

| Method   | Path                           | Auth    | Description                                                 |
| -------- | ------------------------------ | ------- | ----------------------------------------------------------- |
| `GET`    | `/api/health`                  | –       | `{ status, db }`; `503` when the database is down           |
| `*`      | `/api/auth/*`                  | –       | Better Auth (magic link, social sign-in, session, sign-out) |
| `GET`    | `/api/guests`                  | –       | `{ guests, count }` — non-public guests are anonymised      |
| `GET`    | `/api/guests/count`            | –       | `{ count }` (guests + companions)                           |
| `GET`    | `/api/guests/me`               | session | Own profile incl. companions and assigned slot ids          |
| `PATCH`  | `/api/guests/me`               | session | Update profile (JSON body, see below)                       |
| `DELETE` | `/api/guests/me`               | session | Delete account and sign out                                 |
| `GET`    | `/api/shifts`                  | –       | Shifts with slots; `?lang=de` overrides the locale          |
| `GET`    | `/api/shifts/me`               | session | `{ slotIds }`                                               |
| `POST`   | `/api/shifts/slots/:id/assign` | session | Take a slot (idempotent, `409` when full)                   |
| `DELETE` | `/api/shifts/slots/:id/assign` | session | Drop a slot (`400` when not assigned)                       |

### `PATCH /api/guests/me` body

```json
{
	"firstName": "Alice",
	"lastName": "Wonder",
	"bio": "max 20 chars",
	"attendanceStatus": 1,
	"profilePublic": true,
	"needBed": false,
	"hasBed": false,
	"isVegan": true,
	"companions": [{ "name": "Bob Builder" }]
}
```

Names must start with a capital letter (2–20 chars). `attendanceStatus`: `-1` not responded,
`0` declined, `1` attending, `2` unsure. `companions` is capped by `PUBLIC_MAX_COMPANIONS_PER_GUEST`
and replaces the existing list.

### Magic link via API

```sh
curl -X POST http://localhost:3000/api/auth/sign-in/magic-link \
  -H 'Content-Type: application/json' -H 'Origin: http://localhost:3000' \
  -d '{"email":"you@example.com","callbackURL":"/guests/verified"}'
```
