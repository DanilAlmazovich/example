
Требование к запуску :
required - nodeJS (v.8.9+) 

Запуск проекта :
1) Установить пакет node_modules - командой  npm install
2) Запустить проект на локальном сервере - командой npm run dev 


Что и где в каких папках находится:

assets — директория с картинками и стилями. Отсюда они будут импортироваться и включаться в проект.

components — тут будут лежать переиспользуемые компоненты, в терминологии MODX это сниппеты и чанки

layouts — шаблоны страниц

middleware — скрипты, которые запускаются перед рендером страниц, можно сказать, что это плагины в MODX

pages — сами страницы сайта (ресурсы), по которым автоматически строятся маршруты

plugins — js плагины с любым фнукционалом, расширяющие проект. Например, подключение сторонних компонентов из npmjs.org

static — статичные файлы,  будут доступны по прямым ссылкам, например robots.txt

store — хранилище Vuex
