const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pdd",
});

app.post("/signup", (req, res) => {
  const { login, password, phone, email, fio } = req.body;

  // Проверка на уникальность логина в базе данных
  db.query("SELECT * FROM login WHERE login = ?", [login], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (data.length > 0) {
      // Логин уже занят, возвращаем сообщение об ошибке
      return res.status(409).json({ error: "Login already taken" });
    } else {
      // Логин уникален, можно сохранить его в базе данных
      const sql =
        "INSERT INTO `login`(`login`, `password`, `phone`, `email`, `fio`) VALUES (?, ?, ?, ?, ?)";
      const values = [login, password, phone, email, fio];
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal server error" });
        }
        const userId = result.insertId;
        // Создаем таблицу заявлений для нового пользователя
        const createTableSql = `CREATE TABLE statements_${login} (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    login VARCHAR(20) NOT NULL,
                    regNum VARCHAR(20) NOT NULL,
                    areaNar TEXT NOT NULL,
                    status VARCHAR(20) NOT NULL
                )`;
        db.query(createTableSql, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
          }
          console.log(`Statements table created for user ${userId}`);
          return res.json({ userId });
        });
      });
    }
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE login=? AND password=?";
  db.query(sql, [req.body.login, req.body.password], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
    if (data.length > 0) {
      return res.json("Seccess");
    } else {
      return res.json("failed");
    }
  });
});

app.post("/newStatement", (req, res) => {
  const { user, regNum, areaNar, status } = req.body;
  console.log(user);

  try {
    const tableName = `statements_${user}`;
    const insertQuery = `INSERT INTO ${tableName} (login,regNum, areaNar,status) VALUES (?,?, ?, ?)`;
    const insertValues = [user, regNum, areaNar, status];
    console.log(insertQuery);
    db.query(insertQuery, insertValues, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Внутренняя ошибка сервера" });
      }
      console.log(`Заявление добавлено для пользователя ${user}`);
      return res.json({ success: true });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.post("/yourStatement", (req, res) => {
  const user = req.body.user;

  db.query(`SELECT * FROM statements_${user}`, (err, data) => {
    if (err) {
      console.error("Ошибка при получении заявлений:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(data);
  });
});

// Функция для получения всех пользователей
const getUsers = async () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM login";
    db.query(sql, (err, data) => {
      if (err) {
        console.error("Ошибка при получении списка пользователей:", err);
        reject(err);
      }
      resolve(data);
    });
  });
};
app.put("/admin/statements/:id", async (req, res) => {
  try {
    const statementId = req.params.id;
    const { status, user } = req.body;

    // Получаем информацию о пользователе из getUsers
    const users = await getUsers();
    const userInfo = users.find((userData) => userData.login === user);

    // Если пользователь найден, обновляем статус заявления в его таблице
    if (userInfo) {
      const tableName = `statements_${userInfo.login}`;
      const sql = `UPDATE ${tableName} SET status = ? WHERE id = ?`;
      db.query(sql, [status, statementId], (err, result) => {
        if (err) {
          console.error("Ошибка при обновлении статуса заявления:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Статус заявления успешно обновлен");
        res.json({ success: true });
      });
    } else {
      // Если пользователь не найден, возвращаем ошибку
      console.error("Пользователь не найден");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Ошибка при обновлении статуса заявления:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/admin", async (req, res) => {
  const user = req.query.user;
  // Получаем пользователя из query параметров
  const allStatements = []; // Создаем пустой массив для хранения всех заявлений
  // Функция для получения заявлений пользователя
  const fetchUserStatements = async (user) => {
    return new Promise((resolve, reject) => {
      const tableName = `statements_${user}`;
      const sql = `SELECT * FROM ${tableName}`;
      db.query(sql, (err, data) => {
        if (err) {
          console.error(
            `Ошибка при получении заявлений пользователя ${user}:`,
            err
          );
          reject(err);
        }
        resolve(data);
      });
    });
  };

  try {
    // Получаем список всех пользователей из таблицы "login"
    const users = await new Promise((resolve, reject) => {
      const sql = "SELECT * FROM login";
      db.query(sql, (err, data) => {
        if (err) {
          console.error("Ошибка при получении списка пользователей:", err);
          reject(err);
        }
        resolve(data);
      });
    });

    // Для каждого пользователя получаем его заявления и добавляем их в общий массив
    // Для каждого пользователя получаем его заявления и добавляем их в общий массив
    for (const user of users) {
      const userStatements = await fetchUserStatements(user.login); // Получаем заявления пользователя
      const statementsWithFio = userStatements.map((statement) => ({
        ...statement,
        fio: user.fio, // Добавляем ФИО пользователя к каждой заявке
      }));
      allStatements.push(...statementsWithFio); // Добавляем заявки в общий массив
    }

    // Возвращаем все заявления в формате JSON
    res.json(allStatements);
  } catch (error) {
    console.error("Ошибка при получении заявлений:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8081, () => {
  console.log("Сервер запущен на порту 8081");
});
