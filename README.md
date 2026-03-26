<<<<<<< HEAD
# Сайт СВО — лидогенерация

Репозиторий: [github.com/kaluginvit72/SVO_viplaty_site](https://github.com/kaluginvit72/SVO_viplaty_site).

Исходный код лендинга в каталоге **`web/`** (Next.js).

## Быстрый старт

```bash
cd web
npm install
cp .env.example .env
npm run dev
```

## Документация

Вся инструкция по проекту, лидам, Telegram, **CI** и **деплою в production (Docker, GHCR, GitHub Actions, VPS, Nginx, Certbot, legacy PM2)** собрана в **[web/README.md](web/README.md)**.

Кратко по автоматизации в репозитории:

- **CI:** [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — lint и сборка на push/PR.
- **Production:** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — образ в GHCR и обновление контейнера на VPS.
- **Legacy (PM2):** [`.github/workflows/deploy-vps.yml`](.github/workflows/deploy-vps.yml) — только ручной запуск.
=======
# SVO_viplaty_site
>>>>>>> a4cbce4daca98c58843d9255affe5fd4cf16ac4f
