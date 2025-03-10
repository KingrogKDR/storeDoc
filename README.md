# storeDoc

storeDoc is a web application designed to facilitate the upload and storage of files on the web and local storage solutions.

## Features

- **Access Control**: Set Access Control Lists (ACLs) to manage file permissions.
- **MIME Type Handling**: Automatically detect and assign the correct MIME type to uploaded files.

## Installation

To set up the development environment:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/KingrogKDR/storeDoc.git
    cd storeDoc
    ```

2. **Install dependencies**:

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deployment

The application is deployed on Vercel and can be accessed at [store-doc-one.vercel.app](https://store-doc-one.vercel.app).

To deploy your own instance:

1. **Fork the repository** on GitHub.

2. **Connect your forked repository to Vercel** by following the [Vercel deployment documentation](https://nextjs.org/docs/deployment).

3. **Set up environment variables** on Vercel to configure your cloud storage credentials.

## Contributing

We welcome contributions! To get started:

1. **Fork the repository**.

2. **Create a new branch** for your feature or bugfix:

    ```bash
    git checkout -b feature-name
    ```

3. **Make your changes** and commit them with descriptive messages.

4. **Push your changes** to your forked repository:

    ```bash
    git push origin feature-name
    ```

5. **Open a pull request** to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Built with [Next.js](https://nextjs.org/).
- Deployed on [Vercel](https://vercel.com/).
