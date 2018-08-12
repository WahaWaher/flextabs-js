jQuery FlexTabs Plugin <sup>1.0.0</sup>
-------
_Плагин для создания вкладок(табов)._

* Адаптивный режим (трансформация в аккордион при заданной ширине окна).
* Поддержка скинов (стили оформлений вынесены в отдельный файл)
* Легко настраиваемая анимация переключения вкладок отдельно для десктопного и моб. режимов.

## Пакетные менеджеры:
```sh
# Bower
bower install --save flextabs-js
```

## Подключение:

1. Подключить jQuery, jquery.flextabs.css, jquery.flextabs.theme-default.css, jquery.flextabs.js:
```html
<!-- jquery.flextabs.css - Основные стили -->
<link rel="stylesheet" href="dist/jquery.flextabs.css">

<!-- jquery.flextabs.theme-default.css - Стили темы по умолчанию -->
<link rel="stylesheet" href="dist/jquery.flextabs.theme-default.css">

<!-- jQuery -->
<script src="libs/jquery/dist/jquery.min.js"></script>

<!-- jquery.flextabs.js -->
<script src="dist/jquery.flextabs.js"></script>
```
2. Задать HTML-структуру вкладок:
```html
<div class="example-tabs theme-default">

	<div class="ft-nav">
		<a href="#tab-1" class="ft-tab active">Вкладка #1</a>
		<a href="#tab-2" class="ft-tab">Вкладка #2</a>
		<a href="#tab-3" class="ft-tab">Вкладка #3</a>
	</div>
	
	<div class="ft-contents">
		<div id="tab-1">Содержание вкладки #1</div>
		<div id="tab-2">Содержание вкладки #1</div>
		<div id="tab-3">Содержание вкладки #1</div>
	</div>
	
</div>

<!-- Отобразить контент вкладок на случай откл. JS -->
<noscript>
	<style>.ft-contents>*{display:block!important;}</style>
</noscript>
```
3. Инициализировать плагин на элементе/ах:
```javascript
$('.example-tabs').flexTabs({
	// Параметры...
});
```

## Демо:
https://wahawaher.github.io/flextabs-js

## Параметры:

