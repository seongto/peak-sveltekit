import '@sveltejs/kit';

declare global {
	namespace App {
		interface Locals {
			companyUuid?: string | null;
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '@sveltejs/kit' {
	interface Locals {
	    companyUuid?: string | null;
	}
}

export {};
