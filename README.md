# Project Setup Instructions

Sender Resume is a project that allows users to add a list of emails, upload resumes and letters, and send them all simultaneously to the specified email addresses using SMTP.

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
EMAIL_USER=email smtp
EMAIL_PASS=password smtp
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
