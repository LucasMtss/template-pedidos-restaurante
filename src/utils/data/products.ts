

const MENU = [
  {
    title: "Cardápio do dia",
    data: [
      {
        id: "1",
        title: "Segunda-feira",
        price: 10.0,
        description:
          "Nosso delicioso cardápo de segunda!",
        cover: "assets/products/cover/1.png",
        thumbnail: "assets/products/thumbnail/1.png",
        ingredients: [
          "Arroz branco",
          "Fejão batido",
          "Farofa com bacon",
          "Lasanha de queijo",
          "Escondidinho",
          "Macarrão alho e óleo",
          "Carne de panela",
          "Filé de frango empanado",
          "Pernil assado",
          "Salada de alface e tomate",
          "Repolho",
          "Maionese",
        ],
      },
      {
        id: "2",
        title: "Terça-feira",
        price: 10.0,
        description:
          "Nosso delicioso cardápo de terça!",
        cover: "assets/products/cover/1.png",
        thumbnail: "assets/products/thumbnail/1.png",
        ingredients: [
          "Arroz branco",
          "Fejão batido",
          "Farofa com bacon",
          "Lasanha de queijo",
          "Escondidinho",
          "Macarrão alho e óleo",
          "Carne de panela",
          "Filé de frango empanado",
          "Pernil assado",
          "Salada de alface e tomate",
          "Repolho",
          "Maionese",
        ],
      },
      {
        id: "3",
        title: "Quarta-feira",
        price: 10.0,
        description:
          "Nosso delicioso cardápo de quarta!",
        cover: "assets/products/cover/1.png",
        thumbnail: "assets/products/thumbnail/1.png",
        ingredients: [
          "Arroz branco",
          "Fejão batido",
          "Farofa com bacon",
          "Lasanha de queijo",
          "Escondidinho",
          "Macarrão alho e óleo",
          "Carne de panela",
          "Filé de frango empanado",
          "Pernil assado",
          "Salada de alface e tomate",
          "Repolho",
          "Maionese",
        ],
      },
      {
        id: "4",
        title: "Quinta-feira",
        price: 10.0,
        description:
          "Nosso delicioso cardápo de quinta!",
        cover: "assets/products/cover/1.png",
        thumbnail: "assets/products/thumbnail/1.png",
        ingredients: [
          "Arroz branco",
          "Fejão batido",
          "Farofa com bacon",
          "Lasanha de queijo",
          "Escondidinho",
          "Macarrão alho e óleo",
          "Carne de panela",
          "Filé de frango empanado",
          "Pernil assado",
          "Salada de alface e tomate",
          "Repolho",
          "Maionese",
        ],
      },
      {
        id: "5",
        title: "Sexta-feira",
        price: 10.0,
        description:
          "Nosso delicioso cardápo de sexta!",
        cover: "assets/products/cover/1.png",
        thumbnail: "assets/products/thumbnail/1.png",
        ingredients: [
          "Arroz branco",
          "Fejão batido",
          "Farofa com bacon",
          "Lasanha de queijo",
          "Escondidinho",
          "Macarrão alho e óleo",
          "Carne de panela",
          "Filé de frango empanado",
          "Pernil assado",
          "Salada de alface e tomate",
          "Repolho",
          "Maionese",
        ],
      },
      {
        id: "6",
        title: "Sábado",
        price: 10.0,
        description:
          "Nosso delicioso cardápo de sábado!",
        cover: "assets/products/cover/1.png",
        thumbnail: "assets/products/thumbnail/1.png",
        ingredients: [
          "Arroz branco",
          "Fejão batido",
          "Farofa com bacon",
          "Lasanha de queijo",
          "Escondidinho",
          "Macarrão alho e óleo",
          "Carne de panela",
          "Filé de frango empanado",
          "Pernil assado",
          "Salada de alface e tomate",
          "Repolho",
          "Maionese",
        ],
      },
      {
        id: "7",
        title: "Domingo",
        price: 10.0,
        description:
          "Nosso delicioso cardápo de domingo!",
        cover: "assets/products/cover/1.png",
        thumbnail: "assets/products/thumbnail/1.png",
        ingredients: [
          "Arroz branco",
          "Fejão batido",
          "Farofa com bacon",
          "Lasanha de queijo",
          "Escondidinho",
          "Macarrão alho e óleo",
          "Carne de panela",
          "Filé de frango empanado",
          "Pernil assado",
          "Salada de alface e tomate",
          "Repolho",
          "Maionese",
        ],
      },
    ],
  },
  {
    title: "Marmitex",
    data: [
      {
        id: "8",
        title: "Pequeno",
        price: 10.0,
        description:
          "Marmitex pequeno. Aproximadamente 300g",
        cover: "assets/products/cover/2.png",
        thumbnail: "assets/products/thumbnail/2.png",
        ingredients: [],
      },
      {
        id: "9",
        title: "Médio",
        price: 15.00,
        description:
          "Marmitex médio. Aproximadamente 500g",
        cover: "assets/products/cover/3.png",
        thumbnail: "assets/products/thumbnail/3.png",
        ingredients: [],
      },
      {
        id: "10",
        title: "Grande",
        price: 20.00,
        description:
          "Marmitex grande. Aproximadamente 700g",
        cover: "assets/products/cover/3.png",
        thumbnail: "assets/products/thumbnail/3.png",
        ingredients: [],
      },
      
    ],
  },
  {
    title: "Bebidas",
    data: [
      {
        id: "11",
        title: "Coca cola lata",
        price: 6.9,
        thumbnail: "assets/products/thumbnail/7.png",
        cover: "assets/products/cover/7.png",
        description:
          "Uma coca super gelada para acompanhar o seu super lanche...",
        ingredients: [],
      },
      {
        id: "12",
        title: "Suco lata",
        price: 4.9,
        thumbnail: "assets/products/thumbnail/7.png",
        cover: "assets/products/cover/7.png",
        description:
          "Suco Lata Tial",
        ingredients: [],
      },
    ],
  },
]

const PRODUCTS = MENU.map((item) => item.data).flat()

const CATEGORIES = MENU.map((item) => item.title)

export type ProductProps = (typeof PRODUCTS)[0]

export { MENU, PRODUCTS, CATEGORIES }
