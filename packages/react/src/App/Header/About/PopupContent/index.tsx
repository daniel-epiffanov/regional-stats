import { Button } from 'devextreme-react';
import { LOGO_TEXT } from '../../../../config/constants';
import {
  GITHUB_BACKEND_LINK,
  GRAPHQL_LINK,
  LERNA_LINK,
  ROSSTAT_LINK,
  RUSSIAN_REGIONS_LINK
} from '../../../../config/links';

const PopupContent = () => {
  return (
    <div>
      <h3>Общая информация</h3>
      <p>
        <span>&ldquo;{LOGO_TEXT}&ldquo; - это pet project, который нацелен на визуализацию уже имеющийся официальной статистической информации о российский регионах и федеральных округах.</span>
        <span>Данные взяты из официального сборника</span>
        <a href={ROSSTAT_LINK}>росстата</a>
        <a href={RUSSIAN_REGIONS_LINK}>&ldquo;Регионы России&ldquo;</a>
        <span>который с 2017 года публикует данные также в .xlsx формате.</span>
      </p>

      <h3>Техническая иформация</h3>
      <h2>Парсинг данных</h2>
      <p>
        <span>В связи с этим первой частью проекта был парсинг xlsx данных в подходящий для mongodb формат.</span>
        <span>В монорепозитории</span>
        <a href={LERNA_LINK}>lerna</a>
        <span>есть отдельный dev проект посвященный этому вопросу.</span>
        <span>Lerna также позволяет использовать общие типы для frontend и backend, что позволяет привязать типы данных отправляемых с graphql сервера и типы, получаемые на frontend.</span>
        <span>Изначально он был запланирован как автоматический web scraping проект, который будет обновлять mongodb при загрузке новых данных росстатом.</span>
        <span>Пока что это осталось в планах.</span>
      </p>

      <h2>backend</h2>
      <p>
        <span>Я давно хотел попробовать</span>
        <a href={GRAPHQL_LINK}>graphql</a>
        <span>, который давно у всех на слуху, и опробовать его реальные преимущества перед обычным REST API.</span>
        <span>Graphql структура данных описана</span>
        <a href={GITHUB_BACKEND_LINK}>здесь</a>
      </p>

      <p>
        <span>Эта часть проекта также использует TypeScript, Express, Lodash, Mongoose и Jest</span>
        <span>Почти все резолверы имеют автоматические тесты, написание тестов для оставшихся - в планах.</span>
      </p>

      <h2>frontend</h2>
      <p>
        <span>Для решения задачь визуализации было принято решение использовать библиотеку devextreme.</span>
        <span>В частности она позволяет использовать векторную карту, которая задумывалась как ключевой компонент frontend.</span>
        <span>Проект написан на React, Typescript.</span>
        <span>Дополнительно использовались: @apollo/client, Axios, Lodash, Jest</span>
        <span>Основная часть компонентов покрыта автотестами.</span>
      </p>

      <h2>Планы на бдущее</h2>
      <p>1. Автоматизировать процесс обновения статистических данных.</p>
      <p>2. Добавить страницу с описанием api проекта, демонстрации возможности подключения к существующему api.</p>
      <p>3. Ограничение доступа к использованию api проекта третий стороной не на странице самого проекта.</p>
      <p>4. Создать функционал, направленный на демонстрацию возможностей проекта (подсказки, гайды).</p>
      <p>4. Дополнить тесты к graphql резолверам, которые ими не покрыты.</p>
      <p>4. Дополнить тесты к react компонентам.</p>

      <h2>Описание api</h2>
      

      <h2>Дополнительные ссылки</h2>
      <Button
        text="Github проекта"
        icon="fa fa-times"
        stylingMode="text"
      />
      <Button
        text="Github автора"
        icon="fa fa-times"
        stylingMode="text"
      />
      <Button
        text="Telegram автора"
        icon="fa fa-times"
        stylingMode="text"
      />
    </div>

  );
};

export default PopupContent;