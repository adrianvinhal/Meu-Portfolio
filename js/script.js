document.addEventListener('DOMContentLoaded', () => {
    // 1. CONTROLE DO MENU MOBILE
    const btnMenu = document.getElementById('btn-menu');
    const btnFechar = document.getElementById('btn-fechar');
    const menuMobile = document.getElementById('menu-mobile');
    const overlayMenu = document.getElementById('overlay-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function abrirMenu() {
        menuMobile.classList.add('abrir-menu');
        overlayMenu.classList.add('ativo');
        btnMenu.setAttribute('aria-expanded', 'true');
        menuMobile.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Trava rolagem do fundo
    }

    function fecharMenu() {
        menuMobile.classList.remove('abrir-menu');
        overlayMenu.classList.remove('ativo');
        btnMenu.setAttribute('aria-expanded', 'false');
        menuMobile.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    btnMenu.addEventListener('click', abrirMenu);
    btnFechar.addEventListener('click', fecharMenu);
    overlayMenu.addEventListener('click', fecharMenu);
    mobileLinks.forEach(link => link.addEventListener('click', fecharMenu));

    // Fecha o menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuMobile.classList.contains('abrir-menu')) {
            fecharMenu();
        }
    });

    // 2. HEADER DINÂMICO, BOTÃO TOPO E SCROLL SPY (LINK ATIVO)
    const header = document.getElementById('header');
    const btnTopo = document.getElementById('btn-topo');
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.menu-desktop .nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sombra no header
        header.classList.toggle('scrolled', scrollY > 50);

        // Exibe/oculta botão voltar ao topo
        btnTopo.classList.toggle('visivel', scrollY > 400);

        // Destaca link da seção atual no menu
        sections.forEach(sec => {
            const top = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    btnTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. ANIMAÇÃO DE SURGIMENTO AO ROLAR (INTERSECTION OBSERVER)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. INTERAÇÃO NOS CARDS DE HOBBIES PARA DISPOSITIVOS TOUCH
    const hobbyCards = document.querySelectorAll('.img-hob');
    hobbyCards.forEach(card => {
        card.addEventListener('click', () => {
            const jaAtivo = card.classList.contains('ativo');
            hobbyCards.forEach(c => c.classList.remove('ativo'));
            if (!jaAtivo) card.classList.add('ativo');
        });
    });

    // 5. MÁSCARA DE TELEFONE E ENVIO DO FORMULÁRIO
    const inputCelular = document.getElementById('celular');
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    inputCelular.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.slice(0, 11);

        if (valor.length > 6) {
            valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
        } else if (valor.length > 2) {
            valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
        } else if (valor.length > 0) {
            valor = `(${valor}`;
        }
        e.target.value = valor;
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim();

        formFeedback.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;
        contactForm.reset();

        setTimeout(() => {
            formFeedback.textContent = '';
        }, 5000);
    });
});