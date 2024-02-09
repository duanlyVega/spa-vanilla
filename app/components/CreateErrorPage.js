
export function CreateErrorPage() {
    const errorPageContent = `
      <html>
      <head>
      <title>Error</title>
  
      </head>
      <body>
          <main>
            <h1>¡ Ocurrió un error!</h1>
            <p>Lo sentimos, no pudimos cargar la pagina solicitada en este momento. Por favor, inténtelo de nuevo mas tarde</p>
          </main>
      </body>
      </html>
      
      `;
  
    return new Response(errorPageContent, {
      headers: { "Content-Type": "text/html" },
    });
  }