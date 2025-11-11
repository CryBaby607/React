import { library } from '@fortawesome/fontawesome-svg-core'

// Importar iconos Solid
import {
  faMagnifyingGlass,
  faShoppingCart,
  faBars,
  faTimes,
  faArrowLeft,    // ⬅️ NUEVO
  faCheck,        // ⬅️ NUEVO
  faTruck,        // ⬅️ NUEVO
  faShieldAlt,    // ⬅️ NUEVO
  faSync          // ⬅️ NUEVO
} from '@fortawesome/free-solid-svg-icons'

// Importar iconos de Marcas (Brands)
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faTiktok
} from '@fortawesome/free-brands-svg-icons'

// Registrar todos los iconos en la librería
library.add(
  // Iconos Solid
  faMagnifyingGlass,
  faShoppingCart,
  faBars,
  faTimes,
  faArrowLeft,    // ⬅️ NUEVO
  faCheck,        // ⬅️ NUEVO
  faTruck,        // ⬅️ NUEVO
  faShieldAlt,    // ⬅️ NUEVO
  faSync,         // ⬅️ NUEVO
  // Iconos Brands
  faFacebookF,
  faInstagram,
  faTwitter,
  faTiktok
)