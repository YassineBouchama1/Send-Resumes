# Project Setup Instructions

Sender Resume is a project that allows users to add a list of emails, upload resumes and letters, and send them all simultaneously to the specified email addresses using SMTP.

## Demo

You can view the live demo of the project at: [send-resumes.vercel.app](https://send-resumes.vercel.app)

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
```

## 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd your-repository
npm install
```

## 3. Configure Environment Variables

Create a `.env.local` file in the root directory of the project with the following content:

```bash
NEXT_PUBLIC_EMAIL_USER='email smtp'
NEXT_PUBLIC_EMAIL_PASS='pass smtp'
NEXT_PUBLIC_API_URL_LOCAL=http://localhost:3000
NEXT_PUBLIC_API_URL='production host'
NEXT_PUBLIC_NODE_ENV=production
```

Replace these values with your SMTP server credentials.

## 4. Update Configuration

Open the `config.ts` file and modify the port and host settings according to your environment.

## 5. Add Your Data

Place your letters and resumes in the respective folders:

- Letters: Add your letters to the `data/letters` folder.
- Resumes: Add your resumes to the `data/resumes` folder.

## 6. Run the Project

Start the development server with the following command:

```bash
npm run dev
```
