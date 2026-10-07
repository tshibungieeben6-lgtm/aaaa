document.addEventListener('DOMContentLoaded', () => {
  // ⚠️ Remplacez avec votre vrai lien Formspree (ex: https://formspree.io/f/xbjnqweo)
  const FORMSPREE_URL = "https://formspree.io/f/VOTRE_CODE_FORMSPREE";

  const yesBtn = document.getElementById('yesBtn');
  const againBtn = document.getElementById('againBtn');
  const question = document.getElementById('question');
  const subtext = document.getElementById('subtext');

  // Fonction qui envoie l'e-mail via Formspree
  function sendNotification(choix) {
    fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reponse: choix,
        date: new Date().toLocaleString("fr-FR")
      })
    }).catch(err => console.log("Erreur lors de l'envoi :", err));
  }

  // Option 1 : "Oui, je te pardonne"
  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      // 1. Masquer les éléments de l'interface
      const heartIcon = document.querySelector('.heart-icon');
      if (heartIcon) heartIcon.style.display = 'none';

      const buttonsContainer = document.querySelector('.buttons');
      if (buttonsContainer) buttonsContainer.style.display = 'none';

      // 2. Modifier les textes
      if (question) question.textContent = "Merci du fond du cœur ! ❤️🥰";
      if (subtext) subtext.textContent = "Ton message a bien été envoyé ✨";

      // 3. Déclencher les confettis
      try {
        if (typeof confetti === 'function') {
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        }
      } catch (e) {
        console.log("Erreur confetti :", e);
      }

      // 4. Envoyer la notification par e-mail
      sendNotification("Oui, je te pardonne ! ❤️");
    });
  }

  // Option 2 : "Je réfléchis"
  if (againBtn) {
    againBtn.addEventListener('click', () => {
      // 1. Masquer les boutons
      const buttonsContainer = document.querySelector('.buttons');
      if (buttonsContainer) buttonsContainer.style.display = 'none';

      // 2. Modifier les textes
      if (question) question.textContent = "D'accord, prends tout ton temps... 💭";
      if (subtext) subtext.textContent = "Merci d'avoir répondu ✨";

      // 3. Envoyer la notification par e-mail
      sendNotification("J'ai besoin de temps pour réfléchir... 🤔");
    });
  }
});