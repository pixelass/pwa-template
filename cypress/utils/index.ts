export const withBaseUrl = (urlPath: string) => `${Cypress.config().baseUrl}${urlPath}`;
