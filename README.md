# 🪟 Window Sale App

Приложение для управления заказами окон, клиентами, сотрудниками и процессами (установка, замеры, оплата и т.д.)

# 🪟 Window Sale App — Backend

> Бэкенд для системы управления заказами окон.  
> Клиенты могут делать заказы, менеджеры — управлять ими.  
> Стек: Node.js, Express, PostgreSQL, Sequelize

## 📁 Структура проекта

```
window-sale-app/
│
├── models/              # Sequelize модели (Klient, Tootaja, Roll и т.д.)
├── controllers/         # Контроллеры для маршрутов
├── routes/              # Express-маршруты
├── seeders/             # Сидеры для начальных данных (роли)
├── config/              # Настройки базы данных
├── middleware/          # Авторизация (JWT)
├── .env                 # Переменные окружения (НЕ публиковать)
├── server.js            # Точка входа
├── package.json         # Зависимости
└── README.md            # Этот файл
```

---

## 🔐 Переменные окружения (.env)

Создай файл `.env` в корне проекта и добавь туда:

```env
DB_DATABASE=DB_Zakovits
DB_USER=postgres
DB_PASSWORD=пароль
DB_HOST=localhost
DB_PORT=5432
DB_SCHEMA=windows_sale
DB_DIALECT=postgres

SERVER_PORT=3000
JWT_SECRET=твой_секретный_ключ
```

---

## 🚀 Как запустить проект локально

### 1. Клонируй репозиторий:


```bash
git clone https://github.com/zhakki/windows.git
cd window-sale-app

---
2. Установи зависимости:

npm install

## 🛠️ Команды

```bash
# Запуск сервера
npm run dev


# Применить сидеры (добавить роли)
npx sequelize-cli db:seed:all --env development
```
3. Настрой .env файл:

Создай .env файл в корне и добавь:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=windows_sale
DB_USER=your_user_name
DB_PASSWORD=yourpassword
JWT_SECRET=secretkey

---

4. Запусти PostgreSQL и создай базу:


CREATE DATABASE windows_sale;




# Синхронизация БД
node server.js

## ✅ Готовые пользователи

| Роль     | Email              | Пароль     |
|----------|--------------------|------------|
| Клиент   | ilona@example.com  | salasana123 |
| Менеджер | admin@manager.com  | admin123    |

---

## 📬 Контакты

Автор проекта: [@zhakki](https://github.com/zhakki)  
Если хочешь продолжать разработку — welcome!