async function sendWhatsAppMessage(accountSid: string, authToken: string, toNumber: string, fromNumber: string, messageBody: string) {
	const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

	const data = new URLSearchParams();
	data.append('To', `whatsapp:${toNumber}`);
	data.append('From', `whatsapp:${fromNumber}`);
	data.append('Body', messageBody);

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: 'Basic ' + btoa(`${accountSid}:${authToken}`),
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: data,
		});
		const resp = await res.json();
		return resp;
	} catch (error) {
		console.log(error);
	}
}

export { sendWhatsAppMessage };
