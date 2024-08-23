//parallax

document.addEventListener('mousemove', parallaxEffect);

function parallaxEffect(event){
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const parallaxBackGround = document.querySelector('.parallax-bg-item');

    const offsetX = (mouseX / window.innerWidth) * 200 - 15;
    const offsetY = (mouseY / window.innerHeight) * 100 - 100;

    parallaxBackGround.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
}

//dynamic type

const phrases = ["выдающимися", "вдохновляющими", "запоминающимися"];
let currentPhraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicTextElement = document.querySelector('.hero__text-animate--dynamic');

function type() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    dynamicTextElement.textContent = currentPhrase.substring(0, charIndex);

    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => {
            isDeleting = true;
            type();
        }, 1500); 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; 
        setTimeout(type, 500); 
    } else {
        setTimeout(type, isDeleting ? 50 : 100); 
    }
}

type();

// scale bg + color

const sections = document.querySelectorAll(['body .header', 'body .about']); 
const hero = document.querySelector('.hero');
const logoPaths = document.querySelectorAll('.logo path');

window.addEventListener('scroll', () => {
    const bodyBefore = document.querySelector('body::before');
    const scrollPosition = window.scrollY;
    
    const maxScale = 8;
    const scale = 1 + (scrollPosition / 100);
    const newLeft = `${300 + scrollPosition/ 3}px`;
    document.body.style.setProperty('--scale', Math.min(scale, maxScale));

    document.body.style.setProperty('--before-left', newLeft);

    if (scrollPosition > 150) {
        sections.forEach(section => {
            if (section !== hero) {
                section.classList.add('scroll-color');
            }
        });
        logoPaths.forEach(path => {
            path.setAttribute('fill', '#E5E5E5');
        });
    } else { 
        sections.forEach(section => {
            if (section !== hero) {
                section.classList.remove('scroll-color');
            }
        });
        logoPaths.forEach(path => {
            path.setAttribute('fill', '#0A4175');
        });
    }
});

// interSectionObserve
function callback(entries, observer){
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(()=>{
                entry.target.classList.add('about__item--show');
            },index * 500);
            observer.unobserve(entry.target);
        }
    });
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(callback, options);

const targetsElements = document.querySelectorAll('.about__item');

targetsElements.forEach((element)=>{
    observer.observe(element);
});