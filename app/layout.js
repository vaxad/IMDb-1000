import './globals.css'

export const metadata = {
  title: 'IMDb - Top 100',
  description: 'Project for Synapse',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" Monument w-full" >{children}</body>
    </html>
  )
}
