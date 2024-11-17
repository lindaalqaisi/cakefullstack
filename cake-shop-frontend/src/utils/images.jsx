import hero from '../assets/hero.webp';
import hero2 from '../assets/hero2.webp';
import wedding from '../assets/wedding.webp';
import cupcake from '../assets/cupcake.webp';
import birthday from '../assets/birthday.webp';
import delight from '../assets/delight.webp';
import reactLogo from '../assets/react.svg';

export const getRandomHeroImage = () => {
    const heroes = [hero, hero2];
    return heroes[Math.floor(Math.random() * heroes.length)];
};

export const getCategoryImage = (category) => {
    switch (category?.toLowerCase()) {
        case 'wedding':
            return wedding;
        case 'cupcakes':
            return cupcake;
        case 'birthday':
            return birthday;
        case 'custom':
            return delight;
        default:
            return delight;
    }
};