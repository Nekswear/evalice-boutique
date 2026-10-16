document.addEventListener('DOMContentLoaded', () => {
  // 1. Настройка Intersection Observer для плавной анимации при скролле
  const observerOptions = {
    threshold: 0.15 // Анимация сработает, когда блок виден на 15%
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Отключаем слежение после появления
      }
    });
  }, observerOptions);

  // Находим все элементы с классом .fade-in и подключаем к наблюдателю
  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });

  // 2. Обработка формы записи и модального окна с мессенджерами
  const bookingForm = document.getElementById('bookingForm');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');

  const btnWhatsApp = document.getElementById('sendWhatsApp');
  const btnTelegram = document.getElementById('sendTelegram');
  const btnViber = document.getElementById('sendViber');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Предотвращаем стандартную отправку

      // Считываем введенные данные
      const formData = new FormData(bookingForm);
      const name = formData.get('name');
      const phone = formData.get('phone');

      // Формируем текст сообщения для мамы / бутика
      const message = `Здравствуйте! Evalice Boutique, я хочу записаться на примерку.\nИмя: ${name}\nТелефон: ${phone}`;
      const encodedMessage = encodeURIComponent(message);

      // Контакты бутика
      const phoneNum = '37377728910'; // Номер для WhatsApp и Viber
      const tgUsername = 'evalice_boutique'; // Укажите актуальный юзернейм бутика в Telegram без @ (или ваш ник)

      // Генерируем ссылки для каждого мессенджера
      if (btnWhatsApp) {
        btnWhatsApp.href = `https://wa.me/${phoneNum}?text=${encodedMessage}`;
      }
      if (btnTelegram) {
        // Прямая ссылка на диалог в Telegram по номеру телефона с предварительно заготовленным текстом
        btnTelegram.href = `https://t.me/+37377728910?text=${encodedMessage}`;
      }
     if (btnViber) {
  // Для Viber делаем клик интерактивным: открываем чат и копируем текст в буфер обмена
  btnViber.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Копируем текст сообщения в буфер обмена
    navigator.clipboard.writeText(message).then(() => {
      alert('Текст заявки скопирован! Вставьте его (Ctrl+V / долгий тап) в открывшемся чате Viber.');
    }).catch(err => {
      console.log('Ошибка копирования', err);
    });

    // Открываем чат Viber
    window.location.href = `viber://chat?number=%2B${phoneNum}`;
  });
  }

      // Открываем модальное окно с выбором
      if (modal) {
        modal.classList.add('is-open');
      }
    });
  }

  // Закрытие модального окна
  if (modalClose && modal) {
    modalClose.addEventListener('click', function() {
      modal.classList.remove('is-open');
      if (bookingForm) bookingForm.reset();
    });
  }
});