export const registerEmailTemplate = (content) => `
  <div style="font-family: Arial, sans-serif; color: #d6cbd1; padding: 20px;">

    <div style="; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

    <h1 style="color: #0000FF; line-height: 1.5; text-align: center;">MEDICONNECT!</h1>

      <div style="color:#000000; font-size: 16
      px; line-height: 1.5; text-align: start;">
        ${content}
      </div>

      <footer style="margin-top: 20px; font-size: 14px; color: #777; text-align: start;">
        <p>&copy; ${new Date().getFullYear()} MediConnect. All rights reserved.</p>
      </footer>

    </div>
  </div>
`;