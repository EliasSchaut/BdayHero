/** Time of day as HH:mm in the event's timezone (Europe/Berlin). */
export function formatTime(iso: string | Date): string {
	return new Date(iso).toLocaleTimeString('de-DE', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'Europe/Berlin'
	});
}
