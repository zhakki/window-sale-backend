const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Klient, Tootaja, Roll } = require('../models');

// 1. Регистрация клиента
exports.registerKlient = async (req, res) => {
  try {
    const { nimi, perekonnanimi, email, telefon, aadress, parool } = req.body;

    const existing = await Klient.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(parool, 10);

    const klient = await Klient.create({
      nimi,
      perekonnanimi,
      email,
      telefon,
      aadress,
      parool: hashedPassword,
      reg_kuupaev: new Date(),
      roll_id: 5 // Роль "Client"
    });

    res.status(201).json({ message: 'Client registered', klient_id: klient.klient_id });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// 2. Регистрация сотрудника (только админ — Manager)
exports.registerTootaja = async (req, res) => {
  try {
    const requestingUser = req.user; // из verifyToken middleware

    if (!requestingUser || requestingUser.roll !== 'Manager') {
      return res.status(403).json({ message: 'Only Manager can register workers' });
    }

    const { nimi, perekonnanimi, email, telefon, parool, roll_id } = req.body;

    const existing = await Tootaja.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(parool, 10);


    const tootaja = await Tootaja.create({
      nimi,
      perekonnanimi,
      email,
      telefon,
      parool: hashedPassword,
      roll_id
    });

    res.status(201).json({ message: 'Worker registered', tootaja_id: tootaja.tootaja_id });
  } catch (err) {
    res.status(500).json({ message: 'Worker registration failed', error: err.message });
  }
};

// 3. Универсальный логин (для клиента и работника)
exports.login = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    let user, idField;

    if (userType === 'klient') {
      user = await Klient.findOne({
        where: { email },
        include: { model: Roll, foreignKey: 'roll_id' }
      });
      idField = 'klient_id';
    } else if (userType === 'tootaja') {
      user = await Tootaja.findOne({
        where: { email },
        include: { model: Roll, foreignKey: 'roll_id' }
      });
      idField = 'tootaja_id';
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.parool);
    if (!valid) return res.status(401).json({ message: 'Wrong password' });
    
    

    const token = jwt.sign(
      {
        id: user[idField],
        userType,
        roll: user.Roll.roll_nimi
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user[idField],
        email: user.email,
        roll: user.Roll.roll_nimi,
        userType
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.devRegisterManager = async (req, res) => {
  try {
    const { nimi, perekonnanimi, email, telefon, parool } = req.body;

    const existing = await Tootaja.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(parool, 10);

    const manager = await Tootaja.create({
      nimi,
      perekonnanimi,
      email,
      telefon,
      parool: hashedPassword,
      roll_id: 1 // ID роли Manager
    });

    res.status(201).json({ message: 'Manager registered (DEV)', tootaja_id: manager.tootaja_id });
  } catch (err) {
    res.status(500).json({ message: 'Manager registration failed', error: err.message });
  }
};
