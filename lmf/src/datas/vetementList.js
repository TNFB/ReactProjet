import tshirt from '../assets/tshirt.jpg'
import pull from '../assets/pull.jpg'
import pantalon from '../assets/pantalon.jpg'
import short from '../assets/short.jpg'
import jupe from '../assets/jupe.jpg'
import chemisier from '../assets/chemisier.jpg'
import echarpe from '../assets/echarpe.jpg'
import robe from '../assets/robe.jpg'
export const vetementList = [
    {
        name: 't-shirt',
        category: 'haut',
        id: '1ed',
        isSpecialOffer: false,
        taille : 'XS',
        confort : 3,
        cover:tshirt,
        price:8        
    },
    {
        name: 'pull',
        category: 'haut',
        id: '2ab',
        isSpecialOffer: false,
        taille : 'S',
        confort : 4,
        cover:pull,
        price:10       
    },
{
        name: 'pantalon',
        category: 'bas',
        id: '3sd',
        isSpecialOffer: true,
        taille : 'M',
        confort : 6,
        cover:pantalon,
        price:12 
    },
    {
        name: 'short',
        category: 'bas',
        id: '4kk',
        isSpecialOffer: false,
        taille : 'L',
        confort : 6,
        cover:short,
        price:14 
    },
    {
        name: 'jupe',
        category: 'bas',
        id: '5pl',
        isSpecialOffer: false,
        taille : 'XL',
        confort : 6,
        cover:jupe,
        price:16 
    },   
{
        name: 'chemisier',
        category: 'haut',
        id: '6uo',
        isSpecialOffer: false,
        taille : 'XS',
        confort : 6,
        cover:chemisier,
        price:18 
    },
    {
        name: 'écharpe',
        category: 'haut',
        id: '7ie',
        isSpecialOffer: true,
        taille : 'S',
        confort : 6,
        cover:echarpe,
        price:20 
    },
    {
        name: 'robe',
        category: 'ensemble',
        id: '8fp',
        isSpecialOffer: true,
        taille : 'M',
        confort : 6,
        cover:robe,
        price:22 
    }
]
            