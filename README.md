Here's the continuation of your installation steps:

```bash
git clone https://github.com/amanjaiswal7236/taskflow.git
cd taskflow
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit:

```
http://localhost:3000
```