// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import path from "path";

// https://astro.build/config
export default defineConfig({
	integrations: [
		icon(),
		expressiveCode({
			themes: ["catppuccin-latte", "catppuccin-mocha"]
		})
	],
	vite: {
		resolve: {
			alias: {
				"@": path.resolve("./src")
			}
		}
	}
});
