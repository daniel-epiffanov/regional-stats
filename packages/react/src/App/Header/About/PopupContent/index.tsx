import { Button } from 'devextreme-react';
import { LOGO_TEXT } from '../../../../config/constants';
import styles from './PopupContent.module.scss';
import _ from 'lodash';
import LogoSvg from '../../../../assets/logo.svg';
import { FC } from 'react';
import { APOLLO_LINK, AUTHORS_GITHUB_LINK, AUTHORS_TELEGRAM_LINK, DEVEXTREME_LINK, GITHUB_PROJECT_LINK, GRAPHQL_LINK, LERNA_LINK, ROSSTAT_LINK, RUSSIAN_REGIONS_LINK, RUSSIAN_REGIONS_XLSX_RAR_LINK } from '../../../../config/links';

type Props = Readonly<{
  closeAbout: () => void
}>

const PopupContent: FC<Props> = ({closeAbout}) => {
  return (
    <div className={styles['root']}>

      <div className={styles['close-btn']}>
        <Button
          icon="close"
          onClick={closeAbout}
          width="3rem"
          height="3rem"
        />
      </div>
        
      <div className={styles['title-container']}>
        <div>
          <div className={styles['logo-container']}>
            <img
              className={styles['img']}
              src={LogoSvg}
              alt="logo"
            />
          </div>
        </div>
        <h2>О проекте</h2>
      </div>

      <div className={styles['links-container']}>
        <a target="_blank" href={GITHUB_PROJECT_LINK} rel="noreferrer">
          <Button
            text="Github проекта"
            icon="fab fa-github"
            stylingMode="contained"
          />
        </a>
        <a target="_blank" href={AUTHORS_GITHUB_LINK} rel="noreferrer">
          <Button
            text="Github автора"
            icon="fab fa-github"
            stylingMode="contained"
          />
        </a>
        <a target="_blank" href={AUTHORS_TELEGRAM_LINK} rel="noreferrer">
          <Button
            text="Telegram автора"
            icon="fab fa-telegram"
            stylingMode="contained"
          />
        </a>
      </div>

      <p>
        <span><b>{_.capitalize(LOGO_TEXT)}</b> - это pet project, который нацелен на визуализацию уже имеющийся официальной статистической информации о российский регионах и федеральных округах. </span>
        <span>Данные взяты из официального сборника росстата - <b>Регионы России</b>,</span>
        <span> который с 2017 года публикует данные также в .xlsx формате.</span>
      </p>

      <div className={styles['links-container']}>
        <a target="_blank" href={ROSSTAT_LINK} rel="noreferrer">
          <Button
            text="Россстат"
            icon="link"
            stylingMode="text"
          />
        </a>
        <a target="_blank" href={RUSSIAN_REGIONS_LINK} rel="noreferrer">
          <Button
            text="Регионы России"
            icon="link"
            stylingMode="text"
          />
        </a>
        <a target="_blank" href={RUSSIAN_REGIONS_XLSX_RAR_LINK} rel="noreferrer">
          <Button
            text="Архив с данными за 2021 год"
            icon="link"
            stylingMode="text"
          />
        </a>
      </div>

      <p>
        <span>Первой частью проекта был парсинг xlsx данных в подходящий для mongodb формат. </span>
        <span>В монорепозитории <b>lerna</b> </span>
        <span>есть отдельный dev проект посвященный этому вопросу. </span>
        <span>Lerna также позволяет использовать общие типы для frontend и backend, то есть привязать типы данных отправляемых с graphql сервера и типы, получаемые на frontend. </span>
        <span>Изначально проект подразумевал автоматический web scraping, который будет обновлять mongodb при загрузке новых данных росстатом. </span>
        <span>Пока что это осталось в планах. </span>
      </p>

      <div className={styles['links-container']}>
        <a target="_blank" href={LERNA_LINK} rel="noreferrer">
          <Button
            text="lerna"
            icon="link"
            stylingMode="text"
          />
        </a>
        <a target="_blank" href={GRAPHQL_LINK} rel="noreferrer">
          <Button
            text="graphql"
            icon="link"
            stylingMode="text"
          />
        </a>
        <a target="_blank" href={APOLLO_LINK} rel="noreferrer">
          <Button
            text="apollo"
            icon="link"
            stylingMode="text"
          />
        </a>
      </div>

      <p>
        <span>Вторая часть - backend. Я давно хотел попробовать graphql, который у всех на слуху, и понять его реальные преимущества перед обычным rest api. </span>
        <span>Я таже использовал TypeScript, Express, Lodash, Mongoose и Jest. </span>
        <span>Почти все резолверы имеют автоматические тесты, написание тестов для оставшихся - в планах.</span>
      </p>

      <p>
        <span>Третья часть - frontend. </span>
        <span>Для решения задач визуализации я использовал библиотеку devextreme. </span>
        <span>В частности она позволяет использовать векторную карту, которая задумывалась как ключевой компонент frontend. </span>
        <span>Проект написан на React, Typescript. </span>
        <span>Дополнительно использовались: @apollo/client, Axios, Lodash, Jest. </span>
        <span>Основная часть компонентов покрыта автотестами. </span>
      </p>

      <a target="_blank" href={DEVEXTREME_LINK} rel="noreferrer">
        <Button
          text="Devextreme"
          icon="link"
          stylingMode="text"
        />
      </a>

      <p><b>Планы на будущее</b></p>
      <ol>
        <li>Автоматизировать процесс обновения статистических данных.</li>
        <li>Добавить страницу с описанием api проекта, демонстрации возможности подключения к существующему api.</li>
        <li>Ограничение доступа к использованию api проекта третий стороной не на странице самого проекта.</li>
        <li>Создать функционал, направленный на демонстрацию возможностей проекта (подсказки, гайды).</li>
        <li>Дополнить тесты к graphql резолверам, которые ими не покрыты.</li>
        <li>Дополнить тесты к react компонентам.</li>
        <li>Адаптивный дизайн.</li>
      </ol>
    </div>

  );
};

export default PopupContent;