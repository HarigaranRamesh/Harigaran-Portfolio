# Strapi Headless CMS Integration Guide

This portfolio website is now fully configured to load all content dynamically from **Strapi Headless CMS**, while preserving the exact existing UI, animations, 3D tilt effects, and styles.

If Strapi is stopped or unreachable, the application automatically falls back to your local data without any broken UI or layout shift.

---

## 1. Quick Start: Setting Up Strapi

You can set up a new Strapi project in a separate folder alongside your portfolio:

```bash
# In your terminal (e.g. one directory up from your portfolio)
npx create-strapi-app@latest portfolio-cms --quickstart
```

Once installed, it will automatically open the admin registration page:
`http://localhost:1337/admin`

Create your administrator account.

---

## 2. Content Types Schema to Create in Strapi

Go to **Content-Type Builder** in the Strapi left sidebar.

### A. Single Type: `Profile` (API ID: `profile`)
| Field Name | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `heroGreeting` | Short Text | Hero Greeting | `Engineering the Future` |
| `heroTitlePrefix` | Short Text | First headline line | `MODERN` |
| `heroTitleHighlight` | Short Text | Highlighted accent text | `ARCHITECT.` |
| `heroDescription` | Long Text | Hero bio summary | `Specializing in high-performance...` |
| `heroViewWorkText`| Short Text | Primary button text | `View Work` |
| `heroContactText` | Short Text | Secondary button text | `Let's Talk` |
| `aboutSectionNumber` | Short Text | Section counter | `01.` |
| `aboutSectionTitle` | Short Text | Section title | `Architecting the Web` |
| `aboutLeadText` | Long Text | Highlighting summary | `I transform complex problems...` |
| `aboutBio1` | Long Text | Paragraph 1 | `As a Full Stack Developer...` |
| `aboutBio2` | Long Text | Paragraph 2 | `Currently, I'm focused on...` |
| `profileImage` | Media (Single) | Your profile photo | Upload JPG/PNG |
| `resumeFile` | Media (Single) | Resume PDF | Upload `.pdf` file |
| `resumeUrl` | Short Text | External resume link | (Optional Google Drive link) |
| `stats` | JSON | Experience stats | `[{"label":"Experience","value":"6 Months"},{"label":"Projects Completed","value":"3+"},{"label":"Technologies","value":"12+"}]` |

---

### B. Collection Type: `Project` (API ID: `projects`)
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `title` | Short Text | Project Name (e.g. `E-Commerce Application`) |
| `description` | Long Text | Short summary |
| `challenge` | Long Text | The problem solved |
| `solution` | Long Text | Architecture / solution details |
| `impact` | Long Text | Metrics / achievements |
| `tech` | JSON or Short Text | List: `["React", "Redux", "Node.js", "Express", "MongoDB"]` |
| `features` | JSON or Long Text | Key bullet points |
| `image` | Media (Single) | Project preview screenshot |
| `demo` | Short Text | Live Demo URL |
| `github` | Short Text | GitHub repository URL |
| `order` | Number (Integer) | Sorting order (1, 2, 3...) |

---

### C. Collection Type: `Skill` (API ID: `skills`)
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `name` | Short Text | e.g. `React`, `TypeScript`, `MongoDB` |
| `category` | Short Text | e.g. `Web Development`, `Programming Languages`, `Databases & Caching` |
| `level` | Number (Integer) | Progress percentage (1-100) |
| `color` | Short Text | Hex code, e.g. `#61DAFB`, `#3178C6`, `#47A248` |
| `iconName` | Short Text | React Icon name (e.g. `FaReact`, `SiMongodb`, `SiNextdotjs`, `FaDocker`) |
| `iconImage` | Media (Single) | Optional: custom SVG/PNG icon |
| `order` | Number (Integer) | Sorting order |

---

### D. Collection Type: `Experience` (API ID: `experiences`)
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `role` | Short Text | Job role (e.g. `Full Stack Developer`) |
| `company` | Short Text | Company name (e.g. `Karma Group Global`) |
| `duration` | Short Text | Date range (e.g. `May 2026 - Present`) |
| `description` | Long Text | Work summary |
| `tech` | JSON or Short Text | `["Next.js", "React", "Node.js", "Redis"]` |
| `order` | Number (Integer) | Sorting order |

---

### E. Collection Type: `Education` (API ID: `educations`)
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `degree` | Short Text | Degree / program name |
| `institution` | Short Text | College or university |
| `year` | Short Text | e.g. `2024 - 2026` |
| `description` | Long Text | Coursework / summary |
| `order` | Number (Integer) | Sorting order |

---

### F. Collection Type: `Testimonial` (API ID: `testimonials`)
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `name` | Short Text | Reviewer name |
| `role` | Short Text | Designation / relation |
| `company` | Short Text | Company name |
| `text` | Long Text | Feedback quote |
| `order` | Number (Integer) | Sorting order |

---

## 3. Enable Public Access (Crucial Step!)

By default, Strapi protects all API endpoints:
1. Go to **Settings** -> **Users & Permissions plugin** -> **Roles**.
2. Click on the **Public** role.
3. Under the permissions list, find:
   - `Profile`: check **`find`**
   - `Project`: check **`find`** and **`findOne`**
   - `Skill`: check **`find`** and **`findOne`**
   - `Experience`: check **`find`** and **`findOne`**
   - `Education`: check **`find`** and **`findOne`**
   - `Testimonial`: check **`find`** and **`findOne`**
4. Click **Save** in the top right.

---

## 4. Frontend Configuration (.env)

In this project root (`Harigaran-Portfolio`):
```env
VITE_STRAPI_API_URL=http://localhost:1337
# VITE_STRAPI_API_TOKEN= (only needed if endpoints are private)
```

For production (e.g. deployed on Render, Railway, or Strapi Cloud):
```env
VITE_STRAPI_API_URL=https://your-strapi-app.onrender.com
```

---

## 5. Architecture Summary in Code
- **`src/services/strapi.js`**: Universal client that fetches endpoints, normalizes Strapi v4/v5 format, constructs complete media URLs, and falls back gracefully.
- **`src/context/PortfolioDataContext.jsx`**: Global data provider managing reactive updates and caching across all sections.
- **`src/utils/iconResolver.jsx`**: Dynamically maps Strapi icon strings (`FaReact`, `SiMongodb`, `SiPostgresql`, etc.) or custom uploaded icon images to React Icons.
- **`src/data/*`**: Safe static fallback ensuring 100% uptime even before Strapi is configured.
