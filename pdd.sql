-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 16 2024 г., 16:18
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `pdd`
--

-- --------------------------------------------------------

--
-- Структура таблицы `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `login` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `fio` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `login`
--

INSERT INTO `login` (`id`, `login`, `password`, `phone`, `email`, `fio`) VALUES
(1, 'superuser', 'Gg0818252015', '+79965114514', 'ffyriy@gamil.com', 'Чирков Кирилл Максимович'),
(2, 'test1', 'Test12345', '89999999999', 'shshshh@shsh.ru', 'Орлов Александр Сергеевич'),
(3, 'test2', 'Test12345', '+79275425533', 'ffyriy1@gmail.com', 'Никитин Илья Григорьевич'),
(9, 'test3', 'Test12345', '+79275425533', 'ffyriy1@gmail.com', 'Бодарев Василий Сергеевич'),
(10, 'test4', 'Test12345', '+79275425533', 'ffyriy1@mail.ru', 'Чирков Кирилл Максимович'),
(11, 'w1kil', 'Alipep14', '89272598354', 'ydacha1223@gmail.com', 'Зозуленко Василий Юрьевич'),
(12, 'tupascum', 'Test12345', '+79275425533', 'ffyriy1@gmail.com', 'Чирков Кирилл Максимович');

-- --------------------------------------------------------

--
-- Структура таблицы `statements_superuser`
--

CREATE TABLE `statements_superuser` (
  `id` int(11) NOT NULL,
  `regNum` varchar(20) NOT NULL,
  `areaNar` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `statements_test1`
--

CREATE TABLE `statements_test1` (
  `id` int(11) NOT NULL,
  `login` varchar(32) NOT NULL,
  `regNum` varchar(20) NOT NULL,
  `areaNar` text NOT NULL,
  `status` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `statements_test1`
--

INSERT INTO `statements_test1` (`id`, `login`, `regNum`, `areaNar`, `status`) VALUES
(13, 'test1', 'в000аа', 'Что такое Lorem Ipsum?\nLorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.', 'Подтверждено'),
(14, 'test1', 'в115ак', 'Козел', 'Отклонено'),
(15, 'test1', 'в115ак', 'ДУРАК', 'Отклонено'),
(16, 'test1', 'п555пп', 'йцукенгш', 'Подтверждено');

-- --------------------------------------------------------

--
-- Структура таблицы `statements_test2`
--

CREATE TABLE `statements_test2` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `regNum` varchar(20) NOT NULL,
  `areaNar` text NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `statements_test3`
--

CREATE TABLE `statements_test3` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `regNum` varchar(20) NOT NULL,
  `areaNar` text NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `statements_test3`
--

INSERT INTO `statements_test3` (`id`, `login`, `regNum`, `areaNar`, `status`) VALUES
(1, 'test3', 'в000аа', 'qwertyu', 'Подтверждено');

-- --------------------------------------------------------

--
-- Структура таблицы `statements_test4`
--

CREATE TABLE `statements_test4` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `regNum` varchar(20) NOT NULL,
  `areaNar` text NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `statements_test4`
--

INSERT INTO `statements_test4` (`id`, `login`, `regNum`, `areaNar`, `status`) VALUES
(1, 'test4', 'в115ак', 'qwertyuiop', 'Отклонено'),
(2, 'test4', 'а444аа', 'dggdggdvvgdvgvgdg ', 'Подтверждено');

-- --------------------------------------------------------

--
-- Структура таблицы `statements_tupascum`
--

CREATE TABLE `statements_tupascum` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `regNum` varchar(20) NOT NULL,
  `areaNar` text NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `statements_tupascum`
--

INSERT INTO `statements_tupascum` (`id`, `login`, `regNum`, `areaNar`, `status`) VALUES
(1, 'tupascum', 'р001рр', 'вапрмоилт', 'Отклонено');

-- --------------------------------------------------------

--
-- Структура таблицы `statements_w1kil`
--

CREATE TABLE `statements_w1kil` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `regNum` varchar(20) NOT NULL,
  `areaNar` text NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `statements_w1kil`
--

INSERT INTO `statements_w1kil` (`id`, `login`, `regNum`, `areaNar`, `status`) VALUES
(1, 'w1kil', 'п011ро', 'Нарушил правила и перехал моего кота', 'Отклонено');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `statements_superuser`
--
ALTER TABLE `statements_superuser`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `statements_test1`
--
ALTER TABLE `statements_test1`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `statements_test2`
--
ALTER TABLE `statements_test2`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `statements_test3`
--
ALTER TABLE `statements_test3`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `statements_test4`
--
ALTER TABLE `statements_test4`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `statements_tupascum`
--
ALTER TABLE `statements_tupascum`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `statements_w1kil`
--
ALTER TABLE `statements_w1kil`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `statements_superuser`
--
ALTER TABLE `statements_superuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `statements_test1`
--
ALTER TABLE `statements_test1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `statements_test2`
--
ALTER TABLE `statements_test2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `statements_test3`
--
ALTER TABLE `statements_test3`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `statements_test4`
--
ALTER TABLE `statements_test4`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `statements_tupascum`
--
ALTER TABLE `statements_tupascum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `statements_w1kil`
--
ALTER TABLE `statements_w1kil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
