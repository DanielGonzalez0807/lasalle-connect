# LaSalle Connect

Red social interna para estudiantes de La Salle. Podés publicar posts, comentar, reaccionar y filtrar por materia, todo con tu correo institucional.

## ¿Qué necesitás para correrlo?

- [Node.js](https://nodejs.org/) v18 o superior
- Una cuenta en [Supabase](https://supabase.com) (es gratis)
- Git

---

## Cómo levantar el proyecto desde cero

### 1. Cloná el repo

```bash
git clone https://github.com/tu-usuario/lasalle-connect.git
cd lasalle-connect/frontend
```

### 2. Instalá las dependencias

```bash
npm install
```

### 3. Configurá las variables de entorno

Copiá el archivo de template:

```bash
cp .env.template .env.local
```

Abrí `.env.local` y pegá tus credenciales de Supabase:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

> Encontrás estos valores en tu proyecto de Supabase en **Project Settings → API**.

### 4. Configurá la base de datos en Supabase

En el **SQL Editor** de tu proyecto de Supabase, ejecutá esto en orden:

```sql
-- Tabla de perfiles (se llena automáticamente al registrarse)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  role text default 'student'
);

-- Trigger para crear el perfil automáticamente al registrar un usuario
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, nombre)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Materias
create table subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique
);

-- Posts
create table posts (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  author_id uuid references profiles(id) on delete cascade,
  subject_id uuid references subjects(id) on delete set null,
  created_at timestamptz default now()
);

-- Comentarios (soporta respuestas anidadas)
create table comments (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  author_id uuid references profiles(id) on delete cascade,
  post_id uuid references posts(id) on delete cascade,
  parent_id uuid references comments(id) on delete cascade,
  created_at timestamptz default now()
);

-- Reacciones (un like por usuario por post)
create table reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  unique(post_id, user_id)
);
```

### 5. Configurá Row Level Security (RLS)

Todavía en el SQL Editor, habilitá las políticas de seguridad:

```sql
-- Profiles
alter table profiles enable row level security;
create policy "Cualquiera puede ver perfiles" on profiles for select using (true);
create policy "Solo el dueño puede editar su perfil" on profiles for update using (auth.uid() = id);

-- Subjects
alter table subjects enable row level security;
create policy "Cualquiera puede ver materias" on subjects for select using (true);

-- Posts
alter table posts enable row level security;
create policy "Cualquiera puede ver posts" on posts for select using (true);
create policy "Solo usuarios autenticados pueden crear posts" on posts for insert with check (auth.uid() = author_id);
create policy "Solo el autor puede borrar su post" on posts for delete using (auth.uid() = author_id);

-- Comments
alter table comments enable row level security;
create policy "Cualquiera puede ver comentarios" on comments for select using (true);
create policy "Solo usuarios autenticados pueden comentar" on comments for insert with check (auth.uid() = author_id);
create policy "Solo el autor puede borrar su comentario" on comments for delete using (auth.uid() = author_id);

-- Reactions
alter table reactions enable row level security;
create policy "Cualquiera puede ver reacciones" on reactions for select using (true);
create policy "Solo usuarios autenticados pueden reaccionar" on reactions for insert with check (auth.uid() = user_id);
create policy "Solo el dueño puede quitar su reacción" on reactions for delete using (auth.uid() = user_id);
```

### 6. Agregá algunas materias de prueba (opcional)

```sql
insert into subjects (name, code) values
  ('Ingeniería de Software', 'IS-301'),
  ('Bases de Datos', 'BD-201'),
  ('Redes de Computadores', 'RC-401');
```

### 7. Configurá el dominio permitido en Supabase

El sistema solo permite registros con correo `@unisalle.edu.co`. Para que funcione el login, andá a **Authentication → URL Configuration** en Supabase y asegurate de tener `http://localhost:5173` en la lista de URLs permitidas.

### 8. Levantá el servidor de desarrollo

```bash
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173) en el navegador.

---

## Estructura del proyecto

```
frontend/src/
├── app/              # Router, contexto de auth y rutas protegidas
├── features/         # Módulos por funcionalidad
│   ├── auth/         # Login, registro
│   ├── posts/        # Crear y listar posts
│   ├── comments/     # Comentarios anidados
│   ├── reactions/    # Likes
│   ├── profile/      # Perfil de usuario
│   └── subjects/     # Materias
├── pages/            # Páginas principales (Feed, Login)
├── services/         # Cliente de Supabase
└── utils/            # Constantes y validadores
```

Cada feature tiene su propia carpeta con `components/`, `hooks/` y `services/`, así todo queda ordenado y fácil de encontrar.

---

## Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo |
| `npm run build` | Genera la versión para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Revisa el código con ESLint |

---

## Stack

- **React 19** + **Vite**
- **Supabase** — auth, base de datos y API
- **React Router v7**
- CSS Modules para los estilos

---

## Notas importantes

- El registro solo acepta correos `@unisalle.edu.co`. Esto se valida en el frontend y se puede reforzar también desde Supabase.
- El archivo `.env.local` **nunca** se sube al repo, está en el `.gitignore`. Cada quien pone sus propias credenciales.
- Si alguien se registra y no puede entrar, revisá que el trigger `on_auth_user_created` esté activo en Supabase, porque sin él no se crea el perfil y la app no carga bien.
