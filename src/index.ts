import { Hono } from 'hono';

type Env = {
	AI: Ai;
};

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
	const ai = c.env.AI;

	const searchQuery = c.req.query('search') as string;

	const messages = [
		{ role: 'system', content: 'you are a coding assistant' },
		{ role: 'user', content: searchQuery },
	];

	const response = await ai.run('@cf/mistral/mistral-7b-instruct-v0.1', { messages });
	return c.json({ data: response });
});

export default app;
