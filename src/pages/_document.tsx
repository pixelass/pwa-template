import createEmotionServer from "@emotion/server/create-instance";
import NextDocument, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";
import { Children } from "react";

import { cache } from "@/ions/configs/emotion";
import PWAConfig from "@/molecules/pwa-config";
import pkg from "package.json";

const { extractCritical } = createEmotionServer(cache);

class Document extends NextDocument {
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		// Resolution order
		//
		// On the server:
		// 1. app.getInitialProps
		// 2. page.getInitialProps
		// 3. document.getInitialProps
		// 4. app.render
		// 5. page.render
		// 6. document.render
		//
		// On the server with error:
		// 1. document.getInitialProps
		// 2. app.render
		// 3. page.render
		// 4. document.render
		//
		// On the client
		// 1. app.getInitialProps
		// 2. page.getInitialProps
		// 3. app.render
		// 4. page.render

		// Render app and page and get the context of the page with collected side effects.

		try {
			const initialProps = await NextDocument.getInitialProps(ctx);
			const styles = extractCritical(initialProps.html);
			return {
				...initialProps,
				styles: [
					...Children.toArray(initialProps.styles),
					<style
						key="emotion"
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={{ __html: styles.css }}
						data-emotion-css={styles.ids.join(" ")}
					/>,
				],
			};
		} catch (error: unknown) {
			console.error(error);
		}
	}

	render() {
		return (
			<Html>
				<Head>
					<meta charSet="utf8" />
					<meta name="version" content={pkg.version} />
					<meta name="format-detection" content="telephone=no" />
					<PWAConfig />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Document;
