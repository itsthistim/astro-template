// https://expressive-code.com/reference/configuration

const lightTheme = "catppuccin-latte";
const darkTheme = "catppuccin-mocha";

export default {
	themes: [lightTheme, darkTheme],
	themeCssSelector: (theme) => {
		if (theme.name === lightTheme) {
			return '[data-theme="light"]';
		}
		if (theme.name === darkTheme) {
			return '[data-theme="dark"]';
		}

		return `[data-theme="${theme.type}"]`;
	}
};
