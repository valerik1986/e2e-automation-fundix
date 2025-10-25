# 🧪 Fundix Landing Page Tests (Cypress)

Автоматизированные e2e-тесты для лендинга [Fundix.pro](https://fundix.pro),  
выполненные с использованием **Cypress** и паттерна **Page Object Model (POM)**.

---

## 🚀 Используемые технологии
- **Cypress 15.5.0**
- **JavaScript (ES6)**
- **Page Object Model**
- **cypress-xpath**
- **Mochawesome (HTML-отчёты)**

---

## ✅ Основные проверки
1. Успешная загрузка страницы и отображение заголовка.  
2. Наличие логотипа и пунктов меню: *How it works, Why us, Pro traders, FAQ*.  
3. Проверка кнопки **Get funded** (видимость и кликабельность).  
4. Проверка ссылки на приложение в **Google Play**  
   (`com.amega.fundix`) и валидность страницы **Fundix.pro**.  
5. Переход на страницу **FAQ**.

---

## ⚙️ Запуск проекта
```bash
npm install
npx cypress open     # запуск в UI
npx cypress run      # headless режим

🧾 Отчёт
npm run test         # запуск с mochawesome
npm run report       # генерация HTML отчёта

👨‍💻 Автор
Valery Maksimovich
📧 valerymaks1986@gmail.com
💬 Telegram: @valerik1986
QA Automation Engineer