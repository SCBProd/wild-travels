import axios from 'axios';
import { NextResponse } from 'next/server';
import { api } from '../api';

export async function GET() {
	try {
		const { data } = await api.get('/categories');
		return NextResponse.json(data);
	} catch (error: unknown) {
		const status = axios.isAxiosError(error)
			? (error.response?.status ?? 500)
			: 500;
		const message = axios.isAxiosError(error)
			? (error.response?.data?.message ?? 'Failed to fetch categories')
			: 'Failed to fetch categories';

		return NextResponse.json({ message }, { status });
	}
}
