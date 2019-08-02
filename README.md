#odi
####Мини express фреймворк.

---

Что планируется сделать:

1. odi-cli, чтобы иметь возможно быстро создавать каркасы, например

```shell
odi-cli startproject awesomeProject
```

---

Express позиционирует себя как opinionated, или, говоря другими словами:

1. Голый.
2. Без каркаса.

##Основные моменты

1. Проект называется проектом (а не app/приложение).
2. Приложение — составная часть проекта.
3. middleware (mw) -функции выносятся отдельно в папку mw в отдельные файлы.
4. view-функции выносятся отдельно в controller.js

## Базовая структуру проекта

_server_ или _проект_ — контейнер всего проекта.

+views
+public
+config
+passport
local.js
default.js
connectDB.js  
server.js
urls.js
views.js
models.js

## Базовая структура приложения

+mw
router.js
models.js
controller.js

## Шаблоны

Папка `./views`.
Шаблоны приложений так же находятся в ней, например:
`./views/myApp`
