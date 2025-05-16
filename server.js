const express = require('express');
require('dotenv').config();
const app = express();

// Импорты моделей и связей
const db = require('./models');

// Импорты роутов
const authRoutes = require('./routes/auth.routes');
const klientRoutes = require('./routes/klient.routes');
const tootajaRoutes = require('./routes/tootaja.routes');
const tellimusRoutes = require('./routes/tellimus.routes');
const staatusRoutes = require('./routes/tellimuse_staatused.routes');
const arveRoutes = require('./routes/arve.routes');
const toodeRoutes = require('./routes/toode.routes');
const hinnadRoutes = require('./routes/toode_hinnad.routes');
const toodeteListRoutes = require('./routes/toodete_list.routes');
const brandRoutes = require('./routes/brand.routes');
const teenusedRoutes = require('./routes/teenused.routes');
const teenusedListRoutes = require('./routes/teenused_list.routes');
const teostajadRoutes = require('./routes/teenused_teostajad.routes');
const smsRoutes = require('./routes/sms.routes');


// Middleware
app.use(express.json());

// Подключение роутов
app.use('/api/auth', authRoutes);
app.use('/api/klient', klientRoutes);
app.use('/api/tootaja', tootajaRoutes);
app.use('/api/tellimus', tellimusRoutes);
app.use('/api/staatused', staatusRoutes);
app.use('/api/invoices', arveRoutes);
app.use('/api/tooted', toodeRoutes);
app.use('/api/hinnad', hinnadRoutes);
app.use('/api/toode-list', toodeteListRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/teenused', teenusedRoutes);
app.use('/api/teenused-list', teenusedListRoutes);
app.use('/api/teenused-teostajad', teostajadRoutes);
app.use('/api/sms', smsRoutes);


// Старт сервера после синхронизации с БД
const PORT = process.env.PORT || 3000;

db.sequelize.sync()  // 👈 Никаких force или alter — просто создаёт недостающие таблицы
  .then(() => {
    console.log('✅ Синхронизация БД завершена');
    app.listen(PORT, () => {
      console.log(`🚀 Сервер работает: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Ошибка синхронизации БД:', err.message);
  });
