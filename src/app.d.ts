import '@sveltejs/kit';

declare global {
	namespace App {
		interface Locals {
			companyId?: string | null;
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '@sveltejs/kit' {
	interface Locals {
	    companyId?: string | null;
	}
}

export {};
