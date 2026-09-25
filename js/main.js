document.addEventListener('DOMContentLoaded', () => {
  // Настройка Intersection Observer для плавной анимации при прокрутке
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
});