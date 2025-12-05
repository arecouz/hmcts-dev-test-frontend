# HMCTS Dev Test – Frontend

Node.js frontend for creating and viewing tasks.

- Uses **Yarn** for dependency management
- Built with **Express** and **Nunjucks** 
- UI components from **GOV.UK**  
- Frontend assets bundled with **Webpack**


## Build and run:
```bash
yarn install
yarn build      
yarn start:dev     
```

Frontend available at http://localhost:3100/ (default port)


| Route | Method |
|-------|--------|
| `/` (redirects to `/tasks`) | GET |
| `/tasks` | GET |
| `/tasks/new` | GET, POST |
| `/tasks/success` | GET |



