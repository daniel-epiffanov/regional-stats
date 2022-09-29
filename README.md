Here is initial 1.0.0 version of Regional Statistics app. It is being developed in a monorepo based on Lerna.

Root URL of the project: https://regional-stats.herokuapp.com/

The graphql access point is ```https://regional-stats.herokuapp.com/api/```

## packages

[Backend package](https://github.com/daniel-epiffanov/regional-stats/tree/master/packages/backend)

[Frontend package](https://github.com/daniel-epiffanov/regional-stats/tree/master/packages/react)

## deployment
Learna monorepo has an issue when running ```lerna bootstrap``` on heroku environment. Specifically it doesn't npm install dev dependencies of sub projects. The workaround I've found is moving all dev dependencies into dependencies block.

## about
Региональная статистика - это pet project, который нацелен на визуализацию уже имеющийся официальной статистической информации о российский регионах и федеральных округах. Данные взяты из официального сборника росстата - Регионы России, который с 2017 года публикует данные также в .xlsx формате.

[Россстат](https://rosstat.gov.ru/), 
[Регионы России](https://rosstat.gov.ru/folder/210/document/13204), 
[Архив с данными за 2021 год](https://rosstat.gov.ru/storage/mediabank/soc_pok_2021.rar)

Первой частью проекта был парсинг xlsx данных в подходящий для mongodb формат. В монорепозитории <b>lerna</b> есть отдельный dev проект посвященный этому вопросу. Lerna также позволяет использовать общие типы для frontend и backend, то есть привязать типы данных отправляемых с graphql сервера и типы, получаемые на frontend. Изначально проект подразумевал автоматический web scraping, который будет обновлять mongodb при загрузке новых данных росстатом. Пока что это осталось в планах. 

[lerna](https://lerna.js.org/), 
[graphql](https://graphql.org/), 
[apollo](https://www.apollographql.com/)


Вторая часть - backend. Я давно хотел попробовать graphql, который у всех на слуху, и понять его реальные преимущества перед обычным rest api. Я таже использовал TypeScript, Express, Lodash, Mongoose и Jest. Почти все резолверы имеют автоматические тесты, написание тестов для оставшихся - в планах.


Третья часть - frontend. Для решения задач визуализации я использовал библиотеку devextreme. В частности она позволяет использовать векторную карту, которая задумывалась как ключевой компонент frontend. Проект написан на React, Typescript. Дополнительно использовались: @apollo/client, Axios, Lodash, Jest. Основная часть компонентов покрыта автотестами.

[Devextreme](https://js.devexpress.com/)

## plans
1. Автоматизировать процесс обновения статистических данных.
2. Добавить страницу с описанием api проекта, демонстрации возможности подключения к существующему api.
3. Ограничение доступа к использованию api проекта третий стороной не на странице самого проекта.
4. Создать функционал, направленный на демонстрацию возможностей проекта (подсказки, гайды).
5. Дополнить тесты к graphql резолверам, которые ими не покрыты.
6. Дополнить тесты к react компонентам.
7. Адаптивный дизайн.
