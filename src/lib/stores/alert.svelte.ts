import type { ActionFeedback } from '$lib/types/api';
import { alertTypeFor, type AlertType } from '$lib/utils/alert-map';

class AlertStore {
	visible = $state(false);
	message = $state('');
	type = $state<AlertType>('info');

	show(message: string, type: AlertType = 'info') {
		this.message = message;
		this.type = type;
		this.visible = true;
	}

	/** Show feedback returned from a form action. */
	feedback(feedback: ActionFeedback | undefined | null) {
		if (!feedback) return;
		this.show(feedback.message, alertTypeFor(feedback.code));
	}

	hide() {
		this.visible = false;
	}
}

export const alert = new AlertStore();
