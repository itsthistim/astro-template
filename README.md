# Astro Template

```sh
pnpm create astro@latest -- --template itsthistim/astro-template
```

A minimal Astro template with Docker configuration, local fonts, somewhat opinionated default styles and a few useful components.

## 📝 Using this template for your own project

When you use this template for a new site, make sure to update the following values:

- **[Dockerfile](https://github.com/itsthistim/astro-template/blob/master/Dockerfile)**: Update the nginx config filename to the corresponding rendering method your project uses (either `nginx.ssr.conf` or `nginx.static.conf`). You can delete the unused config file.

- **[docker-compose.yml](https://github.com/itsthistim/astro-template/blob/master/docker-compose.yml)**: Change `image` and `container_name` to match your new project, and adjust ports if necessary.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run deploy`          | Deploy your site using Docker Compose            |
| `pnpm run format`          | Format the code using Prettier                   |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |
