/* -------------------------------------------------------------------------- */

/*                                    Utils                                   */

/* -------------------------------------------------------------------------- */
const docReady = fn => {
  // see if DOM is already available
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    setTimeout(fn, 1);
  }
};

const resize = fn => window.addEventListener("resize", fn);

const isIterableArray = array => Array.isArray(array) && !!array.length;

const camelize = str => {
  const text = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : "");
  return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`;
};

const getData = (el, data) => {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};
/* ----------------------------- Colors function ---------------------------- */


const hexToRgb = hexValue => {
  let hex;
  hexValue.indexOf("#") === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

const rgbaColor = (color = "#fff", alpha = 0.5) => `rgba(${hexToRgb(color)}, ${alpha})`;
/* --------------------------------- Colors --------------------------------- */


const colors = {
  primary: "#0091e9",
  secondary: "#002147",
  success: "#00d27a",
  info: "#27bcfd",
  warning: "#FFC928",
  danger: "#EE4D47",
  light: "#F9FAFD",
  dark: "#000"
};
const grays = {
  white: "#fff",
  100: "#f9fafd",
  200: "#edf2f9",
  300: "#d8e2ef",
  400: "#b6c1d2",
  500: "#9da9bb",
  600: "#748194",
  700: "#5e6e82",
  800: "#4d5969",
  900: "#344050",
  1000: "#232e3c",
  1100: "#0b1727",
  black: "#000"
};

const hasClass = (el, className) => {
  !el && false;
  return el.classList.value.includes(className);
};

const addClass = (el, className) => {
  el.classList.add(className);
};

const getOffset = el => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

const isScrolledIntoView = el => {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  while (el.offsetParent) {
    // eslint-disable-next-line no-param-reassign
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return {
    all: top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth,
    partial: top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset
  };
};

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};

const getBreakpoint = el => {
  const classes = el && el.classList.value;
  let breakpoint;

  if (classes) {
    breakpoint = breakpoints[classes.split(" ").filter(cls => cls.includes("navbar-expand-")).pop().split("-").pop()];
  }

  return breakpoint;
};
/* --------------------------------- Cookie --------------------------------- */


const setCookie = (name, value, expire) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
};

const getCookie = name => {
  const keyValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return keyValue ? keyValue[2] : keyValue;
};

const settings = {
  tinymce: {
    theme: "oxide"
  },
  chart: {
    borderColor: "rgba(255, 255, 255, 0.8)"
  }
};
/* -------------------------- Chart Initialization -------------------------- */

const newChart = (chart, config) => {
  const ctx = chart.getContext("2d");
  return new window.Chart(ctx, config);
};
/* ---------------------------------- Store --------------------------------- */


const getItemFromStore = (key, defaultValue, store = localStorage) => {
  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch {
    return store.getItem(key) || defaultValue;
  }
};

const setItemToStore = (key, payload, store = localStorage) => store.setItem(key, payload);

const getStoreSpace = (store = localStorage) => parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));

const utils = {
  docReady,
  resize,
  isIterableArray,
  camelize,
  getData,
  hasClass,
  addClass,
  hexToRgb,
  rgbaColor,
  colors,
  grays,
  getOffset,
  isScrolledIntoView,
  getBreakpoint,
  setCookie,
  getCookie,
  newChart,
  settings,
  getItemFromStore,
  setItemToStore,
  getStoreSpace
};
/* -------------------------------------------------------------------------- */

/*                                  Detector                                  */

/* -------------------------------------------------------------------------- */

const detectorInit = () => {
  const {
    is
  } = window;
  const html = document.querySelector('html');
  is.opera() && addClass(html, 'opera');
  is.mobile() && addClass(html, 'mobile');
  is.firefox() && addClass(html, 'firefox');
  is.safari() && addClass(html, 'safari');
  is.ios() && addClass(html, 'ios');
  is.iphone() && addClass(html, 'iphone');
  is.ipad() && addClass(html, 'ipad');
  is.ie() && addClass(html, 'ie');
  is.edge() && addClass(html, 'edge');
  is.chrome() && addClass(html, 'chrome');
  is.mac() && addClass(html, 'osx');
  is.windows() && addClass(html, 'windows');
  navigator.userAgent.match('CriOS') && addClass(html, 'chrome');
};
/*-----------------------------------------------
|   Top navigation opacity on scroll
-----------------------------------------------*/


const navbarInit = () => {
  const Selector = {
    NAVBAR: '[data-navbar-on-scroll]',
    NAVBAR_COLLAPSE: '.navbar-collapse',
    NAVBAR_TOGGLER: '.navbar-toggler'
  };
  const ClassNames = {
    COLLAPSED: 'collapsed'
  };
  const Events = {
    SCROLL: 'scroll',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDE_BS_COLLAPSE: 'hide.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
  };
  const DataKey = {
    NAVBAR_ON_SCROLL: 'navbar-light-on-scroll'
  };
  const navbar = document.querySelector(Selector.NAVBAR); // responsive nav collapsed

  navbar.addEventListener('click', e => {
    if (e.target.classList.contains('nav-link') && window.innerWidth < utils.getBreakpoint(navbar)) {
      navbar.querySelector(Selector.NAVBAR_TOGGLER).click();
    }
  });

  if (navbar) {
    const windowHeight = window.innerHeight;
    const html = document.documentElement;
    const navbarCollapse = navbar.querySelector(Selector.NAVBAR_COLLAPSE);
    const allColors = { ...utils.colors,
      ...utils.grays
    };
    const name = utils.getData(navbar, DataKey.NAVBAR_ON_SCROLL);
    const colorName = Object.keys(allColors).includes(name) ? name : 'light';
    const color = allColors[colorName];
    const bgClassName = `bg-${colorName}`;
    const paddingName = 'padding-transition';
    const colorRgb = utils.hexToRgb(color);
    const {
      backgroundImage
    } = window.getComputedStyle(navbar);
    const transition = 'background-color,padding 0.35s ease';
    navbar.style.backgroundImage = 'none'; // Change navbar background color on scroll

    window.addEventListener(Events.SCROLL, () => {
      const {
        scrollTop
      } = html;
      let alpha = scrollTop / windowHeight * 0.35; // Add class on scroll

      navbar.classList.add('backdrop');

      if (alpha === 0) {
        navbar.classList.remove('backdrop');
      }

      alpha >= 1 && (alpha = 1);
      navbar.style.backgroundColor = `rgba(${colorRgb[0]}, ${colorRgb[1]}, ${colorRgb[2]}, ${alpha})`;
      navbar.style.backgroundImage = alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? backgroundImage : 'none';
      alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? navbar.classList.add(paddingName) : navbar.classList.remove(paddingName);
    }); // Toggle bg class on window resize

    utils.resize(() => {
      const breakPoint = utils.getBreakpoint(navbar);

      if (window.innerWidth > breakPoint) {
        navbar.style.backgroundImage = html.scrollTop ? backgroundImage : 'none'; // navbar.style.transition = 'none';
      } else if (!utils.hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
        // navbar.classList.add(bgClassName);
        // navbar.classList.add(paddingName);
        navbar.style.backgroundImage = backgroundImage;
      }

      if (window.innerWidth <= breakPoint) {// navbar.style.transition = utils.hasClass(navbarCollapse, 'show') ? transition : 'none';
      }
    });
    navbarCollapse.addEventListener(Events.SHOW_BS_COLLAPSE, () => {
      navbar.classList.add(bgClassName); // navbar.classList.add(paddingName);

      navbar.style.backgroundImage = backgroundImage;
      navbar.style.transition = transition;
    });
    navbarCollapse.addEventListener(Events.HIDE_BS_COLLAPSE, () => {
      navbar.classList.remove(bgClassName); // navbar.classList.remove(paddingName);

      !html.scrollTop && (navbar.style.backgroundImage = 'none');
    });
    navbarCollapse.addEventListener(Events.HIDDEN_BS_COLLAPSE, () => {// navbar.style.transition = 'none';
    });
  }
};
/* -------------------------------------------------------------------------- */

/*                                Scroll To Top                               */

/* -------------------------------------------------------------------------- */


const scrollToTop = () => {
  document.querySelectorAll('[data-anchor] > a, [data-scroll-to]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const el = e.target;
      const id = utils.getData(el, 'scroll-to') || el.getAttribute('href');
      window.scroll({
        top: utils.getData(el, 'offset-top') ?? utils.getOffset(document.querySelector(id)).top - 100,
        left: 0,
        behavior: 'smooth'
      });
      window.location.hash = id;
    });
  });
}; // /* -------------------------------------------------------------------------- */
// /*                            Theme Initialization                            */
// /* -------------------------------------------------------------------------- */


docReady(navbarInit);
docReady(detectorInit);
docReady(scrollToTop);
//# sourceMappingURL=theme.js.map
