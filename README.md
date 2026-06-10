# 💰 MeMo Finanzas

**MeMo Finanzas** es una aplicación web de finanzas personales diseñada para ayudar a los usuarios a controlar sus gastos, fortalecer sus hábitos de ahorro y mejorar su educación financiera mediante herramientas visuales, límites inteligentes de gasto y elementos de gamificación.

---

## 📖 Descripción

La aplicación permite registrar ingresos y gastos de manera sencilla mientras supervisa automáticamente el comportamiento financiero del usuario.

A diferencia de las aplicaciones tradicionales de presupuesto, **MeMo Finanzas** implementa un sistema de **límites dinámicos**, donde las categorías de gasto se ajustan automáticamente según el saldo disponible. Además, incorpora indicadores visuales, frases motivacionales y badges que incentivan una gestión responsable del dinero.

---

## 🎯 Objetivo del Proyecto

Promover una cultura de ahorro y consumo responsable mediante:

* Control inteligente de gastos.
* Visualización clara de la salud financiera.
* Educación financiera básica.
* Motivación constante mediante recompensas y mensajes positivos.
* Prevención del malgasto de dinero.

---

## ✨ Características Principales

### 💵 Gestión de Ingresos y Gastos

* Registro de ingresos.
* Registro de gastos.
* Actualización automática del saldo disponible.
* Persistencia de información mediante Local Storage.

### 📊 Límites Dinámicos por Categoría

Los límites se calculan automáticamente según el saldo total disponible:

| Categoría         | Porcentaje |
| ----------------- | ---------- |
| 👨‍👩‍👧 Familiar | 10%        |
| 🎮 Ocio           | 5%         |
| 💰 Ahorro         | 20%        |
| 📈 Inversiones    | 30%        |

Estos límites se actualizan cada vez que cambia el saldo del usuario.

### ⚡ Medidor de Salud Financiera

* Indicador circular interactivo.
* Muestra el porcentaje de dinero disponible respecto al saldo total.
* Permite visualizar rápidamente la situación financiera actual.

### 🏆 Sistema de Badges

La aplicación recompensa los buenos hábitos financieros mediante insignias:

#### 💰 Ahorrador

Se obtiene al mantener hábitos de ahorro consistentes.

#### 🔥 Constante

Se obtiene por registrar movimientos financieros de forma frecuente.

### 🌟 Frases Motivacionales

Después de cada acción se muestra una frase inspiradora para fomentar una mejor relación con el dinero.

Ejemplos:

> "Cada peso ahorrado es un paso hacia tu libertad financiera."

> "Controlar tus gastos hoy te acerca a tus metas mañana."

### 📅 Frase del Día

* Se genera automáticamente una frase distinta cada día.
* Brinda consejos y motivación financiera diaria.

### 📈 Estadísticas Detalladas

Modal interactivo con información sobre:

* Ingresos registrados.
* Gastos realizados.
* Distribución por categorías.
* Estado general del presupuesto.

### 💾 Persistencia de Datos

La información se almacena localmente utilizando:

```javascript
localStorage
```

Esto permite mantener los datos incluso después de cerrar el navegador.

### 📱 Diseño Responsive

* Mobile First.
* Adaptación automática a tablets y escritorio.
* Experiencia optimizada en cualquier dispositivo.

### 🌙 Interfaz Moderna

Diseño basado en:

* Dark Mode.
* Glassmorphism.
* Componentes visuales modernos.
* Animaciones suaves.
* Experiencia intuitiva y agradable.

---

## 🛠 Tecnologías Utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

### Librerías y Recursos

* Tailwind CSS
* Google Fonts (Inter)
* Material Symbols

### Almacenamiento

* Local Storage API

---

## 📂 Estructura del Proyecto

```text
MeMo-Finanzas/
│
├── index.html
├── css/
│   └── styles.css
│
├── js/
│   └── app.js
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── screenshots/
│
├── README.md
│
└── LICENSE
```

---

## ⚙️ Funcionamiento de los Límites Dinámicos

Los límites se calculan utilizando porcentajes del saldo total disponible.

Ejemplo:

Si el usuario posee:

```text
Saldo Total = $1.000.000
```

Los límites serán:

```text
Familiar     = $100.000
Ocio         = $50.000
Ahorro       = $200.000
Inversiones  = $300.000
```

Cada vez que el saldo cambia, los límites se recalculan automáticamente.

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/memo-finanzas.git
```

### 2. Entrar al proyecto

```bash
cd memo-finanzas
```

### 3. Abrir en el navegador

Simplemente abre:

```text
index.html
```

o utiliza la extensión **Live Server** de Visual Studio Code.

---

## 📱 Compatibilidad

Compatible con:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Opera
* Navegadores móviles Android
* Navegadores móviles iOS

---

## 🔒 Almacenamiento de Datos

Todos los datos son almacenados localmente en el navegador mediante Local Storage.

La aplicación:

✅ No requiere base de datos.

✅ No necesita conexión a internet para funcionar.

✅ No envía información a servidores externos.

---

## 🎨 Principios de Diseño

La interfaz fue diseñada siguiendo los principios de:

* Simplicidad.
* Claridad visual.
* Accesibilidad.
* Educación financiera.
* Motivación constante.
* Experiencia de usuario moderna.

---

## 🔮 Mejoras Futuras

* Exportación de reportes PDF.
* Gráficas avanzadas.
* Metas de ahorro personalizadas.
* Múltiples perfiles.
* Sincronización en la nube.
* Notificaciones inteligentes.
* Dashboard financiero avanzado.

---

## 👨‍💻 Autor

Desarrollado como proyecto académico enfocado en la educación financiera y la administración responsable del dinero.

---

## 📄 Licencia

Este proyecto es de uso educativo y académico.

Puede ser modificado y distribuido libremente para fines de aprendizaje y desarrollo personal.

---

### 💡 Filosofía de MeMo Finanzas

> "No se trata de cuánto dinero ganas, sino de cuánto dinero logras administrar inteligentemente."
