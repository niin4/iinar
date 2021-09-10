"use strict";

(function () {
  const introShown = localStorage.getItem('introShown');

  if (!introShown) {
    const introScreen = document.querySelector(".intro-screen");
    introScreen.classList.remove('hidden');
    localStorage.setItem('introShown', 'true')
    setTimeout(() => {
      if (introScreen) {
         introScreen.classList.add("intro-screen-hidden");
        setTimeout(() => {
          introScreen.remove();
        }, 2000);
      }
    }, 7000);
  }

  document.querySelector(".open-menu").addEventListener("click", (e) => {
    if (e.target) {
      const targetEl = document.querySelector(e.target.dataset.target);
      if (targetEl) {
        targetEl.classList.remove("hidden");
      }
    }
  });

  document.querySelector(".close-menu").addEventListener("click", (e) => {
    if (e.target) {
      const targetEl = document.querySelector(e.target.dataset.target);
      if (targetEl) {
        targetEl.classList.add("hidden");
      }
    }
  });

  document.querySelectorAll(".open-section").forEach((b) =>
    b.addEventListener("click", (e) => {
      if (e.target) {
        const targetEl = document.querySelector(
          e.target.closest(".open-section").dataset.target
        );
        document.querySelectorAll(".swipe-column").forEach((col) => {
          col.classList.add("swipe-column-hidden");
        });
        document.querySelector('.transform-header').classList.add('hidden');
        if (targetEl) {
          targetEl.classList.remove("section-expanded-hidden");
          document.querySelector("html").style.overflow = "auto";
          let spanCounter = 0;
          const spans = targetEl
            .querySelector(".animate-header")
            .querySelectorAll("span");
          setInterval(function () {
            if (spanCounter < spans.length) {
              spans[spanCounter].classList.add("active");
              spanCounter++;
            }
          }, 100);
        }
      }
    })
  );

  document.querySelectorAll(".close-section").forEach((b) =>
    b.addEventListener("click", (e) => {
      if (e.target) {
        document.querySelector('.transform-header').classList.remove('hidden');
        const targetEl = e.target.closest(".section-expanded");
        if (targetEl) {
            targetEl.classList.add("section-expanded-hidden");
            targetEl
            .querySelector(".animate-header")
            .querySelectorAll("span")
            .forEach((s) => s.classList.remove("active"));
            document.querySelectorAll(".swipe-column").forEach((col) => {
                col.classList.remove("swipe-column-hidden");
            });
            document.querySelector("html").style.overflow = "hidden";
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
      }
    })
  );

  document.querySelectorAll(".animate-header").forEach((header) => {
    const splitText = header.textContent.split("");
    header.innerHTML = `${splitText
      .map((letter) => `<span>${letter}</span>`)
      .join("")}`;
  });

  document.querySelectorAll(".transform-header").forEach((header) => {
    const spans = header.querySelectorAll("span");
    const keepSpans = [];
    const dropSpans = [];
    const removeSpans = [];
    const revealSpans = [];

    spans.forEach((s) => {
      if (s.classList.contains("drop")) {
        dropSpans.push(s);
      } if (s.classList.contains("remove")) {
        removeSpans.push(s);
      } if (s.classList.contains("reveal")) {
        revealSpans.push(s);
      } if (s.classList.length === 0) {
        keepSpans.push(s);
      }
    });

    dropSpans.forEach((span, i) => {
      setTimeout(() => {
        span.classList.add("drop-active");
      }, i * Math.random() * 400 + 500);
    });

   
    setTimeout(() => {
      dropSpans.forEach((span, i) => {
        if (i > 0) {
          span.remove();
        }
      });
      removeSpans.forEach((span, i) => {
        span.classList.add("remove-active");
        setTimeout(() => {
          span.remove();
        },1000)
      });
      revealSpans.forEach((span, i) => {
        setTimeout(() => {
          span.classList.add("reveal-active");
        }, i * 400 + 500);
      });
    }, 3500);

    setTimeout(() => {
      spans.forEach(s => s.classList.add('fade'))
    }, 5500)
  });
})();
