export const HOME_IMAGES = {
  blocks: {
    p1: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827788/p1_v4gfzn.png",
    p2: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827789/p2_bm2i7q.png", 
    p3: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827791/p3_pnbryk.png", 
  },
  slides: {
    gojo: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827620/gojo_vopdyd.jpg", 
    hay: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827620/hay_xuhfsa.jpg",
    nak: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827620/nak_xvqted.jpg",
    tel: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827620/tel_rlfgga.jpg",
    tv: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827620/tv_vaoz3e.jpg",
    tulen: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827621/tulen_iihotf.jpg",
    nk: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827620/nk_vuxxgh.jpg",
  },
  backgrounds: {
    bg1: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827787/background_1_etchnc.jpg", 
    bg2: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827787/background_2_wh3kdd.jpg",
    bg3: "https://res.cloudinary.com/drgoaizrr/image/upload/v1779827787/background_3_aenl6s.jpg",
  },
};

export const SLIDER_CARDS = [
  HOME_IMAGES.slides.gojo,
  HOME_IMAGES.slides.hay,
  HOME_IMAGES.slides.nak,
  HOME_IMAGES.slides.tel,
  HOME_IMAGES.slides.tv,
  HOME_IMAGES.slides.tulen,
  HOME_IMAGES.slides.nk,
];

export const SLIDER_TRACK = [
  ...SLIDER_CARDS,
  HOME_IMAGES.slides.gojo,
  HOME_IMAGES.slides.hay,
  HOME_IMAGES.slides.tv,
  HOME_IMAGES.slides.nak,
  HOME_IMAGES.slides.tulen,
  HOME_IMAGES.slides.tel,
  HOME_IMAGES.slides.nk,
];
