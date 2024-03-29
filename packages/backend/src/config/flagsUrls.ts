import { HOST } from "./links";

const EXTESION = 'png';

type RegionFlags = Readonly<{
    [key: string]: string,
}>

const regionFlags: RegionFlags = {
  'Алтайский край': 'altai',
  'Амурская область': 'amur',
  'Архангельская область': 'arkhangelsk',
  'Архангельская область без автономного округа': 'arkhangelsk',
  'Астраханская область': 'astrakhan',
  'Белгородская область': 'belgorod',
  'Брянская область': 'bryansk',
  'Владимирская область': 'vladimir',
  'Волгоградская область': 'volgograd',
  'Вологодская область': 'vologda',
  'Воронежская область': 'voronezh',
  'Еврейская автономная область': 'jewish-autonomous-oblast',
  'Забайкальский край': 'zabaikalsky-krai',
  'Ивановская область': 'ivanovo',
  'Иркутская область': 'irkutsk',
  'Кабардино-Балкарская Республика': 'kabardino-balkaria',
  'Калининградская область': 'kaliningrad',
  'Калужская область': 'kaluga',
  'Камчатский край': 'kamchatka',
  'Карачаево-Черкесская Республика': 'karachay-cherkessia',
  'Кемеровская область': 'kemerovo',
  'Кировская область': 'kirov',
  'Костромская область': 'kostroma',
  'Краснодарский край': 'krasnodar',
  'Красноярский край': 'krasnoyarsk',
  'Курганская область': 'kurgan',
  'Курская область': 'kursk',
  'Ленинградская область': 'leningrad',
  'Липецкая область': 'lipetsk',
  'Магаданская область': 'magadan',
  'Московская область': 'moscow-oblast',
  'Мурманская область': 'murmansk',
  'Ненецкий автономный округ': 'nenetsk',
  'Нижегородская область': 'nizny-novgorod',
  'Новгородская область': 'novgorod',
  'Новосибирская область': 'novosibirsk',
  'Омская область': 'omsk',
  'Оренбургская область': 'orenburg',
  'Орловская область': 'oryol',
  'Пензенская область': 'penza',
  'Пермский край': 'perm',
  'Приморский край': 'primorsky-krai',
  'Псковская область': 'pskov',
  'Республика Адыгея': 'adygea',
  'Республика Алтай': 'altai',
  'Республика Башкортостан': 'bashkortostan',
  'Республика Бурятия': 'buryatia',
  'Республика Дагестан': 'dagestan',
  'Республика Ингушетия': 'ingushetia',
  'Республика Калмыкия': 'kalmykia',
  'Республика Карелия': 'karelia',
  'Республика Коми': 'komi',
  'Республика Марий Эл': 'mari',
  'Республика Мордовия': 'mordovia',
  'Республика Саха (Якутия)': 'sakha',
  'Республика Северная Осетия - Алания': 'north-osetia',
  'Республика Татарстан': 'tatarstan',
  'Республика Тыва': 'tuva',
  'Республика Хакасия': 'khakassia',
  'Ростовская область': 'rostov',
  'Рязанская область': 'ryazan',
  'Самарская область': 'samara',
  'Саратовская область': 'saratov',
  'Сахалинская область': 'sakhalin',
  'Свердловская область': 'sverdlovsk',
  'Смоленская область': 'smolensk',
  'Ставропольский край': 'stavoropl',
  'Тамбовская область': 'tambov',
  'Тверская область': 'tver',
  'Томская область': 'tomsk',
  'Тульская область': 'tula',
  'Тюменская область': 'tyumen',
  'Тюменская область без автономных округов': 'tyumen',
  'Удмуртская Республика': 'udmurtia',
  'Ульяновская область': 'ulyanovsk',
  'Хабаровский край': 'khabarovsk',
  'Ханты-Мансийский автономный округ - Югра': 'yugra',
  'Челябинская область': 'chelyabinsk',
  'Чеченская Республика': 'chechen',
  'Чувашская Республика': 'chuvashia',
  'г. Москва': 'moscow',
  'г. Санкт-Петербург': 'spb',
  'Ярославская область': 'yaroslavl',
  'Чукотский автономный округ': 'chukotka',
  'Ямало-Ненецкий автономный округ': 'yamal-nenets',

  'Приволжский федеральный округ': 'nizny-novgorod',
  'Северо-Западный федеральный округ': 'spb',
  'Северо-Кавказский федеральный округ': 'stavoropl',
  'Сибирский федеральный округ': 'novosibirsk',
  'Уральский федеральный округ': 'sverdlovsk',
  'Центральный федеральный округ': 'moscow',
  'Южный федеральный округ': 'rostov',
  'Дальневосточный федеральный округ': 'primorsky-krai',
};

export const getFlagUrl = (regionName: string) => {
  return `${HOST}/static/flags/${regionFlags[regionName]}.${EXTESION}`;
};