Опция | Тип | Поум. | Описание
------ | ------ | --------- | ---------
`breakpoint` | number | 768 | Ширина окна браузера в "px", при достижении которой произойдет переход между адаптивным и мобильным режимами. При смене этого параметра необх. скорректировать медиазапрос в файле с темой `jquery.flextabs.theme-default.css`.
`listIcon` |  jQury object | [см.<sup>1</sup>](#option-tip-listIcon) | Иконка справа в раскрыващейся вкладке (моб. режим).
`transformFade` | number | 0 | Эфф. плавной трансформации вкладок при смене режима, мс.

_<div id="option-tip-listIcon">1. Иконка справа в раскрыващейся вкладке (моб. режим):</div>_
```javascript
$('<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M48.293 23.293l-16.293 16.293-16.293-16.293-1.414 1.561 17 17.146h1.414l17-17.146z"/></svg></div>')
```

## Функции обратного вызова:

Callback | Аргументы | Поум. | Описание
------ | ---- | ------- | -----------
`beforeInit` | \[sets:object\] | n/a | Перед началом инициализации.
`afterInit` | \[sets:object\] | n/a | После инициализации.
`beforeChange` | \[sets:object, curItem:object, nextItem:object \] | n/a | Перед переключением вкладки.
`afterChange` | \[sets:object, curItem:object \] | n/a | После переключения вкладки.

```javascript
$('.example-tabs').flexTabs({
	beforeInit:    function(sets) {},
	afterInit:     function(sets) {},
	beforeChange:  function(sets, curItem, nextItem) {},
	afterChange:   function(sets, curItem) {}
});
```
## Публичные методы:
Метод | Описание
----------- | -----------
`init` | Инициализация
`reinit` | Реинициализация
`destroy` | Вернуть состояние до инита
`go` | Переход на вкладку с индексом
`closeAll` | Закрыть все вкладки (преимущ. для моб. режима)

```javascript
// Инициализация
var options = {};
$('.example-tabs').flexTabs('init', options);

// Реинициализация
$('.example-tabs').flexTabs('reinit'); // Реинит с текущими параметрами

var newOptions = {}; // Объект с новыми параметрами
$('.example-tabs').flexTabs('reinit', newOptions); // Реинит с новыми параметрами

// Вернуть состояние элементa/ов до инита
$('.example-tabs').flexTabs('destroy');

// Переход на вкладку с индексом
var tab = 0; // Индекс первой вкладки или ее id(href)
$('.example-tabs').flexTabs('go', tab); // Переход на первую вкладку

// Закрыть все вкладки
$('.example-tabs').flexTabs('closeAll');
```
## Заметки:
### Полная структура HTML
```html
<div class="example-tabs theme-default">
	
	<!-- Контейнер с навигацией -->
	<div class="ft-nav">
		<a href="#tab-1" class="ft-tab active">Вкладка #1</a>
		<a href="#tab-2" class="ft-tab">Вкладка #2</a>
		<a href="#tab-3" class="ft-tab">Вкладка #3</a>
	</div>
	
	<!-- Контейнер с содержимым вкладок -->
	<div class="ft-contents">
		<div id="tab-1">Содержание вкладки #1</div>
		<div id="tab-2">Содержание вкладки #1</div>
		<div id="tab-3">Содержание вкладки #1</div>
	</div>
</div>
```
### Общ. заметки/рекомендации:
- Обяз. соблюдать соответствие якорей у вкладок и их содержаний. Если у вкладки атрибут `href="#tab-1"`, то у ее содержания `id="tab-1"`. Значения атрибутов произвольные.
- Соблюдать один порядок дочерних эл-ов в `ft-nav` и `ft-contents`.
- Класс `"active"` (с помощью которого указывается активная вкладка) можно устан. только на табах, либо же дублировать его и у тега ее содержания.
- Класс `"theme-default"` у общего контейнера устанавливает класс соответствующей темы.
- Классы `"ft-nav"` и `"ft-contents"` - обязательные. По ним идет поиск и привязка.
- При смене параметра `breakpoint` (по ум. `768`) скорректировать медиазапрос `@media only screen and (max-width: 767px) {}` в файле с темой `jquery.flextabs.theme-default.css`.
### Анимация: 
```js
$('.example-tabs').flexTabs({
	beforeChange: function(sets, curItem, nextItem) {
		/* Анимация: исправл. для обратной анимации, моб. */
		if( sets.curMode == 'mobile' ) {
			nextItem.content.css({
				display: 'block'
			});
		}		
	},
	afterChange: function(sets, curItem) {
	
		/* Анимация: Десктоп. Появление вкладок */
		if( sets.curMode == 'desktop' ) {
			curItem.content.hide().fadeIn(250); // Плавное появление
		}
		
		/* Анимация: Мобильные. Появление вкладок */
		if( sets.curMode == 'mobile' && curItem.content.hasClass('active') ) {
			curItem.content.hide().slideDown(350); // Плавное разворачивание
		}
		
		/* Анимация: Мобильные. Исчезновение вкладок */
		if( sets.curMode == 'mobile' && !curItem.content.hasClass('active') ) {
			curItem.content.slideUp(350); // Плавное сворачивание
		}
		
	}
});
```
### Дата-атрибуты:
Парметры в data-атрибуте имеют наивысший приоритет. Они переопределят параметры по умолчанию, а так же пользовательские параметры заданные при инициализации.
```javascript
	// Инициализация группы элементов
	$('.example-tabs').flexTabs();
```
```html
	<!-- Переопределение параметров для отдельных эл-ов через Data-атрибут: -->
	<div class="example-tabs" data-flextabs="{
		transformFade: 450
	}"></div>
	<div class="example-tabs" data-flextabs="{
		transformFade: 300
	}"></div>
```

### Переопределение параметров по умолчанию:
```javascript
	// Переопределение параметров по умолчанию:
	$.fn.flexTabs.defaults = {};
	
	// Например:
	$.fn.flexTabs.defaults = {
		transformFade: 500 // изменит станд. значение пар-ра transformFade
	};
```

## Зависимости:
- [jQuery](http://jquery.com/download/)

## Требования
- jQuery версия 1.9.1 или выше

## История изменений:

## Лицензия (MIT)
Copyright (c) 2018 Sergey Kravchenko

Данная лицензия разрешает лицам, получившим копию данного программного обеспечения и сопутствующей документации (в дальнейшем именуемыми «Программное Обеспечение»), безвозмездно использовать Программное Обеспечение без ограничений, включая неограниченное право на использование, копирование, изменение, слияние, публикацию, распространение, сублицензирование и/или продажу копий Программного Обеспечения, а также лицам, которым предоставляется данное Программное Обеспечение, при соблюдении следующих условий:

Указанное выше уведомление об авторском праве и данные условия должны быть включены во все копии или значимые части данного Программного Обеспечения.

ДАННОЕ ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНО ВЫРАЖЕННЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ ГАРАНТИИ ТОВАРНОЙ ПРИГОДНОСТИ, СООТВЕТСТВИЯ ПО ЕГО КОНКРЕТНОМУ НАЗНАЧЕНИЮ И ОТСУТСТВИЯ НАРУШЕНИЙ, НО НЕ ОГРАНИЧИВАЯСЬ ИМИ. НИ В КАКОМ СЛУЧАЕ АВТОРЫ ИЛИ ПРАВООБЛАДАТЕЛИ НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ПО КАКИМ-ЛИБО ИСКАМ, ЗА УЩЕРБ ИЛИ ПО ИНЫМ ТРЕБОВАНИЯМ, В ТОМ ЧИСЛЕ, ПРИ ДЕЙСТВИИ КОНТРАКТА, ДЕЛИКТЕ ИЛИ ИНОЙ СИТУАЦИИ, ВОЗНИКШИМ ИЗ-ЗА ИСПОЛЬЗОВАНИЯ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ ИЛИ ИНЫХ ДЕЙСТВИЙ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ.