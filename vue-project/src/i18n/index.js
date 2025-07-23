import { createI18n } from "vue-i18n";

const messages = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      member: "Member",
      crossBorder: "Cross Border",
    },
    home: {
      page: "Home Page",
    },
  },
  lo: {
    nav: {
      home: "ໜ້າຫຼັກ",
      about: "ກ່ຽວກັບ",
      member: "ສະມາຊິກ",
      crossBorder: "ຂ້າມແດນ",
    },
    home: {
      page: "ໜ້າຫຼັກ",
    },
  },
};

export default createI18n({
  legacy: false,
  locale: "en",
  messages,
});
