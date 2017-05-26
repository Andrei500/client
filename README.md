# np-online

> Клиентская сторона приложения

# Начало работы

``` bash
# Установка зависимостей
npm install
# или
yarn

# Сборка для разработки с hot-reload
npm run dev
# или
yarn dev

# Сборка для продакшена с минификацией
npm run build
# или
yarn build
```

# Структура проекта

``` bash
├── build/                      # Настройки Webpack для dev и prod сборок
├── config/                     # Настройки проекта для Webpack
├── src/
│   ├── assets/                 # Статика (img/, fonts/, css/)
│   ├── components/             # Компоненты .vue
│   │   ├── pages/              # Компоненты-страницы для роутера
│   │   └── UI/                 # Независимые UI-элементы
│   ├── plugins/                # Плагины
│   ├── App.vue                 # Главный компонент
│   ├── main.js                 # Точка входа в приложение
│   └── routes.js               # Маршруты для роутера
├── static/                     # Статические файлы вне сборки Webpack (папка будет скопирована на продакшен)
├── .babelrc                    # Настройка Babel
├── index.html                  # index.html (сюда будет вставлен весь код при продакшен-сборке)
├── package.json                # Зависимости и скрипты для сборок
└── yarn.lock                   # Добавочный файл Yarn
```
