// Kad viss HTML ir ielādēts un gatavs
document.addEventListener("DOMContentLoaded", () => {
    // Atlasa visus navigācijas linkus ar klasi .nav-link
    const navLinks = document.querySelectorAll(".nav-link");

    // Funkcija, kas aktivizē izvēlēto linku
    function activateLink(link) {
        // Noņem 'active' klasi no visiem linkiem
        navLinks.forEach(nav => nav.classList.remove("active"));
        // Pievieno 'active' izvēlētajam linkam
        link.classList.add("active");
        // Simulē klikšķi uz linka (pāriet uz citu sadaļu)
        link.click();
    }

    // Klikšķis uz navigācijas linka - aktivizē to
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            activateLink(this);
        });
    });

    // shortkeys navigācijai starp lapas sadaļām
    document.addEventListener("keydown", (e) => {
        // Ja kursors ir INPUT vai TEXTAREA, taustiņi netiek apstrādāti
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

        const key = e.key;

        // Pārbauda, vai nospiests skaitlis atbilst esošajiem linkiem
        if (key >= "1" && key <= navLinks.length.toString()) {
            const index = parseInt(key) - 1;
            activateLink(navLinks[index]);
        }
    });



    // --- E-pasta kopēšanas funkcionalitāte ---
    const button = document.getElementById("email-btn");
    if (button) {
        button.addEventListener("click", () => {
            const email = "epasts@email.com"; // Šeit ieraksti savu e-pastu
            const originalHTML = '<i class="fa-regular fa-copy icon-space"></i>Email';
            const copiedHTML = '<i class="fa-solid fa-check icon-space"></i>Copied!';

            // Kopē e-pastu 
            navigator.clipboard.writeText(email).then(() => {
                // Maina pogas tekstu uz "Copied!"
                button.innerHTML = copiedHTML;

                // Pēc 2 sekundēm atgriež sākotnējo pogas tekstu
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error("Neizdevās kopēt e-pastu:", err);
            });
        });
    }




    // --- Peldošo punktu animācija ---
    document.querySelectorAll('.floating-dots').forEach(container => {
        const numDots = 20; 

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot'); 

            //pozicija
            dot.style.top = Math.random() * 100 + "%";
            dot.style.left = Math.random() * 100 + "%";

            //trajektorija
            const angle = Math.random() * 2 * Math.PI;
            const distance = 50 + Math.random() * 100;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            const duration = 10 + Math.random() * 20;

            
            const moveName = `move-${i}-${Date.now()}`;
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes ${moveName} {
                    0% { transform: translate(0px, 0px); }
                    100% { transform: translate(${dx}px, ${dy}px); }
                }
            `;
            document.head.appendChild(style); 

            
            const blinkDuration = (2 + Math.random() * 3).toFixed(2);
            dot.style.animation = `blink ${blinkDuration}s ease-in-out infinite, ${moveName} ${duration}s linear infinite`;

            container.appendChild(dot); // Pievieno punktu konteinerī
        }
    });
});





// --- Navigācijas uzvedība atkarībā no ritināšanas un loga izmēra ---

// Atlasa navigācijas joslu
const nav = document.querySelector('nav');
// Definē, ka "mazs ekrāns" ir < 1200px
const mediaQuery = window.matchMedia('(max-width: 1200px)');

// Funkcija, kas pārbauda, vai navigācijai jāpievieno klase 'scrolled'
function handleScroll() {
    if (!mediaQuery.matches) {
        // Lielā ekrānā klase netiek lietota
        nav.classList.remove('scrolled');
        return;
    }

    // Ja lapu ritina un ekrāns ir mazs – pievieno klasi 'scrolled'
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Uzstāda notikumu klausītāju, kas reaģē uz ritināšanu un ekrāna izmēra maiņu
window.addEventListener('scroll', handleScroll);
mediaQuery.addEventListener('change', handleScroll);
